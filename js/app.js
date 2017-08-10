
/*****

PROJECTS

*******/
var projectsList = document.querySelectorAll(".projects-list > li");

//loop through all the LI elements
projectsList.forEach(function(c){

  c.addEventListener('click',function(){
    var sublistDisplay = this.nextElementSibling.style.display;
    //toggle display on/off
    this.nextElementSibling.classList.toggle("noneDisplay");
    this.classList.toggle("downArrow");
    this.classList.toggle("upArrow");

  })

});


/*****
CONTACT FORM
*******/

function checkFields(){

  var nameValue = document.getElementById("formName").value;
  var phoneValue = document.getElementById("formPhone").value;
  var emailValue = document.getElementById("formEmail").value;
  console.log(nameValue, phoneValue, emailValue);
  return false;
}
