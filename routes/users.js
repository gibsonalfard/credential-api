module.exports = (app) => {
    let router = require("express").Router();

    router.get("/", (req, res) => {
        res.json({"message": "Hello World"})
    })

    app.use('/api/users', router)
}