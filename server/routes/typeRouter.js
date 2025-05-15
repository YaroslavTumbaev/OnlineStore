const Router = require("express");
const router = new Router()
const TypeController = require("../controllers/typeController")
const controller = new TypeController
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), controller.create)
router.get('/', controller.check)

module.exports = router