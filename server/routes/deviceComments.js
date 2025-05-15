const Router = require("express");
const MessageController = require('../controllers/messageController')
const router = new Router()
const controller = new MessageController

router.post('/', controller.create)
router.get('/', controller.check)

module.exports = router