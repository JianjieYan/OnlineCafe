const express = require('express')
const bcrypt = require('bcrypt')
const Customer = require('../model/customerModel')
const router = express.Router()


router.post('/register', async(req, res) => {

    let u = await Customer.findOne({ email: req.body.email })
    if (u) return res.status(400).send({ error: 'Email already registered.' })
    const salt = await bcrypt.genSalt(10)
    const result = await bcrypt.hash(req.body.password, salt)

    let customer = new Customer({
        name: req.body.name,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        address: req.body.address,
        location: req.body.location,
        password: result,

    })

    await customer.save()

    return res.status(200).send({
        message: 'Business Registered !!'
    });
})

router.post('/login', async(req, res) => {
    let user = await Customer.findOne({ email: req.body.email })
    if (!user) return res.status(400).send({ error: 'No account registered with this email .' })
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (validPassword) {
        return res.status(200).send({
            status: "Logged In",
            user: user
        })
    } else {
        return res.status(400).send({ error: 'Wrong Password.' })
    }
})



module.exports = router;