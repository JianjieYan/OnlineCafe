const express = require('express')
const axios = require('axios')

const router = express.Router()



router.post('/getNearBy', async(req, res) => {
    const data = {
        location: req.body.location
    }
    axios.post('https://cs615-project.herokuapp.com/business/getBusinessByLocation', data)
        .then((response) => {
            return res.send(response.data)
        }).catch((err) => {
            console.error(err);
            return res.send({
                error: err
            })
        });
})


router.post('/getCurrentDayDeliveryTime', async(req, res) => {
    const data = {
        businessEmail: req.body.businessEmail
    }
    var dayName = req.body.dayName.toLowerCase()
    axios.post('https://cs615-project.herokuapp.com/business/getBusinessDayAndTime', data)
        .then((response) => {
            var w = response.data
            w.forEach(element => {
                if (element.dayName === dayName) {

                    if (element.isDelivery === true) {
                        return res.status(200).send(element)
                    }
                    return res.status(400).send({ error: 'No delivery on ' + dayName + ' available.' })

                }
            });
            return res.send({ error: 'Day Provided is wrong.' })
        }).catch((err) => {
            console.error(err);
            return res.send({
                error: err
            })
        });

})

module.exports = router;