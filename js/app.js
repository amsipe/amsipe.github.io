
/*****

PROJECTS

*******/
var projectsList = document.querySelectorAll(".projects-list > li > span");

//loop through all the LI elements
projectsList.forEach(function(c){

  c.addEventListener('click',function(){
    //toggle display on/off
    this.nextElementSibling.classList.toggle("noneDisplay");
    this.classList.toggle("downArrow");
    this.classList.toggle("upArrow");

  })

});

var video = $(".video-hover").hover(playVid,pauseVid);

function playVid(e) {
  this.play();
}

function pauseVid(e) {
  this.pause();
}


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

}

function showError (node) {

  let span = document.createElement('span');
  span.className = "formError";
  span.textContent = "* Required";
  node.parentNode.insertBefore(span,node.nextSibling);
}

/******
 GALLERY   
 *******/

var images = document.getElementsByClassName("thumb-img");
var imageLbox = document.getElementById('lightbox-img');
var boxContainer = document.querySelector('.container-lightbox');
[...images].forEach(function(cur){
  cur.addEventListener('click',function(e){
    e.preventDefault();
    var imgSrc = this.getAttribute('href');
    imageLbox.setAttribute('src',imgSrc);
    boxContainer.style.display = 'block';

  })

});

