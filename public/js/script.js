const menuButtons = $('#nav-bar #buttons');
const menuButton = $('#nav-bar #menu-button');
const homeButton = $('#nav-bar #sudoku-dmi');


menuButton.click(() => {
    menuButtons.toggleClass('d-none d-flex');
})
menuButtons.click((event) => {
    switch(event.target.id) {
        case 'play':
            window.location.href = '/';
            break;
            case 'solver':
            window.location.href = '/solver';
            break;
            case 'leaderboard':
            window.location.href = '/leaderboard';
            break;
            case 'profile':
            window.location.href = '/profile';
            break;
        default:
            break;
    }
})
homeButton.click(() => {
    window.location.href = '/';
})
