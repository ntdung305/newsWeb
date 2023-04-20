'use strict'
const inpCategory = document.getElementById("input-category");
const inpPageSize = document.getElementById("input-page-size");
const submitBtn = document.getElementById("btn-submit");

// Load Default Settings for each user
const LoadDefaultSettings = function(){
    // Continue if already have a user settings
    if (settingsArr.length > 0){
        // Get settings of current user
        const userSettings = settingsArr.filter(settings=>settings.owner == currentUser.username)[0];
        // update user settings for current settings
        if (userSettings){
            inpPageSize.value = userSettings.pageSize;
            inpCategory.value = userSettings.category;
        }
    }
}

// Validate user inputs
const isValidSetting = function(){
    // Check if 
    if (!currentUser){
        alert("You have to Login first!");
        return false;
    }
    if (inpPageSize.value < 1){
        alert("Number of News per page must be greater than 0!");
        return false;
    }
    return true;
}

// Update setting for users when press "Save Settings"
const updateSeting = function(){
    if (isValidSetting()){
        const obj = {
            owner: currentUser.username,
            pageSize: Number(inpPageSize.value),
            category: inpCategory.value
        }
        const idx = settingsArr.findIndex(settings=>settings.owner === currentUser.username);
        idx !== -1 ? settingsArr[idx]=obj : settingsArr.push(obj);
        console.log(settingsArr);
        saveToStorage(settingsArr, KEY_SETTINGS);
        alert('Saved Setting!');
    }
}

// Declare currentUser to manage current user information
const currentUser = JSON.parse(getFromStorage(KEY_CURRENT_USER));

// Declare KEY_SETTINGS and settingsArr to manage user settings information
const settingsArr = JSON.parse(getFromStorage(KEY_SETTINGS)) || [];
LoadDefaultSettings();

submitBtn.addEventListener('click', updateSeting)

