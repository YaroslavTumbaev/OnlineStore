const Router = require("express");
const router = new Router()
const BrandController = require("../controllers/brandController")
const controller = new BrandController

router.post('/', controller.create)
router.get('/', controller.check)

module.exports = router