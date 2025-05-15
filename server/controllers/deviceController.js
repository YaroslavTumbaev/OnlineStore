const { Device, DeviceInfo, DeviceComments } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info, img} = req.body

            const device = await Device.create({name, price, brandId, typeId, img})

            if (info) {
                info = JSON.parse(info)
                info.forEach(e => {
                    DeviceInfo.create({
                        title: e.title,
                        description: e.description,
                        id: device.id
                    })
                });
            }
    
            return res.json(device)
        }catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res) {
        let {brandId, typeId, page, limit, info} = req.query

        let devices;
        page = page || 1
        limit = limit || 9

        let offset = page * limit - limit

        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where: {brandId, typeId}, limit, offset})
        }

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset})
        }

        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
        }

        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
        }

        return res.json(devices)
    }

    async checkId(req, res) {
        const id = req.params

        const device = await Device.findOne({
            where: { id },
            include: [{module: DeviceInfo, as: 'info'}]
        })

        return res.json(device)
    }

    async addRaiting(req, res) {
        const id = parseInt(req.params.id, 10)
        const { rating } = req.body

        if (!rating) {
            res.json(ApiError.badRequest('Не заданны изменения'))
        }

        if (!id) {
            res.json(ApiError.badRequest('Id не задан'))
        }

        try {
            const deviceComments = await DeviceComments.findAll({ where: { deviceId: id } })
            let newRating = 0;
            deviceComments.forEach(e => {
                return newRating += Number(e.rate)
            })

            const updateRating = (newRating + rating) / (deviceComments.length + 1)

            // res.json({ updateRating, rating, newRating })

            await Device.update({rating: updateRating.toFixed(0)}, {
                where: { id }
            })
        }catch (error) {
            res.json({ error })
        }

        const updatedDevice = await Device.findByPk(id);

        res.json({ updatedDevice })
    }
}

module.exports = DeviceController