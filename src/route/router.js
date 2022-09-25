const express = require('express')
const router = express.Router()

const {createStudent} = require('../controller/studentController')
const {createClass, createSubject, createExam, createResult, getResultsForSub} = require('../controller/classController')

router.post('/register', createStudent)

router.post('/class', createClass)
router.post('/subject', createSubject)
router.post('/exam', createExam)
router.post('/result', createResult)

router.get('/getResult', getResultsForSub)


module.exports = router