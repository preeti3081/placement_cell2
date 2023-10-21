const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    college:{
        type: String,
        required: true,
    },
    placement:{
        type: String,
        required: true,
        enum: ['Placed', 'Not Placed'],
    },
    dsa :{
        type: Number,
        required: true,
    },
    webd: {
        type: Number,
        required: true,
    },
    react: {
        type: Number,
        required: true,
    },
    interviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Interview' // Reference to the 'Interview' model
        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});
const Student = mongoose.model('Student',studentSchema);
module.exports = Student ;