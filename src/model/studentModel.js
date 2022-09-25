const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const studentSchema = new mongoose.Schema({
    classId: {
        type: ObjectId, 
        ref: 'Class'
    },
    name: {
        type: String, 
        required: true, 
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String, 
        // unique:true, 
        trim: true, 
        lowercase: true
    },
    phone: {
        type: String, 
        // unique:true, 
        trim: true
    }, 
},
{timestamps:true})

const studentModel = mongoose.model('Student', studentSchema)//students

module.exports = {studentModel}