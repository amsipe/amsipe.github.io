
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

function checkFields(e){

  var formIDs = document.querySelectorAll('#formName,#formPhone,#formEmail');
  console.log(formIDs);
  // var formName = document.getElementById("formName");
  // var formPhone = document.getElementById("formPhone");
  // var formEmail = document.getElementById("formEmail");
  var formValid = Array.prototype.slice.call(formIDs)
  formValid = formValid.map(function(el){
    if(el.nextSibling.className === "formError"){
      el.nextSibling.remove();
    }
    if(el.value === ""){
      showError(el);
      return false;
    }
    return true;

  });
  console.log(formValid);
  if(formValid.includes(false)){
    return false
  } else {
    return true;
  }

  // console.log(nameValue, phoneValue, emailValue);
  // if(formName.value === ""){
  //   showError(formName);
  //   return false;
  // } else if(formPhone.value === "" || formPhone.value.length != 10) {
  //   showError(formPhone);
  //   return false;
  // } else if(formEmail.value === "") {
  //   showError(formEmail);
  //   return false;
  // }
  // return true;

}

function showError (node) {

  let span = document.createElement('span');
  span.className = "formError";
  span.textContent = "* Required";
  node.parentNode.insertBefore(span,node.nextSibling);
}
