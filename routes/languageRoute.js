const express = require('express');
const languageController = require('../controllers/languageController');

const route = express.Router()

route.get('/api/language', languageController.getAllLanguage)
route.get('/api/language/:id', languageController.getrowLanguage)
route.post('/api/language', languageController.createLanguage)
route.put('/api/language/:id', languageController.editLanguage)
route.delete('/api/language/:id', languageController.deleteLanguage)

module.exports = route;