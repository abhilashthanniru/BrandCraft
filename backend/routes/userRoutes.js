const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const { register, login, getProfile, updateProfile } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getProfile);
router.post('/update', authMiddleware, updateProfile); 

module.exports = router;
