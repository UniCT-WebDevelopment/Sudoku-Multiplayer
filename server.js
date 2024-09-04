const port = 5050;
const adminIds = [1];
const express = require('express');
const app = express();
const {createServer} = require('http');
const httpServer = createServer(app);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {xss} = require('express-xss-sanitizer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;
const components = require('./components');
const {Server} = require('socket.io');
const io = new Server(httpServer);
const sudoku = require('sudoku');

const mysql = require('mysql2/promise');
const database = require('./database');
let pool;


const games = [];
const createNewGame = (id, socketId, username, difficulty) => {
    const newGame = {
        id: id,
        firstPlayer: username,
        firstPlayerSocketId: socketId,
        secondPlayer: null,
        secondPlayerSocketId: null,
        difficulty: difficulty,
        ready: { [username]: false },
        board: null,
        solution: null,
        rating: 0,
        time: 0,
        interval: null
    }
    games.push(newGame);
    return newGame;
}

const checkToken = async (req, res, next) => {
    try {
        if(req.cookies.token) {
            const user = await getUser(req.cookies.token);
            if(!user) {
                res.clearCookie('token');
            } else {
                req.user = user;
            }
        }
        next();
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(xss());
app.use(checkToken);

io.on('connection', (socket) => {
    

    socket.on('startGame', async (data) => {
        let difficulty;
        let sudokuString;
        let sudokuSolution = '';
        let time = 0;
        let interval = null;
        let isRunning = true;
        let rating = 0;
        let user = null;

        const clockInterval = () => {
            time++;
        }
        interval = setInterval(clockInterval, 1000);
        
        switch(data.difficulty) {
            case 'easy':
            case 'medium':
            case 'hard':
            case 'impossible':
                difficulty = data.difficulty;
                break;
            default:
                difficulty = 'easy';
                break;
        }
        difficulty = data.difficulty;
        sudokuString = data.sudoku;
        const board = Array(81).fill(null);
        
        for(let i = 0; i < 81; i++) {
            const n = Number(sudokuString[i]) - 1;
            if(n >= 0) {
                board[i] = n;
            }
        }
        rating = sudoku.ratepuzzle(board, 100);
        
        const correctBoard = sudoku.solvepuzzle(board);
        for(let i = 0; i < 81; i++) {
            sudokuSolution += (correctBoard[i] + 1);
        }

        try {
            user = await getUser(data.token);
        }
        catch (err) {
            console.log(err);
        }

        socket.on('pause', () => {
            if(isRunning) {
                clearInterval(interval);
            } else {
                interval = setInterval(clockInterval, 1000);
            }
        
            isRunning = !isRunning;
        })

        socket.on('checkWin', async (sudoku) => {
            if(sudoku == sudokuSolution) {
                let score = parseFloat(rating * 100 + ((600 - time) / 100)).toFixed(2);
                if(score < 1) score = 1;
                let total = null;
                if(user) {
                    try {
                        await pool.execute(
                            `update user 
                            set points = points + ?, ${difficulty} = ${difficulty} + 1, total = total + 1 
                            where id = ? `,
                            [score, user.id]
                        );
                        const [rows] = await pool.query(
                            'select points from user where id = ?',
                            [user.id]
                        )
                        total = rows[0].points;
                        await pool.execute(
                            'insert into score (id, user_id, score, solving_date) values (NULL, ?, ?, DEFAULT)',
                            [user.id, score]
                        );
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                socket.emit('win', ({'score': score, 'total': total, 'time': time, 'difficulty': difficulty}));
                clearInterval(interval);
            }
        })

        socket.on('disconnect', () => {
            difficulty = null;
            sudokuString = null;
            sudokuSolution = null;
            time = null;
            clearInterval(interval);
            interval = null;
            isRunning = null;
            rating = null;
            user = null;
        })
    })

    socket.on('startMultiplayerGame', async(data) => {
        let user = null;
        let difficulty = null;
        let difficultyNumber = 0;
        let game = null;
        let gameId = null;
        let otherPlayerUsername = null;
        let otherPlayerSocketId = null;
        let currentScore = 0;

        const setTimer = () => {
            game.time++;
        }

        if(!data.token) {
            socket = null;
            return;
        }
        
        user = await getUser(data.token);
        if(!user) {
            socket = null;
            return;
        }

        difficulty = data.difficulty;
        switch(data.difficulty) {
            case 'easy':
                difficultyNumber = 0;
                break;
            case 'medium':
                difficultyNumber = 3;
                break;
            case 'hard':
                difficultyNumber = 5;
                break;
            case 'impossible':
                difficultyNumber = 7;
                break;
            default:
                difficulty = 'easy';
                difficultyNumber = 0;
                break;
        }
        

        for(let i = 0; i < games.length; i++) {
            if(games[i].secondPlayer == null && games[i].difficulty == difficulty && games[i].firstPlayer != user.username) {
                game = games[i];
                break;
            }
        }

        if(!game) {
            game = createNewGame(user.id, socket.id, user.username, difficulty);
            gameId = user.id;

        } else {
            game.secondPlayer = user.username;
            game.secondPlayerSocketId = socket.id;
            game.ready[user.username] = false;
            gameId = game.id;
            otherPlayerSocketId = game.firstPlayerSocketId;
            otherPlayerUsername = game.firstPlayer;
        }
        
        socket.join(gameId);

        socket.on('playerReady', async () => {
            game.ready[user.username] = true;

            if(game.ready[game.firstPlayer] && game.ready[game.secondPlayer]) {

                const sudokuString = await (await fetch(`https://sudoku.coach/beapi/get-game/${difficultyNumber}/1`)).text();
                game.board = sudokuString;
                const arr = Array(81).fill(null);
                for(let i = 0; i < 81; i++) {
                    const digit = Number(sudokuString[i]);
                    if(digit != 0) arr[i] = digit-1;
                }
                const solution = sudoku.solvepuzzle(arr);
                game.solution = '';
                for(let i = 0; i < 81; i++) {
                    game.solution += solution[i] + 1;
                }
                game.rating = sudoku.ratepuzzle(arr, 100);

                game.interval = setInterval(setTimer, 1000);
                io.to(gameId).emit('otherPlayerHasJoined');
            }

            

        })

        socket.on('startOnlineGame', () => {
            if(!otherPlayerUsername) {
                otherPlayerSocketId = game.secondPlayerSocketId;
                otherPlayerUsername = game.secondPlayer;
            }
            for(let i = 0; i < 81; i++) {
                if(game.board[i] != 0) currentScore++;
            }
            socket.emit('startPlaying', ({'board': game.board, 'enemy': otherPlayerUsername}));
        })

        socket.on('lostGame', async () => {
            destroySocket();
        })
        
        socket.on('checkWin', async (sudokuToCheck) => {
            let count = 0;
            for(let i = 0; i < 81; i++) {
                if(sudokuToCheck[i] == game.solution[i]) count++;
            }

            if(count == 81) {
                io.to(otherPlayerSocketId).emit('lost');
                winFunction(user, socket.id);
                destroySocket();
            }
            
            if((Math.floor(count / 9) * 9) > currentScore) {
                currentScore = count;
                io.to(otherPlayerSocketId).emit('penalty');
            }
        })

        
        socket.on('disconnect', async () => {
            if(otherPlayerUsername) {
                const [rows] = await pool.query(
                    'select * from user where username = ?',
                    [otherPlayerUsername]
                )
                if(rows.length == 0) return;
                winFunction(rows[0], otherPlayerSocketId);
            } else {
                games.splice(games.indexOf(game));
            }
            destroySocket();
        })

        const winFunction = async (dbUser, socketId) => {
            try {
                clearInterval(game.interval);
                let score = parseFloat(((game.rating * 100) + (600 - game.time)/100) * 3).toFixed(2);
                if(score < 1) score = 1;
                await pool.execute(
                    `
                    update user 
                    set points = points + ?, ${game.difficulty} = ${game.difficulty} + 1, games_won = games_won + 1, total = total + 1 
                    where id = ?
                    `, [score, dbUser.id]
                )
                await pool.execute(
                    'insert into score (id, user_id, score, solving_date) values (NULL, ?, ?, DEFAULT)',
                    [dbUser.id, score]
                )
                const [rows] = await pool.query(
                    'select * from user where id = ?', [dbUser.id]
                )

                io.to(socketId).emit('won', {'time': game.time, 'difficulty': game.difficulty, 'score': score, 'total': dbUser.points, 'gamesWon': dbUser.games_won});
                games.splice(games.indexOf(game), 1);
            }
            catch(err) {
                console.log(err);
            }
        }


        const destroySocket = () => {
            user = null;
            difficulty = null;
            difficultyNumber = null;
            gameId = null;
            interval = null;
            otherPlayerUsername = null;
            otherPlayerSocketId = null;
            socket = null;
            currentScore = null;
        }

    })
})

app.get('/', async (req, res) => {
    try {
        let user = req.user;
        res.send(components.page('Sudoku.dmi', components.homepage((user ? user.username : null), components.selectDifficulty() + components.selectMultiplayer((req.cookies.token ? req.cookies.token : null)))));
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
    
})

app.get('/multiplayer/:difficulty', async (req, res) => {
    try {
        let {difficulty} = req.params;
        switch(difficulty) {
            case 'easy':
            case 'medium':
            case 'hard':
            case 'impossible':
                break;
            default:
                difficulty = 'easy';
                break;
        }

        if(!req.cookies.token) {
            res.redirect('/profile');
            return;
        }

        const user = await getUser(req.cookies.token);
        
        if(!user) {
            res.redirect('/profile');
            return;
        }

        res.send(components.page(`Multiplayer ${difficulty} - Sudoku.dmi`, components.homepage(user.username, components.multiplayer(difficulty, req.cookies.token))));
    }
    catch(err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/solver', (req, res) => {
    try {
        res.send(components.page('Solver', components.homepage((req.user ? req.user.username : ''), components.solver())))
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})
app.get('/solver/:sudokuString', (req, res) => {
    try {
        const {sudokuString} = req.params;
        if(!sudokuString) {
            res.status(400).send('This sudoku has no solution');
            return;
        }
        let flag = true;
        const board = Array(81).fill(null);
        for(let i = 0; i < 81; i++) {
            let digit = Number(sudokuString[i]);
            if(digit > 0) {
                board[i] = digit - 1;
                flag = false;
            }
        }
        if(flag) {
            res.status(400).send('This sudoku has no solution');
            return;
        }

        const solution = sudoku.solvepuzzle(board);
        
        if(solution) {
            res.status(200).send(solution);
        } else {
            res.status(400).send('This sudoku has no solution');
        }
    }
    catch(err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/leaderboard', async (req, res) => {
    try {
        const allTimeLeaderBoard = await pool.query(
            'select SUM(score.score) as points, user.username from (score JOIN user on score.user_id = user.id) group by user_id order by points desc'
        );
        const monthlyLeaderboard = await pool.query(
            'select SUM(score.score) as points, user.username from (score JOIN user on score.user_id = user.id) where solving_date > DATE_SUB(CURDATE(), INTERVAL 1 MONTH) group by user_id order by points desc'
        );

        res.send(components.page('Solver', components.homepage((req.user ? req.user.username : ''), components.leaderboards(allTimeLeaderBoard, monthlyLeaderboard))))
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/sudoku/:difficulty', async (req, res) => {
    try {
        let difficulty;
        switch(req.params.difficulty) {
            case 'easy':
                difficulty = 0;
                break;
            case 'medium':
                difficulty = 3;
                break;
            case 'hard':
                difficulty = 5;
                break;
            case 'impossible':
                difficulty = 7;
                break;
            default:
                res.send(components.page('Not Found', components.homepage(req.user ? req.user.username : null, components.notFound())));
                return;

        }

        const sudoku = await (await fetch(`https://sudoku.coach/beapi/get-game/${difficulty}/1`)).text();

        // const sudoku = await (await fetch(`https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids${difficulty}}}`)).json();
        // console.log(sudoku.newboard);
        res.json({redirectUrl: `/play/${req.params.difficulty}/${sudoku}`});
    }
    catch(err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/play/:difficulty/:sudoku', (req, res) => {
    try {
        switch(req.params.difficulty) {
            case 'easy':
            case 'medium':
            case 'hard':
            case 'impossible':
                break;
            default:
                res.send(components.page('Not Found', components.homepage(req.user ? req.user.username : null, components.notFound())));
                return;
        }
        if(!req.params.sudoku) {
            res.send(components.page('Not Found', components.homepage(req.user ? req.user.username : null, components.notFound())));
            return;
        }
        res.send(components.page(`${req.params.difficulty} - Play sudoku`, components.homepage((req.user ? req.user.username : null), components.sudoku(req.params.sudoku, (req.user ? req.cookies.token: null)))))
    }
    catch(err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/profile', async (req, res) => {
    try {
        if(req.user) {
            res.redirect('/profile/' + req.user.username);
            return
        }
        res.send(components.page('Login - Signup', components.homepage(null, components.loginSignupForm())));
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/profile/:username', async (req, res) => {
    try {
        if(!req.params.username) {
            if(!req.user) {
                res.redirect('/profile');
                return;
            }
            res.redirect('/profile/' + req.user.username);
            return;
        }
        const [rows] = await pool.query(
            'select * from user where username = ?',
            [req.params.username]
        );
        if(rows.length == 0) {
            res.send(components.page('Not Found', components.homepage(req.user ? req.user.username : null, components.notFound())));
            return;
        }
        res.send(components.page(req.params.username + '\'s profile', components.homepage(req.user ? req.user.username : null, components.profilePage(rows[0], (req.user ? req.user.id == rows[0].id: 0), (req.user ? (req.user.id == rows[0].id) && (req.user.id == 1): 0)))));
    }
    catch(err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/user', async (req, res) => {
    try {
        const userEmail = req.query.userEmail;
        const password = req.query.password;

        if(!userEmail) {
            res.status(400).send('Invalid username or email');
            return;
        }
        if(!password || password.length < 8) {
            res.status(400).send('Password has to be at least 8 characters long');
            return;
        }

        const [rows] = await pool.query(
            'select * from user where email = ? or username = ?',
            [userEmail, userEmail]
        );

        if(rows.length == 0) {
            res.status(400).send('Invalid username or password');
            return;
        }

        const isPasswordCorrect = bcrypt.compare(password, rows[0].password);

        if(!isPasswordCorrect) {
            res.status(400).send('Invalid username or password');
            return;
        }

        const token = generateToken();

        await pool.execute(
            'insert into session (token, user_id, creation_date) VALUES (?, ?, DEFAULT)',
            [token, rows[0].id]
        );

        res.cookie('token', token);

        res.json({ redirectUrl: `/profile/${rows[0].username}` });
        // res.redirect('/profile/' + rows[0].username);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})

app.get('/admin', async (req, res) => {
    try {
        if(!req.user) {
            res.redirect('/');
            return;
        }
        if(!adminIds.includes(req.user.id)) {
            res.redirect('/');
            return;
        }
        // if(req.user.id != adminId) {
        //     res.redirect('/');
        //     return;
        // }
        let data = {};

        let [rows] = await pool.query(
            'select count(user.id) as total_users from user'
        );
        data.totalUsers = rows[0].total_users;

        [rows] = await pool.query(
            'select count(distinct user_id) as active_users from session where DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH)'
        )
        data.activeUsers = rows[0].active_users;

        [rows] = await pool.query(
            'select sum(points) as total_points, sum(total) as total, sum(easy) as total_easy, sum(medium) as total_medium, sum(hard) as total_hard, sum(impossible) as total_impossible, sum(games_won) as total_games from user'
        );
        data.totalPoints = parseFloat(rows[0].total_points).toFixed(2);
        data.total = rows[0].total;
        data.totalEasy = rows[0].total_easy;
        data.totalMedium = rows[0].total_medium;
        data.totalHard = rows[0].total_hard;
        data.totalImpossible = rows[0].total_impossible;
        data.totalGames = rows[0].total_games;

        res.send(components.page('Admin - Sudoku.dmi', components.homepage(req.user.username, components.adminPage(data))));
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})

app.post('/user', async (req, res) => {
    try {
        const email = replaceHTMLTags(req.body.email);
        const username = replaceHTMLTags(req.body.username);
        const password = replaceHTMLTags(req.body.password);
        const repeatedPassword = replaceHTMLTags(req.body.repeatedPassword);

        if(!email) {
            res.status(400).send('Invalid email');
            return;
        }
        if(!username) {
            res.status(400).send('Invalid username');
            return;
        }
        if(!password) {
            res.status(400).send('Invalid password');
            return;
        }
        if(password.length < 8) {
            res.status(400).send('Password has to be at least 8 characters long');
            return;
        }
        if(!repeatedPassword || password != repeatedPassword) {
            res.status(400).send('Passwords do not match');
            return;
        }

        const [rows] = await pool.query(
            'select * from user where email = ? or username = ?',
            [email, username]
        );

        if(rows.length > 0) {
            if(rows[0].email == email) {
                res.status(400).send('Email already exists');
                return;
            } else {
                res.status(400).send('Username already taken');
                return;
            }
        }

        const hashedPassword = await hashPassword(password);

        const [result] = await pool.execute(
            'insert into user (id, email, username, password, creation_date) VALUES (NULL, ?, ?, ?, DEFAULT)',
            [email, username, hashedPassword]
        )

        const token = generateToken();

        await pool.execute(
            'insert into session (token, user_id, creation_date) VALUES (?, ?, DEFAULT)',
            [token, result.insertId]
        );

        res.cookie('token', token);

        res.json({ redirectUrl: `/profile/${username}` });
        // res.redirect('/profile/' + username);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
});

app.delete('/user', async (req, res) => {
    try {
        if(req.user) {
            await pool.execute(
                'delete from session where token = ?',
                [req.cookies.token]
            );

            res.clearCookie('token');
        }
        res.json({ redirectUrl: `/` });
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
})

const getUser = async (token) => {
    try {
        let [rows] = await pool.query(
            'select * from session where token = ?',
            [token]
        );
        if(rows.length == 0) {
            return null;
        }

        const creationDate = new Date(rows[0].creationDate);
        if(new Date > new Date(creationDate.getTime() + (30 * 24 * 60 * 60 * 1000))) {
            await pool.execute(
                'delete from session where token = ?',
                [token]
            );
            return null;
        }

        const userID = rows[0].user_id;
        [rows] = await pool.query(
            'select * from user where id = ?',
            [userID]
        );
        return rows[0];
    }
    catch (err) {
        throw err;
    }
}

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err) {
        throw err;
    }
}

const generateToken = () => {
    try {
        const token = crypto.randomBytes(64).toString('hex');
        return token;
    }
    catch (err) {
        throw err;
    }
}

const replaceHTMLTags = (string) => {
    return string.replace(/<[^>]*>?/gm, '');
}

httpServer.listen(port, async () => {
    try {
        pool = await database.createPool(mysql);
        await database.databaseInit(pool);
    } catch (err) {
        console.log(err);
    }
    console.log("Server listening on port " + port);
})
