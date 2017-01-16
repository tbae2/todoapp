
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
  
    var taskNumber = "task" + Object.keys(tasks).length + 1;
   
   tasks.taskNumber = new task(inputName,inputDescription,checkedItem);

  clearform();
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