/* 
Final Project: Create an address book program without removing or modifying the HTML or CSS provided.
Requirements: 
    - You must be able to add a contact that will be displayed in the container grid below.
    - You must be able to remove a contact that has already been displayed in the container grid.
    - The form should not submit unless the first and last name have been entered.
Extra Credit: 
    - Check for information that has been entered incorrectly, and either alert the user to fix this
      or properly format the data for the user.
    - Alphabetizing the contacts after each new contact is submitted.
Notes:
    - You may add any new features that you see fit, but ensure that any new changes meet the requirements above.
    - You may only add HTML and CSS if you are implementing new features not required. However, please add comments where these changes have been added in the code. Remember, do not remove or modify any prexisting HTML or CSS.
*/

//constructor function
function Contact(firstname,lastname,address,city,state,zip,phone,email,id){

    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
    this.email = email;
    this.id = id;
    
};
//main data array. to contain objects created by controller.
let contacts = [];

//function to grab all the input fields except "submit"
let formFields = function(){
    let fieldsDOM = document.getElementsByTagName('input');
    let fieldsArr =[];
    for(var i=0; i<fieldsDOM.length;i++){
        if(fieldsDOM[i].id === 'submit'){
            continue;
        }else{
            
            fieldsArr.push(fieldsDOM[i]);
        }

    }
    return fieldsArr;
}

//main controller function. executed from DOM submit button
function addContact(){
    //get value in fields from DOM
    let fieldValues = getFields();
    //build and add contact to data model using field values
    let contact = newContact(fieldValues);
    //if a contact comes back, continue with adding to table
    if(contact){
        //create HTML string and add an "id" to the delete button for easier recall
        let htmlContact = `<tr>
        <td>${formatFields(contact.firstname)} ${formatFields(contact.lastname)}</td>
        <td>${formatFields(contact.address)}</td>
        <td>${formatFields(contact.city)}</td>
        <td>${formatFields(contact.state,'state')}</td>
        <td>${contact.zip}</td>
        <td>${formatFields(contact.phone,'phone')}</td>
        <td>${contact.email}</td>
        <td><i class='fa fa-trash' id=${contact.id} onclick="return deleteContact(${contact.id})"></i></td>
        </tr>`

        //push HTML string to the DOM
        addHTML(htmlContact);
        //sort the table in asc order
        sortTable();
        //clear input fields
        formFields().forEach((el)=>{
            el.value = '';
        });
        //prevent page from refreshing
        return false;
    }
    //prevent page from refreshing even if contact doesnt pass tests
    return false;
}

//constructor method
Contact.prototype.checkFields = function(){
        let regex,emptyResult;
        //get DOM input node elements
        let fnameBox = document.getElementById('firstname');
        let lnameBox = document.getElementById('lastname');
        let zipBox = document.getElementById('zip');
        let emailBox = document.getElementById('email');
        let phoneBox = document.getElementById('phone');
        //clear any existing error messages
        document.querySelectorAll('#firstname,#lastname,#zip,#email,#phone').forEach((el)=>{
            if(el.nextSibling.nodeName === 'SPAN'){
                el.nextSibling.remove();
            }
        });
        
        //regex to check email format
        regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //function to show error message. Takes a HTML node and a display message as arguements. 
        let showError = function(node,message){
            //create a SPAN element and add it as a sibling
            node.style.backgroundColor = '#FFDAD9';
            let span = document.createElement('span');
            span.setAttribute('style','color: gray; font-size: 12px; white-space: nowrap; height: 19px; position: absolute; margin-left: 5px; margin-top: 3px;');
            span.textContent = message;
            node.parentNode.insertBefore(span,node.nextSibling);

        }
        //function to check if firstname/lastname are empty
        let checkEmpty = function(){

            if(this.firstname === '' & this.lastname === ''){
                showError(fnameBox,'Required');
                showError(lnameBox,'Required');
                return false;
            }else if(this.firstname === ''){
                showError(fnameBox,'Required');
                return false;
            }else if(this.lastname === ''){
                showError(lnameBox,'Required');
                return false;
            }else 

            return true;

        }
        //call the prototype object on the checkEmpty function
        emptyResult = checkEmpty.call(this);
        //return false if any of the format requirements are not met.
        if(!emptyResult){

            return false;
            }else if(this.zip !== '' && this.zip.length !== zipBox.size){
                showError(zipBox,'Zipcode must be 5 digits.')
                return false;
            }else if(this.email !== '' && !regex.test(this.email)){
                showError(emailBox,'You must enter a valid email address. Example: bbell@BieberFever.com');
                return false;
            }else if(this.phone !== '' && this.phone.length !== 10){
                showError(phoneBox,'Phone number must be 10 digits.')
            }else{
                //return true to allow process to continue
                return true;
            }
}

//func to create a new contact and return success or failure
function newContact(arr){
    //get a new ID for the contact
    let id;
    if(contacts.length > 0){
        id = contacts[contacts.length -1].id + 1;
    } else {
        id = 0;
    }
    
    //get new contact from constructor and push into data model
    let contact = new Contact(...arr,id);
    //call checkFields function on contact object
    let passed = contact.checkFields();
    //push contact object into contacts array
    if(passed){
        contacts.push(contact);
        return contact;
    }else{
        return false;
    }
}

//func to adjust format of the field values. Takes a string and a default field name of null as arguements.
function formatFields(str,field = null){

    if(field === 'state' && str.length === 2){
        str = str.toUpperCase();
        return str;
    }else if(field === 'phone' && str.length === 10){
        //using RegEx to format a phone # to (  ) ###-####
        str = (''+str).replace(/\D/g, '');
        str = str.match(/^(\d{3})(\d{3})(\d{4})$/);
        str = '(' + str[1] + ') ' + str[2] + '-' + str[3]; 
        return str;
    }else if(str !== ''){
        //split a field value into array. Loop through each word in the new array and capitalize the first letter in each word.
        str = str.toLowerCase().split(' ');
        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].substring(1); 
     
    }
    //re-join the split array with capital letters
    return str.join(' ');          
    }else{
        return str;
    }

}

//function to get the text content of the input fields
function getFields(){

    let values;
    let fieldsArr = [];
    let inputFields = formFields();
    //get input fields from DOM
    for(var i=0;i<inputFields.length;i++){
            fieldsArr.push(inputFields[i].id);
            
    }
    //populate values array
    values = fieldsArr.map(el => {
      return getValue(el);
    });
    //return the array of values back to the main controller function
    return values
}

// function to sort table rows in ASC. Gets called on each new contact added.
function sortTable(){
    debugger;
    let table,sorting,rows,curRow,nextRow,sortRow,dir, sorted = 0;
    //get the table elment
    table = document.getElementById('container');
    //set sorting while loop to true
    sorting = true;
    //default sorting direction = asc
    dir = 'asc';
    //while loop to run if "sorting" remains true
    while(sorting){
        //get array of rows
        rows = table.getElementsByTagName('tr');
        sorting = false;
        //start for loop if # rows > 1
        for(var i =0; i< (rows.length-1); i++){
            sortRow = false;
            //select the initial row and the row immediately after
            curRow = rows[i].getElementsByTagName('td')[0];
            nextRow = rows[i+1].getElementsByTagName('td')[0];
            if(dir === 'asc'){
                //if 1st row string value > 2nd row string value
                if(curRow.innerHTML.toLowerCase() > nextRow.innerHTML.toLowerCase()){
                    //allow the rows to be sorted and break the for loop
                    sortRow = true;
                    break;             
                }                
            }else if(dir === 'desc'){
                //if 1st row string value > 2nd row string value
                if(curRow.innerHTML.toLowerCase() < nextRow.innerHTML.toLowerCase()){
                    //allow the rows to be sorted and break the for loop
                    sortRow = true;
                    break;             
                }                
            }
        }
        if(sortRow){
            //insert the 2nd row before the 1st in the table
            rows[i].parentNode.insertBefore(rows[i+1],rows[i]);
            //allow the while loop to run again
            sorting = true;
            sorted++;

        }else{
            if(sorted == 0 && dir == 'asc'){
                dir = 'desc';
                sorting = true;
            }
        }
    }
}


function deleteContact(id){
    //get rowIndex of passed id
    let row = document.getElementById(id).parentNode.parentNode.rowIndex;    
    //delete row from UI based on index
    document.getElementById('container').deleteRow(row-1);
    //delete contact from data structure
    contacts.splice(id,1)

}

//=== HTML helper Functions ===
    //Provided an HTML id as id, this function will return the value within the HTML element.
function getValue(id) {

    let fieldValue = document.getElementById(id).value.toString();
    return fieldValue;
}

//function to add a row to the table as the bottom row.
function addHTML(val){
    let rows = document.getElementById('container').rows.length;
    document.getElementById('container').insertRow(rows).innerHTML = val;
}

//event listeners for input boxes. Remove background style added previously on click.
const eventListen = (function(){
    let inputFields = formFields();
        for(var i = 0; i<inputFields.length;i++){
        inputFields[i].addEventListener('click',(event)=>{
            //removes the pink background if was previously added as an error notifier
            event.target.removeAttribute('style');
        });
        }


    
})();



//////////////////////////
//unused functions
/*
    //Provided a string as val and an HTML id as id, this function will set the value within a specified input element to the string provided.
function setValue(val, id) {
    document.getElementById(id).value = val;
}

    //Provided a string as val and an optional HTML id, this funcion will place the HTML string inside the specified HTML element. If no element is specified, it will default to container.
function updateHTML(val, id = 'container') {
    document.getElementById(id).innerHTML = val;
}

*/




