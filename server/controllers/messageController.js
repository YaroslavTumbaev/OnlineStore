const { DeviceComments } = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

class MessageController {
    async create(req, res) {
        const { email } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY)
        const {text, rate, deviceId} = req.body

        const comment = await DeviceComments.create({ text, rate, userName: email, deviceId })
        res.json({ comment })
    }

    async check(req, res) {
        const { deviceId } = req.query

        const comments = await DeviceComments.findAll({ where: { deviceId } })
        res.json({ comments })
    }
}

module.exports = MessageController