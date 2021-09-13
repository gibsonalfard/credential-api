const usersController = require("../controllers/usersController")
const auth = require("../middlewares/auth")

module.exports = (app) => {
    let router = require("express").Router();

    router.get("/", auth ,async (req, res) => {
        if(req.user.role == "Admin"){
            // Response for Admin
            res.status(200).json({
                "message": "success",
                "data": await usersController.getUser()
            })
        }else{
            // Response for User
            res.status(200).json({
                "message": "success",
                "data": await usersController.getUserById(req.user.user_id)
            })
        }
    })
    router.post("/", auth , usersController.addUser)
    router.put("/:id", auth, usersController.updateUser)
    router.delete("/:id", auth, usersController.deleteUser)

    app.use('/api/users', router)
}