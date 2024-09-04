# Sudoku.dmi

Sudoku.dmi is sudoku game built using HTML, JavaScript and Node.js

### Features
- Singleplayer mode
- Multiplayer mode
- Solver
- Leaderboard

### Technologies used

- Node.js
- Express.js
- Bootstrap
- jQuery
- MySQL
- Socket.io

## Installation

### Prerequisites

Sudoku.dmi requires [Node.js](https://nodejs.org) and [MySQL](https://www.mysql.com) to run

### Setup

1. Start by cloning the repository
```bash
git clone https://github.com/UniCT-WebDevelopment/Sudoku-Multiplayer.git
cd Sudoku.dmi
```

2. Install required packages
```bash
npm install
```

3. Setup your mysql database data inside of database.js. It should look something like this:
```js
const databaseData = {
    user: 'user',
    password: 'password',
    host: 'localhost',
    database: 'sudoku.dmi'
};
```

4. Change the value of adminIds inside of server.js to your user id inside of the database. This will be done to access the [admin](http://localhost:5050/admin) page to show the website stats. It should look something like this:
```js
const adminIds = [1];
```

## Usage
1. Start the server
```bash
node server.js
```
2. Go to you browser and navigate to
http://localhost:5050

