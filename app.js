require("dotenv").config()
require("./config/db").connect()

const express = require("express")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require("./routes/users")(app)

module.exports = app