const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const examSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        trim: true
    },
    classId: {
        type: ObjectId,
        ref: 'Class'
    },
    subjectId:{
        type:[ObjectId],
        ref: 'Subject'
    }
},
{timestamps:true})

const examModel = mongoose.model('Exam', examSchema)

module.exports = {examModel}