const express = require('express');
const formController = require('../../controllers/form.controller');
const router = express.Router();

router.get('/', formController.getAllForms)
      .post('/', formController.createForm)
      .get('/:id',formController.getFormDetails)
      .post('/response', formController.saveFormResponse);

module.exports = router;