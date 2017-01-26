
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

window.onload = function(){
   var keyName;
        for(var i=0; i <= localStorage.length -1; i++){

              keyName = localStorage.key(i);
            if(keyName.substring(0,4) === 'task'){
              var storedTask = JSON.parse(localStorage.getItem(keyName));
              createDomTask(storedTask.id,storedTask.taskname,storedTask.description,storedTask.priority, storedTask.status);
          }
        }
};


//create task , update DOM, save to array (for future session storage)
function createTask(){
      //logic for finding what task key to implement
    var taskNumber = (function(){
         //store found keys in local storage
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
      var newTask = document.createElement('li');
      var divSecondaryAction = document.createElement('div');
      var completeTask = document.createElement('label');
      var divPrimaryContent = document.createElement('div');
      var divTaskName = document.createElement('div');
      var divTaskDesc = document.createElement('div');
      var divTaskPriority = document.createElement('div');



      function setTaskAttributes(){
            for(var element in classAttrs){
                 console.log(classAttrs.element.css);
            }
       }

      var classAttrs = {
                          'newTask':{'css':[{'class':'mdl-list__item'}]},
                          'divSecondaryAction': {'class': 'mdl-list__item-secondary-action'},
                          'completeTask': {'class':'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'},
                          'divPrimaryContent': {'class': 'mdl-list__item-primary-content'},
                          'divTaskName': {'class':'taskname'},
                          'divTaskDesc':{'class':'taskdescription'},
                          'divTaskPriority': {'class': 'taskpriority'}
                       };
                       //console.log(classAttrs.newTask.css);
      setTaskAttributes();





    // var taskContent = document.createTextNode(taskname + " " + description + " " + priority);
    // var removeTask = document.createElement("i");
    //
    // var checkBoxClass = 'mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect completetask';
    // var taskToggle = document.createElement('input');
    // //build checkbox
    // taskToggle.setAttribute('class', 'mdl-checkbox__input');
    // taskToggle.setAttribute('type','checkbox')
    // newTask.setAttribute('id', tasknumber);
    // completeTask.setAttribute('class', checkBoxClass);
    // completeTask.appendChild(taskToggle);
    // //set class for open task
    // //console.log(status);
    // status === 'opentask'
    //     ? newTask.setAttribute('class', 'opentask')
    //     : newTask.setAttribute('class', 'closedtask');
    // //set class for icon
    //
    // removeTask.setAttribute("class", "material-icons removetask");
    // //create and append text node for icon <i> tag
    //
    // removeTask.appendChild(document.createTextNode("delete"));
    // //append task content and delete icon to created <li> element
    // newTask.appendChild(completeTask);
    // newTask.appendChild(taskContent);
    // newTask.appendChild(removeTask);
    // //append newly created element to tasklist in DOM
    //
    // document.getElementById('tasklist').appendChild(newTask);
    // componentHandler.upgradeDom();
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
