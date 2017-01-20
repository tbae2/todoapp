
//store created tasks
var tasks = [];

//create object template with object constructor
function taskObj(id,taskname, taskdescription, taskpriority){
      this.id = id;
      this.taskname = taskname;
      this.description = taskdescription;
      this.priority = taskpriority;
};

window.onload = function(){
   var keyName;
        for(var i=0; i <= localStorage.length -1; i++){
              keyName = localStorage.key(i);
            if(keyName.substring(0,4) === 'task'){
              var storedTask = JSON.parse(localStorage.getItem(keyName));
              createDomTask(storedTask.id,storedTask.taskname,storedTask.description,storedTask.priority);
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
    var checkedItem = document.getElementById("inputtask")["priorities"].value;

    //create DOMTask list item
    var addedTask = new taskObj(taskNumber,inputName,inputDescription,checkedItem);
    //add new Task Object to array
    tasks.push(addedTask);

    localStorage.setItem(taskNumber,JSON.stringify(addedTask));

   //create new element, create text node, create icon element
   createDomTask(taskNumber,inputName,inputDescription,checkedItem);
  clearform();

};

function createDomTask(tasknumber,taskname,description,priority){
  var newTask = document.createElement("li");
  var taskContent = document.createTextNode(taskname + " " + description + " " + priority);
  var removeTask = document.createElement("i");
  var completeTask = document.createElement('i');
   //set id for management later
  newTask.setAttribute('id',tasknumber);
   //set class for open task
  newTask.setAttribute('class', 'opentask');
   //set class for icon
  completeTask.setAttribute('class', 'material-icons completetask');
  removeTask.setAttribute("class","material-icons removetask");
  //create and append text node for icon <i> tag
  completeTask.appendChild(document.createTextNode('done'));
  removeTask.appendChild(document.createTextNode("delete"));
  //append task content and delete icon to created <li> element
  newTask.appendChild(completeTask);
  newTask.appendChild(taskContent);
  newTask.appendChild(removeTask);
  //append newly created element to tasklist in DOM
  document.getElementById('tasklist').appendChild(newTask);

};

function updateTask(e){

    //assign targeted element to var
    var updateTarget = e.target;
    //assign parent of targeted element to var
    var updateParent = updateTarget.parentNode;
    if(updateTarget.getAttribute('class') === 'material-icons removetask'){
    //remove task, need to target parent node of parent node of delete button and then remove the child of the parent parent node
    updateParent.parentNode.removeChild(updateParent);
    //use id of list item to remove the corresponding item from local storage
     localStorage.removeItem(updateParent.getAttribute('id'));

  } else if(updateTarget.getAttribute('class') === 'material-icons completetask'){
      updateParent.getAttribute('class') === 'opentask' ? updateParent.setAttribute('class', 'closedtask') : updateParent.setAttribute('class', 'opentask');
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
