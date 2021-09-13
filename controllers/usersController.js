require("../config/db").connect()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/users")

exports.login = async (req, res) => {
    try{
        // Get Body Request
        const {email, password} = req.body

        // Validate input
        if (!(email && password)){
            res.status(400).send({"message": "Bad Request, All input is required"})
        }

        const user = await User.findOne({ email })

        if(user && (await bcrypt.compare(password, user.password))){
            // Create access token
            const token = jwt.sign({
                user_id: user._id, email, role: user.role
            }, process.env.TOKEN_KEY, { expiresIn: "2h"})

            user.token = token
            res.status(200).json({
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                token: user.token
            })
        }else{
            res.status(400).send({"message": "Invalid credentials"})
        }
    }catch(e){
        console.log(e)
        res.status(500).send({"message": "Undefined Error"})
    }
}

exports.getUser = async () => {
    const user = await User.find({})
    const userFiltered = user.map(
        ({_id,email, name, role}) => ({id: _id, email, name, role})
    )
    return userFiltered
}

exports.getUserById = async (id) => {
    return User.findOne({_id:id})
}

exports.addUser = async (req, res) => {
    if(req.user.role != "Admin"){
        res.status(400).send({"message": "Unauthorized access"})
        return 0
    }

    const {email, name, password, role} = req.body

    // Check if request incomplete
    if(!(email && password && name && role)){
        res.status(400).send({"message": "Body request incomplete"})
        return 0
    }

    // Check if User Already Exist
    const checkedUser = await User.findOne({email})
    if(checkedUser){
        res.status(409).send({"message": "User Already exist."})
        return 0
    }

    const user = new User({
        email: email,
        name: name,
        password: await bcrypt.hash(password, 10),
        role: role
    })

    user.save().then(data => {
        res.status(200).json({
            id: data._id,
            email: data.email,
            name: data.name,
            role: data.role})
    }).catch(err => {
        res.status(500).send({
            message: "Failed to save data to database"
        });
    })
}

exports.updateUser = async (req, res) => {
    if(req.user.role != "Admin"){
        res.status(400).send({"message": "Unauthorized access"})
        return 0
    }

    try{
        const { id } = req.params
        const {email, name, password, role} = req.body

        const user = await User.findById(id)

        user.email = email || user.email
        user.name = name || user.name
        user.password = await bcrypt.hash(password, 10) || user.password
        user.role = role || user.role

        user.save().then(data => {
            res.status(200).json({
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            })
        }).catch(err => {
            res.status(500).send({
                message: "Failed to update data to database"
            });
        })
    }catch(e){
        console.log(e)
        res.status(500).send({
            message: "Invalid id"
        });
    }
}

exports.deleteUser = async (req, res) => {
    if(req.user.role != "Admin"){
        res.status(400).send({"message": "Unauthorized access"})
        return 0
    }

    try{
        const { id } = req.params

        try{
            const user = await User.deleteOne({_id: id})

            res.status(200).send({"message": "Deletion success", "deleted": user.deletedCount})
        }catch(e){
            console.log(e)
            res.status(500).send({"message": "Failed to delete user"})
        }
    }catch(e){
        console.log(e)
        res.status(500).send({"message": "Invalid id"})
    }
}