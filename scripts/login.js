'use strict'
const inpUsername = document.getElementById("input-username");
const inpPassword = document.getElementById("input-password");
const loginBtn = document.getElementById("btn-submit");

// Check valid User data
function IsValidUser(){
    // Check if fields is empty
    if (!inpUsername.value) {
        alert("Please type your username!");
        return false;
    }
    if (!inpPassword.value) {
        alert("Please type your password!");
        return false;
    }
    // Matches user data
    let isCorrect = false;
    userArr.forEach(user => {
        if (user.username === inpUsername.value && user.password == inpPassword.value){
            isCorrect = true;
        }
    });

    // return true if username and password is correct
    if (isCorrect){
        return true;
    }
    alert('Wrong username or passsword!');
    return false;
}

function Login(){
    if (IsValidUser()){
        window.location.href = '../index.html';
        saveToStorage(userArr.filter(user=>user.username == inpUsername.value)[0], 'CURRENT_USER_ARRAY')
    }
}


// Declare userArr to manage users information
const userArr = JSON.parse(getFromStorage(KEY_USER)) || [];

// Add event for button Login
loginBtn.addEventListener('click', Login);
