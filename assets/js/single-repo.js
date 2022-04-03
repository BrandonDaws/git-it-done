
var issuesContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");



var getRepoIssues = function(repo){
    //creates var to act as url for fetch request
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    //fetch request
    fetch(apiUrl).then(function(response){
        //request successful
        if(response.ok){
        response.json().then(function(data){
            //pass response data to the dom function
            displayIssues(data);

            //check if api has paginated issues( more issues than can appear on one page)
            if(response.headers.get("link")){
                console.log("repo has more than 30 pages");
            }
        });
    }
    else{
        alert("theres a problem with your request");
    }
    });
}
var displayIssues = function(issues){
    if(issues.length === 0){
        issuesContainerEl.textContent = "this Repo does not have any open issues";
        return;
    }

    for ( var i = 0; i < issues.length; i++) {
 //create a link element to take the user to the issues on github
 var issueEl = document.createElement("a")
 issueEl.classList = "list-item flex-row justify-space-between align-center";
 issueEl.setAttribute("href", issues[i].html_url);
 issueEl.setAttribute("target", "_blank");    
    

 //create a spam to hold teh issue title
 var titleEl = document.createElement("span");
 titleEl.textContent = issues[i].title;

 //apend to container
 issueEl.appendChild(titleEl);

 // create a type element 
 var typeEl  = document.createElement("span")

 //check if issues is actual issue or a pull request
 if(issues[i].pull_request){
     typeEl.textContent = "(pull request)"
 }else{
     typeEl.textContent ="(issues)";
 }
 issuesContainerEl.appendChild(issueEl)
}
}

getRepoIssues("facebook/react");