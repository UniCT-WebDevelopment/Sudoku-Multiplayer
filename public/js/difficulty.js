const easyButton = $('#easy-button');
const mediumButton = $('#medium-button');
const hardButton = $('#hard-button');
const impossibleButton = $('#impossible-button');

easyButton.click(() => {
    $(easyButton).find('#loading').removeClass('d-none').addClass('d-flex');
    $.ajax({
        url: '/sudoku/easy',
        method: 'get',
        success: function(response) {
            window.location.href = response.redirectUrl;
        },
        error: function(response) {
            console.log(response);
        }
    })
})

mediumButton.click(() => {
    $(mediumButton).find('#loading').removeClass('d-none').addClass('d-flex');
    $.ajax({
        url: '/sudoku/medium',
        method: 'get',
        success: function(response) {
            window.location.href = response.redirectUrl;
        },
        error: function(response) {
            console.log(response);
        }
    })
})

hardButton.click(() => {
    $(hardButton).find('#loading').removeClass('d-none').addClass('d-flex');
    $.ajax({
        url: '/sudoku/hard',
        method: 'get',
        success: function(response) {
            window.location.href = response.redirectUrl;
        },
        error: function(response) {
            console.log(response);
        }
    })
})

impossibleButton.click(() => {
    $(impossibleButton).find('#loading').removeClass('d-none').addClass('d-flex');
    $.ajax({
        url: '/sudoku/impossible',
        method: 'get',
        success: function(response) {
            window.location.href = response.redirectUrl;
        },
        error: function(response) {
            console.log(response);
        }
    })
})

window.addEventListener('pageshow', () => {
    easyButton.find('#loading').removeClass('d-flex').addClass('d-none');
    mediumButton.find('#loading').removeClass('d-flex').addClass('d-none');
    hardButton.find('#loading').removeClass('d-flex').addClass('d-none');
    impossibleButton.find('#loading').removeClass('d-flex').addClass('d-none');
});