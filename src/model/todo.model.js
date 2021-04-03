const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchema=  new schema({
    title:{
        type:String,
        trim: true,
        require:true
    },
    description:{
        type:String,
        trim:true,
        require:true
    },
    isCompleted:{
        type:Boolean,
        default:false,
        require:true
    },
    createdBy:{
        type:schema.Types.ObjectId,
        ref:"user",
        require:true,
    }
},{timestamps:true})
exports.todoModel= mongoose.model("todo",todoSchema)