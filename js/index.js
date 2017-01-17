
//store created tasks
var tasks = [];



//create object template with object constructor
function taskObj(id,taskname, taskdescription, taskpriority){
      this.id = id;
      this.taskname = taskname;
      this.description = taskdescription;
      this.priority = taskpriority;
};


function createTask(){
    //grab input fields
    var inputName = document.getElementById("taskname").value;
    var inputDescription = document.getElementById("taskdescription").value;
    var checkedItem = document.getElementById("inputtask")["priorities"].value;

  // console.log(checkedItem);
    //get new ID for new Task
    var taskNumber = tasks.length + 1;
    //create Task
    var addedTask = new taskObj(taskNumber,inputName,inputDescription,checkedItem);
    //add new Task Object to array
    tasks.push(addedTask);
  //  console.log(tasks);

   //create new element, create text node, create icon element
   var newTask = document.createElement("li");
   var taskContent = document.createTextNode(addedTask.taskname + " " + addedTask.description + " " + addedTask.priority);
   var removeTask = document.createElement("i");
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
  console.log(tasks);
  console.log(inputName);
};

function removeTask(e){

    console.log(e.target);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);

}

document.getElementById('tasklist').addEventListener('click',removeTask,false);

document.getElementById("tasksubmit").addEventListener('click',function(e){
  e.preventDefault();
  createTask();
},false);


function clearform(){
    document.getElementById('taskname').value = '';
    document.getElementById('taskdescription').value ='';

}
