//Author:
//Name: Rasmus Riis Nielsen
//Studentnumber: 298782


//js for event listeners block

var noScriptElements = document.querySelectorAll(".noScriptHide");
for(var j=0; j<noScriptElements.length; j++){
  noScriptElements[j].classList.remove("noScriptHide");
}
(function(){

  var evLisContentSection = document.querySelector("#eventListeners");

  var clickMe = document.createElement("button");
  var hoverHere = document.createElement("button");
  var contentHeader = document.createElement("h3");
  var contentDescription = document.createElement("p");

  clickMe.textContent = "Click Me!";
  hoverHere.textContent = "Hover over me!"
  contentHeader.textContent = "Event Listeners";
  contentDescription.style = "white-space: pre;";
  contentDescription.textContent = "Everything inside this content box is added with JavaScript!\nUsed event listeners are:\n'click'\n'mouseover'\n'mouseout'\nAnd in the comment form also:\n'keyup'\n'input'";

  clickMe.classList.add("button");
  hoverHere.classList.add("button");
  clickMe.setAttribute("aria-label","hide text");
  hoverHere.setAttribute("aria-label","show exstra text");

  evLisContentSection.appendChild(contentHeader);
  evLisContentSection.appendChild(contentDescription);
  evLisContentSection.appendChild(clickMe);
  evLisContentSection.appendChild(hoverHere);

  if(Modernizr.eventlistener){ //check if addEventListener is supported
    attachEvents();
  }else{  //inform or change elements that use listeners!
    var buttons = document.querySelectorAll("button");  //change all buttons
    for(var j=0; j<buttons.length; j++){
      buttons[j].textContent = "Event listeners not suppported :(";
    }
  }

  function attachEvents(){
    clickMe.addEventListener("click",function(){toggleVisibilityBlock(contentDescription);});
    hoverHere.addEventListener("mouseover",function(){toggleParagraphToElement(evLisContentSection,"see more event listeners in the form example!");});
    hoverHere.addEventListener("mouseout",function(){toggleParagraphToElement(evLisContentSection);});
  }

  function toggleVisibilityBlock(element){ //toggle visibility of an element
    if (element.style.display !== 'none') {
      element.style.display = 'none';
    }
    else {
      element.style.display = 'block';
    }
  }

  function toggleParagraphToElement(element,text){  //using a class to verify if element holds a paragraph or not so itcan be toggled
    var para = element.querySelector(".paragraphAdded");
    if(para){
      para.classList.remove("paragraphAdded");
      para.parentNode.removeChild(para);
    }else{
      var newParagraph = document.createElement("p");
      newParagraph.textContent = text;
      newParagraph.classList.add("paragraphAdded");
      element.appendChild(newParagraph);
    }
  }

})();
