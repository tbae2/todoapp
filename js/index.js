
//store created tasks
var tasks = [];

//create object template with object constructor
function taskObj(id,taskname, taskdescription, taskpriority){
      this.id = id;
      this.taskname = taskname;
      this.description = taskdescription;
      this.priority = taskpriority;
};

//create task , update DOM, save to array (for future session storage)
function createTask(){
    //grab input fields
    var inputName = document.getElementById("taskname").value;
    var inputDescription = document.getElementById("taskdescription").value;
    var checkedItem = document.getElementById("inputtask")["priorities"].value;

  // console.log(checkedItem);
    //get new ID for new Task
    var taskNumber = 'task' + (tasks.length + 1);
    //create Task
    var addedTask = new taskObj(taskNumber,inputName,inputDescription,checkedItem);
    //add new Task Object to array
    tasks.push(addedTask);
  //  console.log(tasks);

   //create new element, create text node, create icon element
   var newTask = document.createElement("li");
   var taskContent = document.createTextNode(addedTask.taskname + " " + addedTask.description + " " + addedTask.priority);
   var removeTask = document.createElement("i");
    //set id for management later
   newTask.setAttribute('id',taskNumber);
    //set class for open task
   newTask.setAttribute('class', 'opentask');
    //set class for icon
   removeTask.setAttribute("class","material-icons");
   //create and append text node for icon <i> tag
   removeTask.appendChild(document.createTextNode("delete"));
   //append task content and delete icon to created <li> element
   newTask.appendChild(taskContent);
   newTask.appendChild(removeTask);

   //append newly created element to tasklist in DOM
   document.getElementById('tasklist').appendChild(newTask);

  clearform();
  // console.log(tasks);
  // console.log(inputName);
};

function removeTask(e){
    //assign targeted element to var
    var delTarget = e.target;
    //remove task, need to target parent node of parent node of delete button and then remove the child of the parent parent node
    delTarget.parentNode.parentNode.removeChild(delTarget.parentNode);
    //get index of targeted element to remove from array
    var delTargetIndex = tasks.map(function(item){ return item.id }).indexOf(delTarget.parentNode.getAttribute('id'));
    //remove from array
    tasks.splice(delTargetIndex, 1);

}
//remove task
document.getElementById('tasklist').addEventListener('click',removeTask,false);
//submit task
document.getElementById("tasksubmit").addEventListener('click',function(e){
  e.preventDefault();
  createTask();
},false);


function clearform(){
    document.getElementById('taskname').value = '';
    document.getElementById('taskdescription').value ='';

}
