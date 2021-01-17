const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); 
const config = require('config');

const { body, validationResult } = require('express-validator');
const { response } = require( 'express' );

// @route     POST api/users
// @desc      Register a user
// @access    public
router.post('/',[
    body('name','plz. enter a proper name...').not().isEmpty().isAlpha(),
    body('email','invalid email').isEmail(),
    body('password','enter a valid password').isLength({min: 6})
],
async (req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        //destructure the req
    const {name, email, password } = req.body;

    //check is the user exists on db
    try {
        let user = await User.findOne({email});
        if(user) {
            return res.status(400).json({msg: "User already exists"});
        }

        // creating the user object
        user = new User({
        name,
        email,
        password
    });

    //encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

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
    

    } catch (err) {
        console.log(err.message);
        res.status(500).json({msg: "server error"});
    }

    }
    else {
        return res.status(400).json({errors: errors.array()})
    }
});

module.exports = router; 