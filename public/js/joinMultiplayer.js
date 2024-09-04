
const multiplayerEasyButton = $('#multiplayer-easy-button');
const multiplayerMediumButton = $('#multiplayer-medium-button');
const multiplayerHardButton = $('#multiplayer-hard-button');
const multiplayerImpossibleButton = $('#multiplayer-impossible-button');
let socket;

multiplayerEasyButton.click(() => {
    if(token == null) {
        $('#modal').modal('show');
        return;
    }
    window.location.href = '/multiplayer/easy';
})
multiplayerMediumButton.click(() => {
    if(!token) {
        $('#modal').modal('show');
        return;
    }
    window.location.href = '/multiplayer/medium';
})
multiplayerHardButton.click(() => {
    if(!token) {
        $('#modal').modal('show');
        return;
    }
    window.location.href = '/multiplayer/hard';
})
multiplayerImpossibleButton.click(() => {
    if(!token) {
        $('#modal').modal('show');
        return;
    }
    window.location.href = '/multiplayer/impossible';
})
