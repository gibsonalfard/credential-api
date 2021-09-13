require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")

const usersController = require("./controllers/usersController")

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/api/login", usersController.login)
require("./routes/users")(app)

module.exports = app