
/*****

PROJECTS

*******/
var projectsList = document.querySelectorAll(".projects-list > li");

//loop through all the LI elements
projectsList.forEach(function(c){

  c.addEventListener('click',function(){
    var sublistDisplay = this.nextElementSibling.style.display;
    //toggle display on/off
    if(sublistDisplay === "none") {
      this.nextElementSibling.style.display = "block"
    } else {
      this.nextElementSibling.style.display = "none"
    }
  })

});
