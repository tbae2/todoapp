//store created tasks
var tasks = [];

//create object template with object constructor
function taskObj(id, taskname, taskdescription, taskpriority, status) {
    this.id = id;
    this.taskname = taskname;
    this.description = taskdescription;
    this.priority = taskpriority;
    this.status = status;
};

window.onload = function() {
    var keyName;
    for (var i = 0; i <= localStorage.length - 1; i++) {

        keyName = localStorage.key(i);
        if (keyName.substring(0, 4) === 'task') {
            var storedTask = JSON.parse(localStorage.getItem(keyName));
            createDomTask(storedTask.id, storedTask.taskname, storedTask.description, storedTask.priority, storedTask.status);
        }
    }
};

//create task , update DOM, save to array (for future session storage)
function createTask() {
    //logic for finding what task key to implement
    var taskNumber = (function() {
        //store found keys in local storage IIFE function
        var taskKeysCurrent = [];
        //loop and store all found keys
        for (var i = 0; i < localStorage.length; i++) {
            taskKeysCurrent.push(localStorage.key(i));
        }
        //loop through stored keys , storage length amount, if missing return key with missing index appended
        for (var i = 0; i < localStorage.length; i++) {
            if (taskKeysCurrent.indexOf('task' + i) === -1) {
                return 'task' + i;
            }
        }
        //if made it here, return first task key or continuing order task key
        return localStorage.length === 0
            ? 'task' + localStorage.length
            : 'task' + (localStorage.length);
    }());
    //grab input fields
    var inputName = document.getElementById("taskname").value;
    var inputDescription = document.getElementById("taskdescription").value;
    var checkedItem = function() {
        var priorities = document.getElementsByName('priorities');
        for (var i = 0; i < priorities.length; i++) {
            // console.log(priorities[i]);
            if (priorities[i].checked) {
                return priorities[i].value;
            }
        }
    };/*document.getElementById("inputtask")["priorities"].value;*/
    var defaultStatus = 'opentask';
    //create DOMTask list item
    var addedTask = new taskObj(taskNumber, inputName, inputDescription, checkedItem(), defaultStatus);
    //add new Task Object to array
    tasks.push(addedTask);

    localStorage.setItem(taskNumber, JSON.stringify(addedTask));

    //create new element, create text node, create icon element
    createDomTask(addedTask.id, addedTask.taskname, addedTask.description, addedTask.priority, addedTask.status);
    clearform();

};

function createDomTask(tasknumber, taskname, description, priority, status) {
    var currentTaskList = document.getElementById('tasklist');
    var newTask = document.createElement('li');
    var divSecondaryAction = document.createElement('div');
    var completeTask = document.createElement('label');
    var checkbox = document.createElement('input');
    var divPrimaryContent = document.createElement('div');
    var divTaskName = document.createElement('div');
    var divTaskDesc = document.createElement('div');
    var divTaskPriority = document.createElement('div');
    var tkName = document.createTextNode(taskname);
    var tkDescription = document.createTextNode(description);
    var tkPriority = document.createTextNode(priority);
    var delTask = document.createElement('i');
    var tkDel = document.createTextNode('delete');
    //logic for determining pre-checked checkbox from localstorage status
    var isChecked = status === 'opentask'
        ? false
        : true;
    //build parent list item element
    newTask.setAttribute('class', 'mdl-list__item');
    newTask.setAttribute('id', tasknumber);
    divSecondaryAction.setAttribute('class', 'mdl-list__item-secondary-action');
    completeTask.setAttribute('class', 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
    //create the checkbox, apply attrs / classes as necessary
    checkbox.checked = isChecked;
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'mdl-checkbox__input');
    //build task description element with nested divs
    divPrimaryContent.setAttribute('class', 'mdl-list__item-primary-content ' + status);
    divTaskName.setAttribute('class', 'taskname');
    divTaskDesc.setAttribute('class', 'taskdescription');
    divTaskPriority.setAttribute('class', 'taskpriority');
    delTask.setAttribute('class', 'material-icons removetask');

    //order of operations to append pre-built elements
    divTaskName.appendChild(tkName);
    divTaskDesc.appendChild(tkDescription);
    divTaskPriority.appendChild(tkPriority);
    delTask.appendChild(tkDel);
    divTaskPriority.appendChild(delTask);

    divSecondaryAction.appendChild(completeTask);
    completeTask.appendChild(checkbox);
    divPrimaryContent.appendChild(divTaskName);
    divPrimaryContent.appendChild(divTaskDesc);
    divPrimaryContent.appendChild(divTaskPriority);

    newTask.appendChild(divSecondaryAction);
    newTask.appendChild(divPrimaryContent);

    currentTaskList.appendChild(newTask);
    //this is necessary so that mdl-lite knows that the component has been added and it needs to upgrade the Dom
    componentHandler.upgradeDom();

};

function updateTask(e) {
    //assign targeted element to var
    var updateTarget = e.target;
    //assign parent of targeted element to var
    var updateParent = updateTarget.parentNode.parentNode;
    //  e.target.parentNode.parentNode.nextElementSibling.setAttribute('style','text-decoration:line-through');

    //nested function, updates local storage as well as toggles class in DOM
    var inplaceUpdate = function(targetElement, taskStatus) {
        //logic to add/remove class of the mdl-list__item-primary-content node accordingly
        //targetElement === updateParent variable
        if (taskStatus === 'closedtask') {
            targetElement.classList.remove('opentask');
            targetElement.classList.add(taskStatus);
        } else {
            targetElement.classList.remove('closedtask');
            targetElement.classList.add(taskStatus);
        }
        //targetElement.setAttribute('class', taskStatus);
        var taskToUpdate = JSON.parse(localStorage.getItem(targetElement.parentNode.getAttribute('id')));
        taskToUpdate.status = taskStatus;
        localStorage.setItem(taskToUpdate.id, JSON.stringify(taskToUpdate));
    };

    if (!updateParent.parentNode.classList.contains('headerbar')) {
      if (updateTarget.getAttribute('class') === 'material-icons removetask') {
        //remove task, need to target parent node(tasklist) of fparent node(mdl-list__item) of delete button and then remove the child of the parent parent node
        updateParent.parentNode.parentNode.removeChild(updateParent.parentNode);
        //use id of list item to remove the corresponding item from local storage
        localStorage.removeItem(updateParent.parentNode.getAttribute('id'));
        //need to target checkbox to make sure it is the checkbox being clicked
      } else if (e.target.classList.contains('mdl-checkbox__input') === true) {
        //check parent node see if it has the is-checked property, toggle accordingly in helper function
        updateTarget.parentNode.classList.contains('is-checked') === true
            ? inplaceUpdate(updateParent.nextElementSibling, 'opentask')
            : inplaceUpdate(updateParent.nextElementSibling, 'closedtask');
     }
  } else {
    sortTasks(e);
  }

};

function sortTasks(e){
    //console.log(e.target.parentNode);
    var selectedHeader = e.target;
    console.log(selectedHeader.parentNode.classList.contains('is-checked'));

};

//update task(remove,toggle complete or notd)
document.getElementById('tasklist').addEventListener('click', updateTask, false);
//submit taske.getAttribute('id')
document.getElementById("tasksubmit").addEventListener('click', function(e) {
    e.preventDefault();
    createTask();
}, false);

//clear input fields
function clearform() {
    document.getElementById('taskname').value = '';
    document.getElementById('taskdescription').value = '';

}
