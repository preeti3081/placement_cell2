const mongoose = require('mongoose');
const Student = require('./student');

const interviewSchema = new mongoose.Schema({
    date :{
        type: Date,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    result:{
        type: String,
        required: true,
        enum: ['pass','fail','hold'],
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', // Reference to the Student model
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // student: {
    //     type: String, // Change the type to String to store the student's name
    //     required: true,
    // },
});
const Interview = mongoose.model('Interview',interviewSchema);
module.exports = Interview;