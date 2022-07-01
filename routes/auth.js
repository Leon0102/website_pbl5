const express = require('express');
const router = express.Router();
const {login,register,login_form,register_form} = require('../controllers/AuthController');
const auth = require('../middleware/authentication');

router.post('/register',register);
router.post('/',login);
router.get('/',login_form);
router.get('/register',register_form);

module.exports = router; 
