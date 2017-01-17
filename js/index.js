
//store created tasks
var tasks = {};



//create object template with object constructor
function task(taskname, taskdescription, taskpriority){

      this.taskname = taskname;
      this.description = taskdescription;
      this.priority = taskpriority;
};


function createTask(){
    //grab input fields
    var inputName = document.getElementById("taskname").value;
    var inputDescription = document.getElementById("taskdescription").value;
    var checkedItem = document.getElementById("inputtask")["priorities"].value;

  console.log(checkedItem);

    var taskNumber = Object.keys(tasks).length + 1;
    console.log(taskNumber);
   tasks.taskNumber = new task(inputName,inputDescription,checkedItem);

   var newTask = document.createElement("li");
   var taskContent = document.createTextNode(tasks.taskNumber.taskname + " " + tasks.taskNumber.description + " " + tasks.taskNumber.priority);
   var removeTask = document.createElement("i");
   removeTask.setAttribute("class","material-icons");
   removeTask.appendChild(document.createTextNode("delete"));
   newTask.appendChild(taskContent);
   newTask.appendChild(removeTask);

   document.getElementById('tasklist').appendChild(newTask);


  clearform();
  console.log(tasks);
  console.log(inputName);
};




document.getElementById("tasksubmit").addEventListener('click',function(e){
  e.preventDefault();
  createTask();
},false);


function clearform(){
    document.getElementById('taskname').value = '';
    document.getElementById('taskdescription').value ='';

}
