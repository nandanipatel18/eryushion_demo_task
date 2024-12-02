const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAllStudents);
router.put('/', studentController.addStudent);
router.get('/:id', studentController.getStudent);
router.post('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
