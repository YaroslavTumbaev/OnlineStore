const Router = require("express");
const brandRouter = require("./brandRouter")
const deviceRouter = require("./deviceRouter")
const typeRouter = require("./typeRouter")
const userRouter = require("./userRouter")
const basketRouter = require("./basketRouter")
const messageRouter = require("./deviceComments")

const router = new Router()

router.use('/user', userRouter)
router.use('/device', deviceRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/basket', basketRouter)
router.use('/message', messageRouter)

module.exports = router