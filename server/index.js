const express = require("express")
require('dotenv').config()
const sequelize = require("./db")
const models = require("./models/models")
const cors = require("cors")
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const PORT = process.env.PORT

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server get start on port ${PORT}`))
    } catch (e) {
        console.log(e);
        
    }
}

start()