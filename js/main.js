//Author:
//Name: Rasmus Riis Nielsen
//Studentnumber: 298782


//js for event listeners block

(function(){

  var evLisContentSection = document.querySelector("#eventListeners");

  var clickMe = document.createElement("button");
  var hoverHere = document.createElement("button");
  var contentHeader = document.createElement("h3");
  var contentDescription = document.createElement("p");

  clickMe.textContent = "Click Me!";
  hoverHere.textContent = "Hover over me!"
  contentHeader.textContent = "Event Listeners";
  contentDescription.textContent = "Everything inside this content box is added with JavaScript! Try out these examples of eventlistensers.";

  clickMe.classList.add("button");
  hoverHere.classList.add("button");


  evLisContentSection.appendChild(contentHeader);
  evLisContentSection.appendChild(contentDescription);
  evLisContentSection.appendChild(clickMe);
  evLisContentSection.appendChild(hoverHere);

  clickMe.addEventListener("click",function(){toggleVisibilityBlock(contentDescription);});
  hoverHere.addEventListener("mouseover",function(){toggleParagraphToElement(evLisContentSection,"see more event listeners in the form example!");});
  hoverHere.addEventListener("mouseout",function(){toggleParagraphToElement(evLisContentSection);});

})();

function toggleVisibilityBlock(element){
  if (element.style.display !== 'none') {
      element.style.display = 'none';
  }
  else {
      element.style.display = 'block';
  }
}

function toggleParagraphToElement(element,text){
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
