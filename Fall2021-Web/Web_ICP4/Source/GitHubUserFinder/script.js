function getGithubInfo(user, callback) {
    // Creating the instance of XMLHttpRequest
    let xhrHttp = new XMLHttpRequest();
    // Once Request is done will call the callback function
    xhrHttp.onload = function() {
        callback(xhrHttp)
    }
    // Doing the GET Request to get specific User info
    xhrHttp.open("GET", "https://api.github.com/users/"+user, true);
    xhrHttp.send();
}

function showUser(user) {
    // Clearing the noSuchProfile content
    $(".noSuchProfile").text("");
    // Displaying the Github User's profile and the UserName
    $(".avatar").html(`<img src="${user.avatar_url}" /><p>${user.login}</p>`)
    // Displaying the basic info like Name, GithubID, Github Link, Repos and No.of followers
    $(".information").html(`<p>Name: ${user.name}</p>
                            <p>Github ID: ${user.id}</p>
                            <p>Github Link: <a href="${user.html_url}">${user.html_url}</a></p>
                            <p>Repos: ${user.public_repos}</p>
                            <div> <span>${user.followers} followers  </span><span>  ${user.following} following</span> </div>`);
}

function noSuchUser(username) {
    // Clearing the profile content
    $(".avatar").html("");
    // Clearing the Basic info content
    $(".information").html("");
    // No User Message
    $(".noSuchProfile").text(`Sorry, The user ${username} does not exist`);
}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and once api is completed will call Callback function
            getGithubInfo(username, function (response){
                //if the response is successful show the user's details
                if (response.status == 200) {
                    showUser(JSON.parse(response.responseText));
                    //else display suitable message
                } else {
                    noSuchUser(username);
                }
            });
        }
    })
});
