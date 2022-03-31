var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


var formSubmithandler = function(event){
  event.preventDefault();
  //console.log(event);

  // GET VALUE FROM INPUT ELEMENT
  var username = nameInputEl.value.trim();

  if(username){
      getUserRepos(username);
      nameInputEl.value = "";
  } else {
      alert("Please enter a Github Username");
  }
};

var displayRepos = function(repos, searchTerm){
    //CHECK TO SEE IF GITHUB RETURNED A EMPTY VALUE/ARRAY
    if(repos.length === 0){
repoContainerEl.textContent = "There are no Repositories to display at this time! check back later.";
  return;
    }
    //console.log(repos);
    //console.log(searchTerm);

    //CLEAR OUT ANY OLD CONTENT
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //LOOP OVER REPOS
    for (var i =0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //CREATE A CONTAINER FOR EACH REPO 
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //CREATE A SPAN ELEMENT TO HOLD REPOSIOTRY NAME
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //APPEND TO CONTAINER
        repoEl.appendChild(titleEl);


        //CREATE A STATUS ELEMENT
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // CHECK IF CURRENT REPO HAS ISSUES OR NOT
        if(repos[i].open_issues_count > 0){
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //APPEND TO CONTAINER
        repoEl.appendChild(statusEl);

        //APPEND CONTAINER TO THE DOM
        repoContainerEl.appendChild(repoEl);
    }

    
};



var getUserRepos = function(user){
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make request to url
    fetch(apiUrl)
    .then(function(Response){
        //If response was successful
        if(Response.ok){
            Response.json().then(function(data){
                displayRepos(data,user);
                
            });
        }else{
            alert("Error: User Not Found!");
        }
    })
    .catch( function(error){
        alert("unable to connect to Github")
    });
    
};

userFormEl.addEventListener("submit", formSubmithandler);