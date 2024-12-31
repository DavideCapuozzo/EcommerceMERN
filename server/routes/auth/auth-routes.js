const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, authMiddleware} = require('../../controllers/auth/auth-controllers');
const { json } = require('body-parser');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/check-auth', authMiddleware, (req, res)=>{
    const user = req.user;
    res.status(200).json({
        success: true,
        message: 'Authenticated User',
    })
});


module.exports = router;