const Router = require("express");
const router = new Router()
const DeviceController = require("../controllers/deviceController")
const controller = new DeviceController

router.post('/', controller.create)
router.get('/', controller.check)
router.get('/:id', controller.checkId)
router.put('/rate/:id', controller.addRaiting)

module.exports = router