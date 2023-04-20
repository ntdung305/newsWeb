'use strict'
const API_KEY = 'e35e3a59ec4a472cb303e0de325954cb'; // Define API KEY - if have Error 4xx, change to a436d2d9ee7f47ecbf9102122abca4a0

// KEYs for Local storage
const KEY_SETTINGS = 'SETTINGS'; // Define KEY_SETTINGS - local storage
const KEY_USER = "USER_ARRAY"; // Define KEY_USER - local storage
const KEY_CURRENT_USER = "CURRENT_USER_ARRAY"; // Define KEY_CURRENT_USER - local storage
const KEY_TODO_LIST = "TODO_LIST_ARRAY"; // Define KEY_TODO_LIST - local storage

// Load data from local Storage
const getFromStorage = function(jsonName){
    let text = localStorage.getItem(jsonName);
    //let obj = JSON.parse(text);
    return text;
}
// Save to local Storage
const saveToStorage = function(obj, jsonName){
    const myJSON = JSON.stringify(obj);
    localStorage.setItem(jsonName, myJSON);
}