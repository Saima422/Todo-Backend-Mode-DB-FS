const { Router } = require("express");
const taskSwitch = require('../utils/switch');
const fileController = require("../controllers/taskController");
const databaseController = require("../controllers/mongooseTaskController");
const { addTaskValidation } = require("../controllers/taskController");

let Obj, addTaskArr, updateTaskArr;

switch(process.env.OPERATION_MODE){
    case 'database':
        Obj = new taskSwitch(databaseController);
        addTaskArr = Obj.addTask;
        updateTaskArr = Obj.updateTask;
        break;

    case 'file':
        Obj = new taskSwitch(fileController);
        addTaskArr = [addTaskValidation, Obj.addTask];
        updateTaskArr = [addTaskValidation, Obj.updateTask];
        break;
}

const router = Router();

router.route("/").get(Obj.getAllTasks).post(addTaskArr);
router.route("/:taskId").get(Obj.getTaskByTaskId).delete(Obj.deleteTask).post(updateTaskArr);

module.exports = router;