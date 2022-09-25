const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const resultSchema = new mongoose.Schema({
    studentId:{
        type: ObjectId,
        ref: 'Student'
    },
    examId: {
        type: ObjectId,
        ref: 'Exam'
    },
    mark: [{
        _id: false,
        subjectId:{type: ObjectId, ref: 'Subject'},
        score: {type: Number, min:0, max: 100}
    }]
},
{timestamps:true})

const resultModel = mongoose.model('Result', resultSchema)

module.exports = {resultModel}