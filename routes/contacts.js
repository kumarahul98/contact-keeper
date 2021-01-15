const express = require('express');
const router = express.Router();

// @route     GET api/ucontacts
// @desc      Get all user contacts
// @access    private
router.get('/',(req,res)=> {
    res.send('get contact');
});

// @route     POST api/contacts
// @desc      Add a contact
// @access    private
router.post('/',(req,res)=> {
    res.send('add a contact');
});

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    private
router.put('/:id',(req,res)=> {
    res.send('up date contact');
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    private
router.delete('/:id',(req,res)=> {
    res.send('Delete contact');
});

module.exports = router; 