const express = require('express');
const router = express.Router();
const User = require('../models/Users'); 
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contacts = require( '../models/Contacts' );

// @route     GET api/ucontacts
// @desc      Get all user contacts
// @access    private
router.get('/', auth, async (req,res)=> {
    try {
        const contacts = await Contacts.find({user: req.user.id}).sort({ date: -1});
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/contacts
// @desc      Add a contact
// @access    private
router.post('/',[auth, [
    body('name','Name is required').not().isEmpty()
]], async (req,res)=> {
    const errors = validationResult(req);
    if (errors.isEmpty()){
        const { name, email, phone, type } = req.body;
        try {
            const contact = new Contacts({
                name,
                email, phone, type,
                user: req.user.id
            });
            const response = await contact.save();
            res.json(response);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:"server error"});
        }
    }
    else{
        return res.status(400).json({errors: errors.array()})
    }
});

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    private 
router.put('/:id', auth, async (req,res)=> {
    const {name, email, phone, type } = req.body;
    const contact = {};

    if(name) contact.name=name;
    if(email) contact.email=email;
    if(phone) contact.phone=phone;
    if(type) contact.type=type;

    try {
        let oldContact = await Contacts.findById(req.params.id);

        if(!oldContact) res.status(404).json({msg: "Contact not found"});

        //make sure user owns the contact
        if(oldContact.user.toString() !== req.user.id) res.status(401).json({msg: "not authorized"});
console.log(contact);
        const newContact = await Contacts.findByIdAndUpdate(req.params.id,{
            $set: contact
        }, {
            $new: true
        });
        console.log(newContact);
        res.json(newContact);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:"server error"});
    }

});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    private
router.delete('/:id', auth, async (req,res)=> {
    try {
        let oldContact = await Contacts.findById(req.params.id);

        if(!oldContact) res.status(404).json({msg: "Contact not found"});

        //make sure user owns the contact
        if(oldContact.user.toString() !== req.user.id) res.status(401).json({msg: "not authorized"});

        await Contacts.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "Contact deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({msg:"server error"});
    }
});

module.exports = router; 