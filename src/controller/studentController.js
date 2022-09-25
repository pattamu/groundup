const {studentModel} = require('../model/studentModel')

const createStudent = async (req,res) => {
    try{
        let data = req.body
        let student = await studentModel.create(data)
        res.status(201).send({data: student})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

module.exports = {createStudent}