const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.get('/',adminController.getAllAdmins)
router.post('/:id',adminController.updateAdmin)
router.delete('/:id', adminController.deleteAdmin)

module.exports = router;