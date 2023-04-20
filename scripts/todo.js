'use strict'
// Get DOM element
const todoListEl = document.getElementById("todo-list");
const addBtn = document.getElementById("btn-add");
const taskInp = document.getElementById("input-task");

// Define class Task
class Task{
    task;
    owner;
    isDone;
    id; // define id to easier handle task
    constructor(task, owner, isDone, id=null){
        this.task = task;
        this.owner = owner;
        this.isDone = isDone;
        this.id = id;
    }
};

// Check valid information
function IsValid(){
    // If user is login
    if (currentUser){
        // return true if have task. If not show alert and return false
        if (taskInp.value){
            return true;
        }
        else{
            alert("Please type your Task first!");
            return false;
        }
    }
    // If user is not login, show alert
    else{
        alert("You are not Login.\nPlease Login first!");
        return false;
    }
}


// Add task for current User
function AddTask(){
    // If all information is valid push task to array,  save to local storage, and render task 
    if (IsValid()){
        const task = new Task(taskInp.value, currentUser.username, false);
        todoArr.push(task);
        saveToStorage(todoArr, KEY_TODO_LIST);
        RenderTasks();
        // Clear input after add task
        taskInp.value = '';
    }
}

// Delete task when user click
function DeleteTask(event, id){
    // Find index by id of task and current user
    const deleteId = todoArr.findIndex(task=>(task.id == id)&&(currentUser.username == task.owner));
    // Delete task found, save to local storage and render task
    todoArr.splice(deleteId,1); 
    saveToStorage(todoArr, KEY_TODO_LIST);
    RenderTasks();
    // stopPropagation to prevent click on task (check to done event)
    event.stopPropagation();
}


// Render Tasks for current User
function RenderTasks(){
    todoListEl.innerHTML = '';
    let autoId = 0;
    todoArr.forEach(task => {
        if (task.owner === currentUser.username){
            task.id = autoId++; // set Id for handle task easier
            // Create task element to render
            const taskEl = document.createElement('li');
            taskEl.id = `task-id-${task.id}`;
            taskEl.innerHTML= `${task.task}<span class="close" onclick="DeleteTask(event,${task.id})">×</span>`;
            task.isDone ? taskEl.classList.add("checked") : {}; // set class to "checked" if task from local host is done
            // Toggle "checked" class when user click
            taskEl.onclick = function(){
                this.classList.toggle("checked");
                task.isDone = this.classList.contains("checked") ?  true :  false;
                saveToStorage(todoArr, KEY_TODO_LIST);
            }
            saveToStorage(todoArr, KEY_TODO_LIST);
            todoListEl.appendChild(taskEl);
        }
    });
}


// Declare currentUser to manage current user information

const currentUser = JSON.parse(getFromStorage(KEY_CURRENT_USER));
console.log(currentUser);

// Declare
const todoArr = JSON.parse(getFromStorage(KEY_TODO_LIST)) || [];

//RenderTasks();
addBtn.addEventListener('click', AddTask);
RenderTasks();

