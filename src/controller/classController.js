const {classModel} = require('../model/classModel')
const {subjectModel} = require('../model/subjectModel')
const {resultModel} = require('../model/resultModel')
const {studentModel} = require('../model/studentModel')
const { examModel } = require('../model/examModel')
const { default: mongoose } = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const createClass = async (req,res) => {
    try{
        let data = req.body
        let classData = await classModel.create(data)
        res.status(201).send({data: classData})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

const createSubject = async (req,res) => {
    try{
        let data = req.body
        let subject = await subjectModel.create(data)
        res.status(201).send({data: subject})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

const createExam = async (req,res) => {
    try{
        let data = req.body
        let subjectsForClass = (await subjectModel.find({classId: data.classId})).map(x => x = x._id.toString())
        let subNotforTheClass = []
        for(let subId of data.subjectId){
            if(!subjectsForClass.includes(subId.toString())) 
            subNotforTheClass.push(subId)
        }
        if(subNotforTheClass.length) 
            return res.status(400).send({subjects: subNotforTheClass, msg: `These subjects are not for this class.🚨`})

        let classData = await examModel.create(data)
        res.status(201).send({data: classData})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

const createResult = async (req,res) => {
    try{
        let data = req.body

        let getStudent = await studentModel.findById(data.studentId)
        let findExam = await examModel.findOne({_id: data.examId, classId: getStudent.classId})
        if(!findExam)
            return res.status(404).send({msg: "This student has not given this exam."})
        
        if(await resultModel.findOne({studentId: data.studentId, examId: data.examId}))
            return res.status(400).send({msg: "Result has already been stored for this student of this exam."})

        let findSubsOfexam = await examModel.findById(data.examId)

        for(let sub of data.mark){
            sub = ObjectId(sub.subjectId)
            if(!findSubsOfexam.subjectId.includes(sub))
                return res.status(404).send({inValidSubs: sub, msg: "These subjects are not from this exam"})
        }
        let result = await resultModel.create(data)
        res.status(201).send({data: result})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

const getResultsForSub = async (req,res) => {
    try{
        let {classId, subjectId} = req.query
        let studentsOfThisClass = await studentModel.find({classId})

        let result = await resultModel.find({studentId: studentsOfThisClass})

        let sortResult = []

        for(let res of result){
            let temp = res.mark.filter(x => x.subjectId.toString() === subjectId)
            sortResult.push({studentId: res.studentId, scoreInSub: temp[0].score})
        }
        
        if(!sortResult.length)
            return res.status(404).send({msg: "No result found"})
            
        res.status(200).send({subject: subjectId, resultOfClass: sortResult})
    }
    catch(err){
        res.status(500).send({msg: err.message})
    }
}

module.exports = {createClass, createSubject, createExam, createResult, getResultsForSub}