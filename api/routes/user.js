const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const { verifyTokenAndAdmin,verifyTokenAndAuthorization } = require('./verifyToken')

// Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        try {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
    try {
        await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json("Account has been updated")
    } catch (err) {
        return res.status(500).json(err)
    }

})

// Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Account has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get All User
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Get User with ID
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

// Create a user
router.post("/", verifyTokenAndAdmin, async (req, res) => {
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

module.exports = router