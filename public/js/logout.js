const logoutButton = $('#logout-button');
logoutButton.click(() => {
    console.log("ciao");
    $.ajax({
        method: 'delete',
        url: '/user',
        success: function(response) {
            window.location.href = response.redirectUrl;
        },
        error: function(error) {
            console.log(error);
        }
    })
})