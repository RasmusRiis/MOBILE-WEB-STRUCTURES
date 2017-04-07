//Author:
//Name: Rasmus Riis Nielsen
//Studentnumber: 298782




//javascript for comment Form component

var noScriptElements = document.querySelectorAll(".noScriptHide");  //enable hidden elements that use javaScript
for(var j=0; j<noScriptElements.length; j++){
  noScriptElements[j].classList.remove("noScriptHide");
}

(function(){
  var commentNumber = localStorage.length;  //to keep track of comments in localStorage
  var nameInput = document.querySelector("#commentName");
  var jobTitleInput = document.querySelector("#commentJobTitle");
  var emailInput = document.querySelector("#commentEmail");
  var commentInput = document.querySelector("#commentComment");
  var output = document.querySelector("#comments");
  var emailNotValidText = document.querySelector("#emailNotValid");
  var emailValid = true;  //variable used to tell if email is valid
  var noCommentText = document.querySelector("#noComment");
  var charactersLeftField = document.querySelector("#charactersLeft");
  var charactersLeft;

  nameInput.value = "Anonymous";

  var submitBtn = document.querySelector("#submitBtn");
  var hideShowBtn = document.querySelector("#hideShowBtn");

  if(Modernizr.localstorage){ //check if localStorage is supported
    updateCommSection();  //create comment section
  }else{  //inform or change elements that use localStorage!
    output.textContent = "Local storage not supportet. Comments cannot be loaded";
  }

  if(Modernizr.eventlistener){ //check if addEventListener is supported
    attachEvents();
  }else{  //inform or change elements that use listeners!
    var buttons = document.querySelectorAll("button");  //change all buttons
    for(var j=0; j<buttons.length; j++){
      buttons[j].textContent = "Event listeners not suppported :(";
    }
  }

  function attachEvents(){
    submitBtn.addEventListener('click', addComment);
    hideShowBtn.addEventListener('click', function(){toggleVisibilityBlock(output)});
    emailInput.addEventListener('keyup', validateEmail);
    commentInput.addEventListener('input', validateComment)
  }

  function addComment(){  //adds the comment string to localStorage
    if(emailValid){
      emailNotValidText.style.display = "none";
      var name = nameInput.value;
      var jobTitle = jobTitleInput.value;
      var email = emailInput.value;
      var comment = commentInput.value;
      if(!name){name = "Anonymous";}  //if no values are entered these are default
      if(!jobTitle){jobTitle = "Not given";}
      if(!email){email = "Not given";}

      if(comment){  //only save comment if comment section contains something
        var newComment = "<strong>Name:  </strong>" + name + "<br />" + "<strong>Job title:  </strong>" + jobTitle + "<br />" + "<strong>E-mail:  </strong>" + email + "<br />" + "<strong>Comment:  </strong>" + comment + "<br />";
        localStorage.setItem(commentNumber++, newComment);
        updateCommSection();
        commentInput.value = "";
      }else{
        noCommentText.style.display = "block";
      }
    }else{
      emailNotValidText.style.display = "block";  //display email not vlid text
    }
  }

  function delThisComment(event){ //deletes comment for the pressed delete-button
    var id = event.currentTarget.parentElement.getAttribute("id").match(/\d+/); //get unique id for the comment div that contains the pressed button
    var tempStorage = [];
    for(var i = 0; i < localStorage.length; i++){ //copylocal storage except the comment we wish to delete to tempoary variable
      if(i != id){
        tempStorage.push(localStorage.getItem(i));
      }
    }
    localStorage.clear();   //reset localStorage
    for(i = 0; i < tempStorage.length; i++){  //copy the tempoary data back to localStorage --now without the deleted comment
      localStorage.setItem(i,tempStorage[i]);
    }
    commentNumber--;
    updateCommSection();  //create divs for the current comments in localStorage
  }

  function updateCommSection(){
    while (output.firstChild) { //delete all comment divs
      output.removeChild(output.firstChild);
    }
    for(var i=0; i < localStorage.length; i++){ //create new comment divs from localStorage
      var newComment = document.createElement("div");
      newComment.innerHTML = localStorage.getItem(i);

      var deleteComment = document.createElement("button"); //create delete button for comment div
      deleteComment.textContent = "Delete";
      deleteComment.classList.add("button");

      deleteComment.addEventListener('click', delThisComment);

      newComment.appendChild(deleteComment);
      newComment.style = "border-style: solid; text-align: left; overflow: auto;";

      newComment.setAttribute("id","commNum" + i);  //give this comment div a unique id

      output.appendChild(newComment);
    }
  }

  function toggleVisibilityBlock(element){
    if (element.style.display !== 'none') {
      element.style.display = 'none';
    }
    else {
      element.style.display = 'block';
    }
  }

  function validateEmail(){
    var currEmail = emailInput.value;
    var atPos = currEmail.indexOf("@");
    var dotPos = currEmail.lastIndexOf(".");
    if ((atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= currEmail.length) && emailInput.value != "") {
      emailInput.style = "background-color: red;";
      emailValid = false;
    }else{
      emailInput.style = "background-color: white;";
      emailValid = true;
    }
  }

  function validateComment(comment){
    noCommentText.style.display = "none";
    charactersLeft = 200 - commentInput.value.length;
    charactersLeftField.textContent = charactersLeft;
  }


})();
