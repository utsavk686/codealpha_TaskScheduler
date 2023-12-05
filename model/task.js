import mongoose from "mongoose";
import {v4 as uuidV4} from "uuid"

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, "Title is required"]
    },
    description:{
        type:String,
        required: [true, "Description is required"]
    },
    reminderDate: {
        type: Date,
        required: [true, "Reminder Date is required"]
    },
    isCompleted:{
        type:Boolean,
        default: false
    },
    jobSchedule: {
        type: Boolean,
        default: false
    },
    auther:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    jobID: {
        type: String
    }
})

taskSchema.pre("save", function(){
        const uniqueId = uuidV4()
        this.jobID = uniqueId
})

mongoose.models = {};

export const task = mongoose.model("task", taskSchema);