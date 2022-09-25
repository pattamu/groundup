const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const subjectSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    classId: {
        type: ObjectId,
        ref: 'Class'
    }
},
{timestamps:true})

const subjectModel = mongoose.model('Subject', subjectSchema)

module.exports = {subjectModel}