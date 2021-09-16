const express = require('express');
const router = express.Router();
const Contact = require('../model/contact');
const protect = require('../midlleware/protect');


// here on is in contact
// roads
router.get('/', protect, async (req, res) => {
    try {
        const userId = req.cookies.jwtData.id
        const contacts = await Contact.find({ userId: userId }).populate('userId');
        res.json({
            status: 'ok',
            data: contacts,
        });
    } catch (err) {
        return res.status(400).json({
            message: "something is wrong",
        });
    }
});


//create contact
router.post('/', async (req, res) => {
    const { userId, name, email, description, category } = req.body;
    try {
        await Contact.create({ userId: userId, email: email, name: name, description: description, category: category });
    } catch (err) {
        return res.status(400).json({
            message: "something is wrong",
        });
    }
    // message for tell contact is created 
    res.status(201).json({
        message: "contact created",
    });
});

//contact modification
//road put
router.put('/', async (req, res) => {
    const contactName = req.query.name
    // console.log(contactName)
    //modification contact :
    const contact = await Contact.findOne({ name: contactName });
    // console.log(contact);
    res.json({
        message: 'you change the name !',
    })
});

//delete contact
//road delete 
router.delete('/', async (req, res) => {
    const contactName = req.query.name
    // console.log(contactName);
    // this line deletes the contact 
    const contact = await Contact.deleteOne({ name: contactName });
    // console.log(contact);
    res.json({
        message: 'you delete contact !',
    });
});





module.exports = router;