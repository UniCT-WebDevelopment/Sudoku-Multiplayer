components = {
    page: (title, component) => {
        return `
            <html lang="en">
                <head>
                    <link rel="icon" href="/img/icon.ico">
                    <meta charset="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <link rel="stylesheet" href="/css/style.css">
                    <link rel="stylesheet" href="/css/sudoku.css">
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"/>
                    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
                    <script src="/socket.io/socket.io.js"></script>
                    <title>${title}</title>
                </head>
                <body class="text-light">
                    ${component}
                    <script src="/js/script.js"></script>
                </body>
            </html>
        `;
    },

    homepage: (username, component) => {
        return `
            <div class="container-fluid" id="nav-bar">
                <div class="row title-bar text-dark fixed-top" id="title-bar">
                    <div class="col-12 d-flex flex-column flex-sm-row justify-content-between">
                        <div class="d-flex">
                            <div role="button" class="d-flex d-sm-none align-items-center justify-content-center p-1" id="menu-button">
                                <div class="menu rounded m-1"></div>
                            </div>
                            <div class="m-1" style="font-size: 40px" role="button" id="sudoku-dmi">
                                <div>Sudoku.dmi</div>
                            </div>
                        </div>
                        <div class="d-none d-sm-flex flex-column flex-sm-row justify-content-start justify-content-sm-end" id="buttons">
                            <div role="button" class="m-1 m-sm-3 d-flex align-items-center" id="play">Play</div>
                            <div role="button" class="m-1 m-sm-3 d-flex align-items-center" id="solver">Solver</div>
                            <div role="button" class="m-1 m-sm-3 d-flex align-items-center" id="leaderboard">Leaderboard</div>
                            <div role="button" class="m-1 m-sm-3 d-flex align-items-center" id="profile">
                                ${username ? username : 'Profile'} &nbsp;
                                <i class="fa-regular fa-user" id="profile"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" style="padding-top: 70px">
                    <div class="col-12 container-fluid" >
                        <div class="row" id="outside-container">
                            ${component}
                        </div>
                    </div>
                </div>
            </div>
        `
    },

    notFound: () => {
        return `
            <div class="fs-1">404 page not found</div>
        `
    },

    selectDifficulty: () => {
        return `
        <div class="w-100 py-3 px-0 px-sm-3">
            <div class="container-fluid p-3" style="background-color: rgb(255, 255, 255, 0.05); max-width: 1000px">
                <div class="row fs-1 px-3">
                    Singleplayer
                </div>
                <div class="row px-2">
                    <div role="button" id="easy-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Easy
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">9</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">8</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">1</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">7</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">4</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">6</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">5</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                            </div>
                        </div>
                    </div>
                    <div role="button" id="medium-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Medium
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">3</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">5</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">6</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">1</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">2</div>
                            </div>
                        </div>
                    </div>
                    <div role="button" id="hard-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Hard
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">1</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">2</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                            </div>
                        </div>
                    </div>
                    <div role="button" id="impossible-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Impossible
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">6</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/js/difficulty.js"></script>
        `;
    },

    selectMultiplayer: (token) => {
        return `
            <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content rounded-0" style="background-color: rgb(58,58,58)">
                        <div class="modal-body d-flex justify-content-start">
                            You have to be logged in to play multiplayer
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary col-auto hover-opaque bg-light text-dark fw-normal" style="border: none; border-radius: 0;" data-dismiss="modal">Close</button>
                            <button type="button" onclick="window.location.href='/profile';" class="btn btn-primary hover-opaque" style="border: none; border-radius:0;">Login</button>
                        </div>
                    </div>
                </div>
            </div>
            <script>const token = ${token ? "'" + token + "'": null}</script>
            <div class="w-100 py-3 px-0 px-sm-3">
            <div class="container-fluid p-3" style="background-color: rgb(255, 255, 255, 0.05); max-width: 1000px">
                <div class="row fs-1 px-3">
                    Multiplayer
                </div>
                <div class="row px-2">
                    <div role="button" id="multiplayer-easy-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Easy
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">8</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">5</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">3</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">2</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">1</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">9</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">4</div>
                            </div>
                        </div>
                    </div>
                    <div role="button" id="multiplayer-medium-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Medium
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">6</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">9</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">5</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">7</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">1</div>
                            </div>
                        </div>
                    </div>
                    <div role="button" id="multiplayer-hard-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Hard
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">3</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">2</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">7</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                            </div>
                        </div>
                    </div>
                    <div role="button" id="multiplayer-impossible-button" class="col d-flex justify-content-center p-2 mx-4 my-1">
                        <div class="conatiner">
                            <div class="row bg-light text-dark px-2 border-box-shadow" style="width: 30vw; max-width: 150px; font-size: 0.8em;">
                                Impossible
                            </div>
                            <div class="row position-relative" style="width: 30vw; max-width: 150px;">
                                <div id="loading" class="position-absolute w-100 h-100 d-none justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                                    <i class="fa-solid fa-spinner fs-1"></i>
                                </div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;">8</div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                                <div class="col-4 fs-1 d-flex justify-content-center align-items-center border-box-shadow" style="background-color:rgb(255, 255, 255, 0.05); width: 10vw; height: 10vw; max-width: 50px; max-height: 50px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="/js/joinMultiplayer.js"></script>
        `
    },

    multiplayer: (difficulty, token) => {
        const grid = components.generateGrid(Array(81).fill(0));
        return `
            <script>const token = ${token ? "'" + token + "'": null}; const difficulty = '${difficulty}'</script>
            <div id="grid" class="col-12 container my-5" style="width: ${components.squareSize * 9}vw; height: ${components.squareSize * 9}vw; max-width: 540px; max-height: 540px;">
                <div class="row mb-2">
                    <div id="enemys-username" class="col-12" style="background-color: rgb(58,58,58)">
                        Looking for a player to play against
                    </div>
                </div>
                <div id="sudoku-title" class="row bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">
                    <div class="col-12 container">
                        <div class="row">
                            <div class="col-4">${difficulty}</div>
                            <div id="timer" class="col-4 d-flex justify-content-center">00:00</div>
                            <div class="col-4 d-flex justify-content-end">Multiplayer</div>
                        </div>
                    </div>
                </div>
                <div class="row position-relative">
                    ${grid}
                    <div id="cover" class="col-12 w-100 h-100 d-none z-3 position-absolute d-flex justify-content-center align-items-center" style="background-color: rgb(50, 50, 50)">Game is paused</div>
                    <div id="loading" class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center flex-column" style="background-color: rgb(58,58,58);">
                        <div class="fs-1 mb-5">Matchmaking</div>
                        <i class="fa-solid fa-spinner fs-1"></i>
                    </div>    
                </div>
            </div>
            <div class="col-12 p-0 mt-3"> 
                <div class="container-fluid">
                    <div class="row d-flex p-0 justify-content-center">
                        ${components.sudokuControls()}
                        ${components.sudokuSolutionControls}
                        ${components.sudokuCandidateControls}
                        ${components.sudokuHighlightControls}
                        ${components.sudokuColorControls}
                    </div>
                </div>
            </div>
            <script src="/js/multiplayer.js"></script>
        `;
    },

    solver: () => {
        const grid = components.generateGrid(Array(81).fill(0));
        return `
            <div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content rounded-0" style="background-color: rgb(58,58,58)">
                        <div class="modal-body d-flex justify-content-start">
                            This sudoku has no solution
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary col-auto hover-opaque bg-light text-dark fw-normal" style="border: none; border-radius: 0;" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="grid" class="col-12 container my-5" style="width: ${components.squareSize * 9}vw; height: ${components.squareSize * 9}vw; max-width: 540px; max-height: 540px;">
                <div id="sudoku-title" class="row bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">
                    <div class="col-12 d-flex justify-content-center">Solver</div>
                </div>
                <div class="row position-relative">
                    ${grid}
                    <div id="cover" class="col-12 w-100 h-100 d-none z-3 position-absolute d-flex justify-content-center align-items-center" style="background-color: rgb(50, 50, 50)">Game is paused</div>
                </div>
            </div>
            <div class="col-12 p-0">
                <div class="container-fluid">
                    <div class="row d-flex p-0 justify-content-center">
                        ${components.sudokuControls(components.solveControls)}
                        ${components.sudokuSolutionControls}
                        ${components.sudokuHighlightControls}
                    </div>
                </div>
            </div>
            <script src="/js/solver.js"></script>
        `;
    },

    leaderboard: (data, title) => {
        let ret = `
            <div class="row fs-1">
                ${title}
            </div>
            <div class="row">
                <div class="col-12 d-flex bg-light text-dark justify-content-between" style="font-size: 0.8em;">
                    <div class="d-flex">
                        <div class="me-2">
                            pos
                        </div>
                        <div>
                            player
                        </div>
                    </div>
                    <div>points</div>
                </div>
            </div>
        `;

        for(let i = 0; i < data[0].length; i++) {
            ret += `
                <div class="row fs-5">
                    <div class="col-12 d-flex justify-content-between border-box-shadow">
                        <div role="button" class="d-flex" onclick="window.location.href='/profile/${data[0][i].username}'" style="color: ${i == 0 ? '#ffd700' : i == 1 ? '#a5a9b4' : i == 2 ? '804a00' : 'white'}">
                            <div class="me-2">
                                ${i+1}
                            </div>
                            <div>
                                ${data[0][i].username}
                            </div>
                        </div>
                        <div>${parseFloat(data[0][i].points).toFixed(2)}</div>
                    </div>
                </div>
            `
        }
        ret += '<div class="row">&nbsp;</div>'
        return `<div class="container-fluid">` + ret + `</div>`;
    },

    leaderboards: (allTimeLeaderboard, monthlyLeaderboard) => {
        return `
            ${components.splitSection(components.leaderboard(allTimeLeaderboard, "All-time leaderboard"), "All-time", components.leaderboard(monthlyLeaderboard, "Monthly leaderboard"), "Monthly")}
        `;
    },

    splitSection: (firstSection, firstSectionTitle, secondSection, secondSectionTitle) => {
        return `
            <div class="position-relative d-flex justify-content-center py-3">
                <div class="position-absolute d-flex w-100 px-0 px-sm-3">
                    <div class="container-fluid" style="max-width: 1000px;">
                        <div class="row">
                            <div role="button" id="first-section-button" class="col-auto bg-light text-dark fs-3 mx-4 z-1">
                                ${firstSectionTitle}
                            </div>
                        </div>
                        <div id="first-section-div" class="row d-block" style="background-color: rgb(58,58,58);">
                            <div class="col-12">
                                ${firstSection}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="position-absolute d-flex w-100 px-0 px-sm-3">
                    <div class="container-fluid" style="max-width: 1000px;">
                        <div class="row d-flex justify-content-end">
                            <div role="button" id="second-section-button" class="unselected col-auto bg-light text-dark fs-3 mx-4">
                                ${secondSectionTitle}
                            </div>
                        </div>
                        <div id="second-section-div" class="row d-none" style="background-color: rgb(58,58,58);">
                            <div class="col-12">
                                ${secondSection}
                            </div>
                        </div>
                    </div>
                </div>
                <script>
                    const firstSectionButton = $('#first-section-button');
                    const secondSectionButton = $('#second-section-button');
                    const firstSectionDiv = $('#first-section-div');
                    const secondSectionDiv = $('#second-section-div');
                    firstSectionButton.click(() => {
                        if(secondSectionButton.hasClass('unselected')) return;
                        secondSectionButton.addClass('unselected');
                        secondSectionDiv.removeClass('d-block').addClass('d-none');

                        firstSectionDiv.removeClass('d-none').addClass('d-block');
                        firstSectionButton.removeClass('unselected');
                    })
                    secondSectionButton.click(() => {
                        if(firstSectionButton.hasClass('unselected')) return;
                        firstSectionButton.addClass('unselected');
                        firstSectionDiv.removeClass('d-block').addClass('d-none');

                        secondSectionDiv.removeClass('d-none').addClass('d-block');
                        secondSectionButton.removeClass('unselected');
                    })
                </script>
            </div>
        `
    },

    loginForm: () => {
        return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col fs-1">Login</div>
                </div>
                <div class="row">
                    <form class="col-12 my-3 container-fluid" id="login-form">
                        <div class="row mb-1">
                            <div class="col fs-3">Login to your account</div>
                        </div>
                        <div class="row px-3 my-2">
                            <label class="col-auto bg-light text-dark" style="font-size: 0.8em;" for="username-email">Username or email</label>
                            <input class="col-12 border-box-shadow text-light" style="border: none; border-radius: 0; background-color: rgb(58,58,58);" type="text" name="username-email" id="username-email" placeholder="username or email">
                        </div>
                        <div class="row px-3 my-2">
                            <label class="col-auto bg-light text-dark" style="font-size: 0.8em;" for="password">Password</label>
                            <input class="col-12 border-box-shadow text-light" style="border: none; border-radius: 0; background-color: rgb(58,58,58);"  type="password" name="password" id="password" placeholder="password">
                        </div>
                        <div class="row px-3" style="height: 30px;">
                            <div class="row text-warning" id="error"></div>
                        </div>
                        <div class="row px-3 d-flex justify-content-end">
                            <input class="col-auto hover-opaque bg-light text-dark fw-normal" style="border: none; border-radius: 0;" type="submit" value="Login">
                        </div>
                    </form>
                </div>
            </div>
        `
    },

    signupForm: () => {
        return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col fs-1">Signup</div>
                </div>
                <div class="row">
                    <form class="col-12 my-3 container-fluid" id="signup-form">
                        <div class="row mb-1">
                            <div class="col fs-3">Create a new account</div>
                        </div>
                        <div class="row px-3 my-2">
                            <label class="col-auto bg-light text-dark" style="font-size: 0.8em;" for="email">Email</label>
                            <input class="col-12 border-box-shadow text-light" style="border: none; border-radius: 0; background-color: rgb(58,58,58);" type="text" name="email" id="email" placeholder="email">
                        </div>
                        <div class="row px-3 my-2">
                            <label class="col-auto bg-light text-dark" style="font-size: 0.8em;" for="username">Username</label>
                            <input class="col-12 border-box-shadow text-light" style="border: none; border-radius: 0; background-color: rgb(58,58,58);" type="text" name="username" id="username" placeholder="username">
                        </div>
                        <div class="row px-3 my-2">
                            <label class="col-auto bg-light text-dark" style="font-size: 0.8em;" for="password">Password</label>
                            <input class="col-12 border-box-shadow text-light" style="border: none; border-radius: 0; background-color: rgb(58,58,58);"  type="password" name="password" id="password" placeholder="password">
                        </div>
                        <div class="row px-3 my-2">
                            <label class="col-auto bg-light text-dark" style="font-size: 0.8em;" for="password">Repeat password</label>
                            <input class="col-12 border-box-shadow text-light" style="border: none; border-radius: 0; background-color: rgb(58,58,58);" type="password" name="repeated_password" id="repeated_password" placeholder="repeate password" >
                        </div>
                        <div class="row px-3" style="height: 30px;">
                            <div class="row text-warning" id="error"></div>
                        </div>
                        <div class="row px-3 d-flex justify-content-end">
                            <input class="col-auto hover-opaque bg-light text-dark fw-normal" style="border: none; border-radius: 0;" type="submit" value="Signup">
                        </div>
                    </form>
                </div>
            </div>
        `
    },

    loginSignupForm: () => {
        return `
            ${components.splitSection(components.loginForm(), "Login", components.signupForm(), "Signup")}
            <script src="/js/loginSignup.js"></script>
        `
    },

    logoutButton: () => {
        return `
            <div class="d-flex justify-content-end align-items-center">
                <div id="logout-button" role="button" class="bg-danger d-flex justify-content-center align-items-center px-2 rounded mx-2" style="height: 30px;">
                    logout
                </div>
            </div>
            <script src="/js/logout.js"></script>
        `;
    },

    adminButton: `
        <div class="d-flex justify-content-end align-items-center">
            <div id="admin-button" role="button" onclick="window.location.href='/admin'" class="bg-primary d-flex justify-content-center align-items-center px-2 rounded mx-2" style="height: 30px;">
                admin
            </div>
        </div>
    `,

    profilePage: (user, isOwner, isAdmin) => {
        return `
            <div class="d-flex w-100 py-3 px-0 px-sm-3">
                <div class="container-fluid" style="background-color: rgb(255, 255, 255, 0.05); max-width: 1000px">
                    <div class="row mx-0 mx-sm-2">
                        <div class="col-12 d-flex justify-content-between">
                            <div class="fs-1">${user.username}'s profile</div>
                            <div class="d-flex">
                                ${isOwner ? components.logoutButton() : ''}
                                ${isAdmin ? components.adminButton : ''}
                            </div>
                        </div>
                    </div>
                    <div class="row border border-secondary my-2 mx-0 mx-sm-2"></div>
                    <div class="row mx-0 mx-sm-2 mt-4">
                        <div class=" col-auto bg-light text-dark" style="font-size: 0.8em;">Stats</div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div>Playing sudoku.dmi since</div>
                            <div class="d-flex justify-content-end">${new Date(user.creation_date).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div >Total points:</div>
                            <div class="d-flex justify-content-end" >${user.points}</div>
                        </div>
                    </div>
                    
                    <div class="row mx-0 mx-sm-2 mt-4">
                        <div class=" col-auto bg-light text-dark" style="font-size: 0.8em;">Sudokus solved</div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div>Total:</div>
                            <div class="d-flex justify-content-end">${user.total}</div>
                        </div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div>Easy:</div>
                            <div class="d-flex justify-content-end">${user.easy}</div>
                        </div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div>Medium:</div>
                            <div class="d-flex justify-content-end">${user.medium}</div>
                        </div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div>Hard:</div>
                            <div class="d-flex justify-content-end">${user.hard}</div>
                        </div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div>Impossible:</div>
                            <div class="d-flex justify-content-end">${user.impossible}</div>
                        </div>
                    </div>

                    <div class="row mx-0 mx-sm-2 mt-4">
                        <div class=" col-auto bg-light text-dark" style="font-size: 0.8em;">Multiplayer</div>
                    </div>
                    <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                        <div class="col-12 d-flex justify-content-between">
                            <div>Games won:</div>
                            <div class="d-flex justify-content-end">${user.games_won}</div>
                        </div>
                    </div>
                    <div class="row">&nbsp;</div>
                </div>
            </div>
        `
    },

    adminPage: (data) => {
        return `
            <div class="d-flex w-100 py-3 px-0 px-sm-3">
                        <div class="container-fluid" style="background-color: rgb(255, 255, 255, 0.05); max-width: 1000px">
                            <div class="row mx-0 mx-sm-2">
                                <div class="col-12">
                                    <div class="fs-1">Website stats</div>
                                </div>
                            </div>
                            <div class="row border border-secondary my-2 mx-0 mx-sm-2"></div>
                            <div class="row mx-0 mx-sm-2 mt-4">
                                <div class=" col-auto bg-light text-dark" style="font-size: 0.8em;">Stats</div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Total users:</div>
                                    <div class="d-flex justify-content-end">${data.totalUsers}</div>
                                </div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Active users:</div>
                                    <div class="d-flex justify-content-end">${data.activeUsers}</div>
                                </div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div >Total points from all users:</div>
                                    <div class="d-flex justify-content-end" >${data.totalPoints}</div>
                                </div>
                            </div>
                            
                            <div class="row mx-0 mx-sm-2 mt-4">
                                <div class=" col-auto bg-light text-dark" style="font-size: 0.8em;">Sudokus solved from all users</div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Total:</div>
                                    <div class="d-flex justify-content-end">${data.total}</div>
                                </div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Easy:</div>
                                    <div class="d-flex justify-content-end">${data.totalEasy}</div>
                                </div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Medium:</div>
                                    <div class="d-flex justify-content-end">${data.totalMedium}</div>
                                </div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Hard:</div>
                                    <div class="d-flex justify-content-end">${data.totalHard}</div>
                                </div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Impossible:</div>
                                    <div class="d-flex justify-content-end">${data.totalImpossible}</div>
                                </div>
                            </div>
        
                            <div class="row mx-0 mx-sm-2 mt-4">
                                <div class=" col-auto bg-light text-dark" style="font-size: 0.8em;">Multiplayer</div>
                            </div>
                            <div class="row mx-0 mx-sm-2 border-box-shadow" style="background-color: rgb(58,58,58)">
                                <div class="col-12 d-flex justify-content-between">
                                    <div>Games played:</div>
                                    <div class="d-flex justify-content-end">${data.totalGames}</div>
                                </div>
                            </div>
                            <div class="row">&nbsp;</div>
                        </div>
                    </div>
        `;
    },

    squareSize: 11,

    generateSmallSquare(numbers) {
        let ret = `<div class="col-4"><div class="row p-0" style="box-shadow: 0 0 0 2px rgb(100, 100, 100); width: ${components.squareSize * 3}vw; height: ${components.squareSize * 3}vw; max-width: 180px; max-height: 180px;">`;
        for(let i = 0; i < 9; i++) {
            let border = 'border: 3px; box-shadow: 0 0 0 0.5px rgb(100, 100, 100);';
            let element = `<div role="button" class="grid-element ${numbers[i] != 0 ? 'correct-solution':''} position-relative hover-opaque col-4 fs-1 m-0 d-flex align-items-center justify-content-center" style="width: ${components.squareSize}vw; height: ${components.squareSize}vw; max-width: 60px; max-height: 60px; user-select: none; -webkit-user-select: none; background-color: rgb(255, 255, 255, 0.05); ${border}">${numbers[i] != 0 ? numbers[i]:'&nbsp;'}</div>`
            ret += element;
        }
        ret += '</div></div>';
        return ret;  fds
    },

    generateGrid: (sudoku) => {
        let grid = '';
        if(sudoku.length != 81) {
            return components.notFound();
        }
        let numbers = [[], [], [], [], [], [], [], [], []];
        numbers[0][0] = sudoku[0];
        numbers[0][1] = sudoku[1];
        numbers[0][2] = sudoku[2];
        numbers[1][0] = sudoku[3];
        numbers[1][1] = sudoku[4];
        numbers[1][2] = sudoku[5];
        numbers[2][0] = sudoku[6];
        numbers[2][1] = sudoku[7];
        numbers[2][2] = sudoku[8];
        numbers[0][3] = sudoku[9];
        numbers[0][4] = sudoku[10];
        numbers[0][5] = sudoku[11];
        numbers[1][3] = sudoku[12];
        numbers[1][4] = sudoku[13];
        numbers[1][5] = sudoku[14];
        numbers[2][3] = sudoku[15];
        numbers[2][4] = sudoku[16];
        numbers[2][5] = sudoku[17];
        numbers[0][6] = sudoku[18];
        numbers[0][7] = sudoku[19];
        numbers[0][8] = sudoku[20];
        numbers[1][6] = sudoku[21];
        numbers[1][7] = sudoku[22];
        numbers[1][8] = sudoku[23];
        numbers[2][6] = sudoku[24];
        numbers[2][7] = sudoku[25];
        numbers[2][8] = sudoku[26];
        numbers[3][0] = sudoku[27];
        numbers[3][1] = sudoku[28];
        numbers[3][2] = sudoku[29];
        numbers[4][0] = sudoku[30];
        numbers[4][1] = sudoku[31];
        numbers[4][2] = sudoku[32];
        numbers[5][0] = sudoku[33];
        numbers[5][1] = sudoku[34];
        numbers[5][2] = sudoku[35];
        numbers[3][3] = sudoku[36];
        numbers[3][4] = sudoku[37];
        numbers[3][5] = sudoku[38];
        numbers[4][3] = sudoku[39];
        numbers[4][4] = sudoku[40];
        numbers[4][5] = sudoku[41];
        numbers[5][3] = sudoku[42];
        numbers[5][4] = sudoku[43];
        numbers[5][5] = sudoku[44];
        numbers[3][6] = sudoku[45];
        numbers[3][7] = sudoku[46];
        numbers[3][8] = sudoku[47];
        numbers[4][6] = sudoku[48];
        numbers[4][7] = sudoku[49];
        numbers[4][8] = sudoku[50];
        numbers[5][6] = sudoku[51];
        numbers[5][7] = sudoku[52];
        numbers[5][8] = sudoku[53];
        numbers[6][0] = sudoku[54];
        numbers[6][1] = sudoku[55];
        numbers[6][2] = sudoku[56];
        numbers[7][0] = sudoku[57];
        numbers[7][1] = sudoku[58];
        numbers[7][2] = sudoku[59];
        numbers[8][0] = sudoku[60];
        numbers[8][1] = sudoku[61];
        numbers[8][2] = sudoku[62];
        numbers[6][3] = sudoku[63];
        numbers[6][4] = sudoku[64];
        numbers[6][5] = sudoku[65];
        numbers[7][3] = sudoku[66];
        numbers[7][4] = sudoku[67];
        numbers[7][5] = sudoku[68];
        numbers[8][3] = sudoku[69];
        numbers[8][4] = sudoku[70];
        numbers[8][5] = sudoku[71];
        numbers[6][6] = sudoku[72];
        numbers[6][7] = sudoku[73];
        numbers[6][8] = sudoku[74];
        numbers[7][6] = sudoku[75];
        numbers[7][7] = sudoku[76];
        numbers[7][8] = sudoku[77];
        numbers[8][6] = sudoku[78];
        numbers[8][7] = sudoku[79];
        numbers[8][8] = sudoku[80];
        
        
        for(let i = 0; i < 9; i++) {
            grid += components.generateSmallSquare(numbers[i]);
        }

        return grid;
    },

    solveControls: `
            <div role="button" id="solve" class="hover-opaque col col-md-12 fs-2 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); color:white; height: 11vw; max-height: 60px">Solve</div>
    `,

    sudokuControls: (extraControl) => `
        <div id="controls" class="col-6 col-md my-2 buttons-container">
            <div class="bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">Controls</div>
            <div class="container-fluid">
                <div class="row">
                    <div role="button" id="erase" class="hover-opaque col col-md-4 fs-2 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); color:white; height: 11vw; max-height: 60px"><i class="fa-solid fa-eraser" style="pointer-events: none;"></i></div>
                    <div role="button" id="backward" class="hover-opaque text-secondary col col-md-4 fs-2 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); color:white; height: 11vw; max-height: 60px"><i class="fa-solid fa-arrow-left" style="pointer-events: none;"></i></div>
                    <div role="button" id="forward" class="hover-opaque text-secondary col col-md-4 fs-2 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); color:white; height: 11vw; max-height: 60px"><i class="fa-solid fa-arrow-right" style="pointer-events: none;"></i></div>
                    ${extraControl ? extraControl : ''}
                </div>
            </div>
        </div>
    `,

    sudokuSolutionControls: `
        <div id="solution" class="col-12 col-md my-2 buttons-container">
            <div class="bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">Solution</div>
            <div class="container-fluid">
                <div class="row">
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">1</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">2</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">3</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">4</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">5</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">6</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">7</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">8</div>
                    <div role="button" class="hover-opaque solution col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">9</div>
                </div>
            </div>
        </div>
    `,

    sudokuCandidateControls: `
        <div id="candidate" class="col-12 col-md my-2 buttons-container">
            <div class="bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">Cell candidate</div>
            <div class="container-fluid">
                <div class="row">
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-1">1</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-2">2</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-3">3</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-4">4</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-5">5</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-6">6</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-7">7</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-8">8</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow position-relative d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px"><div class="p-2 d-flex position-absolute candidate candidate-9">9</div></div>
                </div>
            </div>
        </div>
    `,

    sudokuHighlightControls: `
        <div id="highlight" class="col-12 col-md my-2 buttons-container">
            <div class="bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">Highlight</div>
            <div class="container-fluid">
                <div class="row">
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">1</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">2</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">3</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">4</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">5</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">6</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">7</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">8</div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 border-box-shadow d-flex justify-content-center align-items-center highlight" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">9</div>
                </div>
            </div>
        </div>
    `,

    sudokuColorControls: `
        <div id="color" class="col-12 col-md my-2 buttons-container">
            <div class="bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">Color</div>
            <div class="container-fluid">
                <div class="row">
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute fs-1 text-danger justify-content-center align-items-center">X</div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center green"      ></div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center yellow"     ></div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center purple"     ></div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center pink"       ></div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center orange"     ></div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center red"        ></div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center blue"       ></div></div>
                    <div role="button" class="hover-opaque col col-md-4 fs-1 position-relative border-box-shadow d-flex justify-content-center align-items-center" style="background-color: rgb(255, 255, 255, 0.05); height: 11vw; max-height: 60px">&nbsp;<div class="w-100 h-100 p-2 d-flex position-absolute justify-content-center align-items-center light-blue" ></div></div>
                </div>
            </div>
        </div>
    `,
    
    sudoku: (sudoku, token) => {
        const grid = components.generateGrid(sudoku);

        return `
        <script>const token = ${token ? "'" + token + "'": 'null'};</script>
                <div id="grid" class="col-12 container my-5" style="width: ${components.squareSize * 9}vw; height: ${components.squareSize * 9}vw; max-width: 540px; max-height: 540px;">
                    <div id="sudoku-title" class="row bg-light border-box-shadow text-dark px-2" style="font-size: 0.8rem;">
                        <div id="difficulty" class="col-4"></div>
                        <div id="timer" class="col-4 d-flex justify-content-center">00:00</div>
                        <div class="col-4 d-flex justify-content-end"><div role="button" id="pause" class="px-2">II</div></div>
                    </div>
                    <div class="row position-relative">
                        ${grid}
                        <div id="cover" class="col-12 w-100 h-100 d-none z-3 position-absolute d-flex justify-content-center align-items-center" style="background-color: rgb(50, 50, 50)">Game is paused</div>
                        <div id="loading" class="position-absolute w-100 h-100 d-flex justify-content-center align-items-center" style="background-color: rgb(58,58,58);">
                            <i class="fa-solid fa-spinner fs-1"></i>
                        </div>
                    </div>
                </div>
                <div class="col-12 p-0">
                    <div class="container-fluid">
                        <div class="row d-flex p-0 justify-content-center">
                            ${components.sudokuControls()}
                            ${components.sudokuSolutionControls}
                            ${components.sudokuCandidateControls}
                            ${components.sudokuHighlightControls}
                            ${components.sudokuColorControls}
                        </div>
                    </div>
                </div>
            <script src="/js/sudoku.js"></script>
        `;
    }
}

module.exports = components;