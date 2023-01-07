const express = require('express');
const userController = require('../controllers/userController');

const route = express.Router()

route.post('/api/user', userController.createUser)
route.put('/api/user/:id', userController.editUser)
route.delete('/api/user/:id', userController.deleteUser)

module.exports = route;