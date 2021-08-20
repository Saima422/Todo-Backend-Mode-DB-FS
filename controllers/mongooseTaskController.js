const Task = require("../models/taskSchema");
const uniqid = require('uniqid');
const sendResponse = require("../utils/sendResponse");

let resData;

const getAllTasks = async (req, res) =>{
    resData = await Task.find();
    return sendResponse({
        res,
        statusCode: 200,
        message: "successfully fetched all tasks",
        data: resData,
    });
};

const getTaskByTaskId = async (req, res) => {
    let { taskId } = req.params;

    resData = await Task.findOne({ taskId });

    if(!resData){
        return sendResponse({
            res,
            statusCode: 404,
            message: "Element Not Found",
            error: "Invalid Id"
        });
    } 
    return sendResponse({
        res,
        statusCode: 200,
        message: "successfully fetched task",
        data: resData
    });
};

const addTask = async (req, res) => {
    const { content, createdAt, updatedAt} = req.body;

    if(req.body.isComplete || req.body.taskId){
        return sendResponse({
            res,
            statusCode: 400,
            message: "Invalid Request",
            error: "Invalid Request",
        });
    }
    try{
        let newTask = new Task({
            taskId : uniqid(),
            content,
            createdAt,
            updatedAt
        });

        newTask = await newTask.save();

        return sendResponse({
            res,
            statusCode: 200,
            message: "successfully Created and Added task",
            data: newTask,
        });

    }catch(error){
        return sendResponse({
            res,
            statusCode: 400,
            message: "Cannot create Task",
            error: error,
        });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    
    try{
        resData = await Task.deleteOne({ taskId });

        if(!resData.deletedCount){
            return sendResponse({
                res,
                statusCode: 404,
                message: "Element Not Found",
                error: "Invalid Id"
            });
        }

        return sendResponse({
            res,
            statusCode: 204,
            message: "Successfully Deleted Task",
        });

    }catch(error){
        return sendResponse({
            res,
            statusCode: 400,
            message: "Cannot Delete Task",
            error: error,
        });
    }

        
};

const updateTask = async (req, res) => {
    const { taskId } = req.params;
    const { content, updatedAt, createdAt, isComplete } = req.body;

    if(isComplete == null || req.body.taskId){
        return sendResponse({
            res,
            statusCode: 400,
            message: "Invalid Request",
            error: "Invalid Request",
        });
    }

    try{
        resData = await Task.findOneAndUpdate({ taskId },{ $set: { content, updatedAt, isComplete, createdAt } }, { new: true, runValidators: true });

        if(!resData){
            return sendResponse({
                res,
                statusCode: 404,
                message: "Element Not Found",
                error: "Invalid Id"
            });
        }

        return sendResponse({
            res,
            statusCode: 200,
            message: "successfully updated task",
            data: resData
        });

    }catch(error){
        return sendResponse({
            res,
            statusCode: 400,
            message: "Cannot Update Task",
            error: error,
        });
    }
};

module.exports = {
    getAllTasks,
    getTaskByTaskId,
    addTask,
    deleteTask,
    updateTask,
}