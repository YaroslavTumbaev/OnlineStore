const { Basket, BasketDevice, Device } = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

class BasketController {
    async create(req, res) {
        try {
            const { id } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY)
            const { deviceId } = req.body
            
            const basket = await Basket.findOne({ where: { userId: id } });
    
                    const existingItem = await BasketDevice.findOne({
                        where: {
                            basketId: basket.id,
                            deviceId: deviceId 
                        }
                    })
                    
        
                    if (existingItem) {
                        return res.json({ message: ApiError.badRequest('Товар уже есть в корзине')})
                    }
    
                const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId })
                return res.status(200).json({ basketDevice })
        } catch (e) {
            console.error('Ошибка в create:', e);
            return res.status(500).json({
                message: 'Непредвиденная ошибка',
                error: e.message,
                stack: e.stack
            });
        }
    }

    async check(req, res) {
        const { id } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY)
        
        const basket = await Basket.findOne({
            where: { id },
            include: {
              model: BasketDevice,
              include: Device,
            }
        })
        res.json({ basket })
    }

    async delete(req, res) {
        try {
            const { id: userId } = jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY)
            const basket = await Basket.findOne({ where: { userId } });

            const { deviceId } = req.params
    
            await BasketDevice.destroy({
                where: {
                    basketId: basket.id,
                    deviceId: deviceId
                }
            })
    
            return res.json({ message: 'Товар удален из корзины' })
        } catch (e) {
            return res.json({ message: 'Ошибка при удалении', e })
        }
    }
}

module.exports = BasketController