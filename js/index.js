
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
   console.log(localStorage.length);
   var keyName;
        for(var i=0; i <= localStorage.length; i++){
              keyName = localStorage.key(i);
            if(keyName.substring(0,3) === 'task'){
              console.log(localStorage.getItem(keyName));
            }



        }

};


//create task , update DOM, save to array (for future session storage)
function createTask(){
    //grab input fields
    var inputName = document.getElementById("taskname").value;
    var inputDescription = document.getElementById("taskdescription").value;
    var checkedItem = document.getElementById("inputtask")["priorities"].value;

    //get new ID for new Task
    var taskNumber = 'task' + localStorage.length;
    //create Task
    var addedTask = new taskObj(taskNumber,inputName,inputDescription,checkedItem);
    //add new Task Object to array
    tasks.push(addedTask);
  //  console.log(tasks);
    localStorage.setItem(taskNumber,JSON.stringify(addedTask));
    console.log(localStorage.length);
   //create new element, create text node, create icon element
   createDomTask(taskNumber,inputName,inputDescription,checkedItem);
  clearform();
  // console.log(tasks);
  // console.log(inputName);
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
    //var updateTargetIndex = tasks.map(function(item){ return item.id }).indexOf(updateParent.getAttribute('id'));
    //remove from array
    //tasks.splice(updateTargetIndex, 1);
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


function clearform(){
    document.getElementById('taskname').value = '';
    document.getElementById('taskdescription').value ='';

}
