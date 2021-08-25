const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskId: {
        type: String,
        unique: true,
        required: [true, 'Task cannot be created without taskId'],
    },
    content: {
        type: String,
        required: [true, 'Cannot create task without content'],
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        validate: {
            validator: function(v){
                return /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])\s(3[01]|[12][0-9]|0[1-9])\/(1[0-2]|0[1-9])\/[0-9]{4}/.test(v);
            },
            message: props => `Please use the correct format "H:M:S DD/MM/YYYY" for ${props.value}`,
        },
        required: true,
    },
    updatedAt: {
        type: String,
        validate: {
            validator: function(v){
                if(v!=""){
                    return /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9]):([0-5]?[0-9])\s(3[01]|[12][0-9]|0[1-9])\/(1[0-2]|0[1-9])\/[0-9]{4}/.test(v);
                }
            },
            message: props => `Please use the correct format "H:M:S DD/MM/YYYY" for ${props.value}`,
        },
        default: "",
    }
});

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;