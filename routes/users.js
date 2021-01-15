const express = require('express');
const router = express.Router();

const User = require('../models/Users'); 
// @route     POST api/users
// @desc      Register a user
// @access    public
router.post('/',(req,res)=> {
    res.send('Register a new user');
});

module.exports = router; 