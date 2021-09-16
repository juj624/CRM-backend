const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// here on is in  /register
// roads
//ma regex:
const passwordRegex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$/

router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const resultPassword = passwordRegex.test(password)
    console.log(resultPassword);

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    //Save register to DB
    if (resultPassword) {
        try {
            await User.create({ email: email, password: hashedPassword });
        } catch (err) {
            // message for tell user is  already exists
            return res.status(400).json({
                message: "this user already exists",
            });
        }
    } else (res.status(400).json({
        message: "Email or passwork is not valid",
    }))

    // message for tell user is created with email
    res.status(201).json({
        message: `User created with email: ${email}`,
    });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists
    //const user = await User.findOne({ email: email });
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    // Check if password is correct
    // On compare le mot de passe du body avec le hash de la BD
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password",
        });
    }

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Create cookie
    // Le troisième argument est un objet de configuration
    res.cookie("jwt", token, { httpOnly: true, secure: false });

    res.json({
        message: "Here is your cookie for subsequent requests, have fun :)",
    });
});

router.get('/logout', (_req, res) => {
    res.clearCookie('jwt');
    res.json({
        message: 'you are deconnected ! :)'
    })
});

module.exports = router;