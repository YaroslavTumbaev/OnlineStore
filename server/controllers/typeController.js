const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async check(req, res) {
        const data = await Type.findAll()
        res.json(data)
    }
}

module.exports = TypeController