const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const classSchema = new mongoose.Schema({
    name: {
        type: Number, 
        required: true, 
        unique: true,
        trim: true
    }
},
{timestamps:true})

const classModel = mongoose.model('Class', classSchema)

module.exports = {classModel}