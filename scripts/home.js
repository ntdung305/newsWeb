'use strict'
const loginModalEl = document.getElementById("login-modal");
const mainContentEl = document.getElementById("main-content");
const logoutBtn = document.getElementById("btn-logout");
const pMessage = document.getElementById("welcome-message");

// Check if User is Login
function CheckLogin(){
    if (currentUser){
        loginModalEl.classList.add("hidden");
        pMessage.textContent = `Welcome ${currentUser.firstName}`;
    }
    else{
        mainContentEl.classList.add("hidden");        
    }
}

// Do function if User press Logout button
function Logout(){
    localStorage.removeItem(KEY_CURRENT_USER);
    window.location.href = '..//pages/login.html';
}

// Declare currentUser to manage current user information
const currentUser = JSON.parse(getFromStorage(KEY_CURRENT_USER));
CheckLogin();
logoutBtn.addEventListener('click', Logout);
