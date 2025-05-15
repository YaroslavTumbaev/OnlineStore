const Router = require("express");
const router = new Router()
const BasketController = require("../controllers/basketController")
const controller = new BasketController

router.post('/', controller.create)
router.get('/', controller.check)
router.delete('/:deviceId', controller.delete)

module.exports = router