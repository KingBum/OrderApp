const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require('../models/User')
const jwt = require('jsonwebtoken')



// Register 
router.post("/register", async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
        username: req.body.username,
        password: hashedPass
    })
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})


// Login
router.post("/login", async (req, res) => {
    try {
        const checkUserName = await User.findOne({ username: req.body.username })
        !checkUserName && res.status(401).json("Don't Found User")

        const hasdedPassword = await bcrypt.compare(req.body.password, checkUserName.password)
        !hasdedPassword && res.status(401).json("Wrong Password!!!")

        const accessToken = jwt.sign(
            {
                username : checkUserName.username,
                isAdmin : checkUserName.isAdmin
            },
            process.env.KEY_SECRET_TOKEN, 
            { expiresIn: "1d" }
        )

        const { password, ...others } = checkUserName._doc
        res.status(200).json({...others, accessToken})
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router