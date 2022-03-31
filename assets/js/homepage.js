var getUserRepos = function(user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/google/repos";

    //make request to url
    fetch(apiUrl).then(function(Response){
        Response.json().then(function(data){
            console.log(data);
        })
    });
   
};

getUserRepos();