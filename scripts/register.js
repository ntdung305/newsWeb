'use strict'
// Get DOM element from register page
const inpFirstname = document.getElementById("input-firstname");
const inpLastName = document.getElementById("input-lastname");
const inpUserName = document.getElementById("input-username");
const inpPassword = document.getElementById("input-password");
const inpPasswordConfirm = document.getElementById("input-password-confirm");

const registerBtn = document.getElementById("btn-submit");

// Check valid User data
function IsValidUser(){
    // Check if fields is empty
    if (!inpFirstname.value) {
        alert("Please type your first name!");
        return false;
    }
    if (!inpLastName.value) {
        alert("Please type your last name!");
        return false;
    }
    if (!inpUserName.value) {
        alert("Please type your username!");
        return false;
    }
    if (!inpPassword.value) {
        alert("Please type your password!");
        return false;
    }
    if (!inpPasswordConfirm.value) {
        alert("Please type your confirm password!");
        return false;
    }
    // Check if username is unique
    const isUniqueUserName = !userArr.map(user=>user.username).includes(inpUserName.value);
    if (!isUniqueUserName){
        alert("Username must be unique!");
        return false;
    }
    // Check if password is more than 8 character
    console.log(inpPassword.value.length, inpPassword.value)
    if (inpPassword.value.length <= 8){
        alert("Password must have more than 8 characters!");
        return false;
    }
    // Check if password and confirm password are the same
    if (inpPassword.value!=inpPasswordConfirm.value){
        alert("Password and Confirm Password must be the same!");
        return false;
    }
    return true;
    
}
// Clear input fields from register page
function ClearInput(){
    inpFirstname.value = '';
    inpLastName.value = '';
    inpUserName.value = '';
    inpPassword.value = '';
    inpPasswordConfirm.value = '';
}
//
function AddUserArr(){
    
    if (IsValidUser()){
        const user = new User(inpFirstname.value, inpLastName.value, inpUserName.value, inpPassword.value);
        userArr.push(user);
        saveToStorage(userArr, KEY_USER);
        ClearInput();
        alert("Register successfully!");
        window.location.href = '../pages/login.html';
    }
}


// Declare userArr to manage users information
const userArr = JSON.parse(getFromStorage(KEY_USER)) || [];

// Add events for buttons
registerBtn.addEventListener('click', AddUserArr);