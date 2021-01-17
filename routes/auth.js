const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); 
const config = require('config');
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
// @route     POST api/auth
// @desc      Auth user get token
// @access    public
router.post('/', [
    body('email','Email is required').isEmail(),
    body('password','Password is required').exists()
],async (req,res)=> {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        const { email, password } = req.body;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: "Invalid creds"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({msg: 'Invalid password'});
        }
        const payload = {
            user: {
            id: user.id
        }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600}, (err, token) => {
            if(err){
                console.log(err);
            }
            else{
                res.json(token);
            }
        });
    }
    else {
        return res.status(400).json({errors: errors.array()})
    }
});

// @route     GET api/auth
// @desc      Get logged in user
// @access    private
router.get('/', auth, async(req,res)=> {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg: "server error"});
    }
});

module.exports = router; 