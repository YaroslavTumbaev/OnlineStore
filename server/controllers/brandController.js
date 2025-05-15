const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const { name } = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async check(req, res) {
        const data = await Brand.findAll()
        return res.json(data)
    }
}

module.exports = BrandController