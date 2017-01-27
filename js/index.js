
//store created tasks
var tasks = [];

//create object template with object constructor
function taskObj(id,taskname, taskdescription, taskpriority, status){
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
function createTask(){
      //logic for finding what task key to implement
    var taskNumber = (function(){
         //store found keys in local storage IIFE function
          var taskKeysCurrent = [];
                      //loop and store all found keys
            for(var i = 0; i < localStorage.length; i++){
                    taskKeysCurrent.push(localStorage.key(i));
            }
              //loop through stored keys , storage length amount, if missing return key with missing index appended
            for(var i=0; i < localStorage.length;  i++){
                if(taskKeysCurrent.indexOf('task' + i) === -1){
                    return 'task' + i;
                }
            }
                //if made it here, return first task key or continuing order task key
            return  localStorage.length === 0 ? 'task' + localStorage.length : 'task' + (localStorage.length);
    }());
    //grab input fields
    var inputName = document.getElementById("taskname").value;
    var inputDescription = document.getElementById("taskdescription").value;
    var checkedItem = function(){
                            var priorities = document.getElementsByName('priorities');
                              for(var i = 0; i < priorities.length; i++){
                                // console.log(priorities[i]);
                                  if(priorities[i].checked){
                                      return priorities[i].value;
                                  }
                            }
                      }; /*document.getElementById("inputtask")["priorities"].value;*/
    var defaultStatus = 'opentask';
    //create DOMTask list item
    var addedTask = new taskObj(taskNumber,inputName,inputDescription,checkedItem(), defaultStatus);
    //add new Task Object to array
    tasks.push(addedTask);

    localStorage.setItem(taskNumber,JSON.stringify(addedTask));

   //create new element, create text node, create icon element
   createDomTask(addedTask.id,addedTask.taskname,addedTask.description,addedTask.priority,addedTask.status);
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

    newTask.setAttribute('class', 'mdl-list__item');
    newTask.setAttribute('id', tasknumber);
    divSecondaryAction.setAttribute('class', 'mdl-list__item-secondary-action');
    completeTask.setAttribute('class', 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('class', 'mdl-checkbox__input');
    divPrimaryContent.setAttribute('class', 'mdl-list__item-primary-content');
    divTaskName.setAttribute('class', 'taskname');
    divTaskDesc.setAttribute('class', 'taskdescription');
    divTaskPriority.setAttribute('class', 'taskpriority');
    delTask.setAttribute('class', 'material-icons');
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

};

function updateTask(e) {

    //assign targeted element to var
    var updateTarget = e.target;
    //assign parent of targeted element to var
    var updateParent = updateTarget.parentNode;
    //nested function, updates local storage as well as toggles class in DOM
    var inplaceUpdate = function(targetElement, taskStatus) {
        targetElement.setAttribute('class', taskStatus);
        var taskToUpdate = JSON.parse(localStorage.getItem(targetElement.getAttribute('id')));
        taskToUpdate.status = taskStatus;
        localStorage.setItem(taskToUpdate.id, JSON.stringify(taskToUpdate));
    }

    if (updateTarget.getAttribute('class') === 'material-icons removetask') {
        //remove task, need to target parent node of vfparent node of delete button and then remove the child of the parent parent node
        updateParent.parentNode.removeChild(updateParent);
        //use id of list item to remove the corresponding item from local storage
        localStorage.removeItem(updateParent.getAttribute('id'));

    } else if (updateTarget.getAttribute('class') === 'material-icons completetask') {
        updateParent.getAttribute('class') === 'opentask'
            ? inplaceUpdate(updateParent, 'closedtask')
            : inplaceUpdate(updateParent, 'opentask');
    }

};

//update task(remove,toggle complete or notd)
document.getElementById('tasklist').addEventListener('click',updateTask,false);
//submit task
document.getElementById("tasksubmit").addEventListener('click',function(e){
  e.preventDefault();
  createTask();
},false);

//clear input fields
function clearform(){
    document.getElementById('taskname').value = '';
    document.getElementById('taskdescription').value ='';

}
