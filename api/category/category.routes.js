const express = require('express')
const {requireAuth, requireAdmin,requireUser} = require('../../middlewares/requireAuth.middleware')
const {addItem,updateItem, getItems, getItem, deleteItem} = require('./category.controller')
const router = express.Router()

// middleware that is specific to this router

//router.use(requireUser)
//router.use(requireAdmin)
router.get('/', getItems) //requireUser
router.get('/:id', getItem) //requireUser

router.post('/' , addItem) //,requireAdmin
router.put('/:id', updateItem) //, requireAdmin
router.delete('/:id', deleteItem) //, requireAdmin

module.exports = router