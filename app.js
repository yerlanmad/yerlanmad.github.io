// toDoList empty array
let toDoList = [];
// control buttons
let addBtn = document.getElementById('addBtn');
let showBtn = document.getElementById('showBtn');
let remBtn = document.getElementById('remBtn');
let editBtn = document.getElementById('editBtn');
// saved list from localStorage
let savedList = localStorage.getItem('list');
// if saved list exists, fill to do list
if (savedList) {
    savedList = JSON.parse(savedList);
    renderList(savedList);
    toDoList = savedList;
}
// fill the to do list in the body of the page
function renderList(list) {
    let todoListContainer = document.getElementById('todo-list');

    todoListContainer.innerHTML = '';

    for (let i = 0; i < list.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('todo-list-item');

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        cardBody.innerHTML = (i + 1) + '. ' + list[i];

        card.appendChild(cardBody);
        todoListContainer.appendChild(card);
    }

    localStorage.setItem('list', JSON.stringify(list));
}


addBtn.onclick = function() {
    toDoList[toDoList.length] = addTask();
    renderList(toDoList);
};

showBtn.onclick = function() {
    alert(showList(toDoList));
}

remBtn.onclick = function() {
    toDoList = removeTask(toDoList);
    renderList(toDoList);
}

editBtn.onclick = function() {
    toDoList = editTask(toDoList);
    renderList(toDoList);
}


// add new task
function addTask() {
    let task = prompt('Создайте новую задачу', 'Новая задача');
    if (task === '' || task == null || task == undefined) {
        return 'Новая задача';
    } else {
        return task;
    }
}
// show to do list
function showList(list) {
    let txt = 'Ваш список дел:\n';
    for(let i = 0; i < list.length; i++) {
        txt += (i + 1) + '. ' + list[i] + '\n';
    }
    return txt;
}
// remove task by index
function removeTask(list) {
    let taskNumber = prompt(showList(list) + 'Введите номер задачи для удаления:');
    
    if (taskNumber <= 0 || isNaN(taskNumber) || taskNumber > list.length) {
        alert('Не верный номер задачи');
    } else {
        list.splice((taskNumber-1), 1);
    }
    
    return list;
}
// edit task by index
function editTask(list) {
    let taskNumber = prompt(showList(list) + 'Введите номер задачи для редактирования');
    
    if (taskNumber <= 0 || isNaN(taskNumber) || taskNumber > list.length) {
        alert('Не верный номер задачи');
    } else {
        list[taskNumber-1] = prompt(showList(list) + 'Измените задачу номер ' + taskNumber, list[taskNumber-1]);
    }
    
    return list;
}