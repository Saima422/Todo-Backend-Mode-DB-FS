class taskSwitch{
    constructor(Obj){
        this.getAllTasks = Obj.getAllTasks;
        this.getTaskByTaskId = Obj.getTaskByTaskId;
        this.deleteTask = Obj.deleteTask;
        this.addTask = Obj.addTask;
        this.updateTask = Obj.updateTask;
    }
}

module.exports = taskSwitch;