require("../config/db").connect()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/users")


/*
The login endpoint function is used to obtain an access token
that can be used to make a request to another endpoint.
This function obtains an access token by using the registered user's username and password.
For the login user, JWT generates a dynamic token that expires in 2 hours.
 */
exports.login = async (req, res) => {
    try{
        // Get Body Request
        const {username, password} = req.body

        // Validate input
        if (!(username && password)){
            res.status(400).send({"message": "Bad Request, All input is required"})
        }

        const user = await User.findOne({ username })

        if(user && (await bcrypt.compare(password, user.password))){
            // Create access token
            const token = jwt.sign({
                user_id: user._id, username, role: user.role
            }, process.env.TOKEN_KEY, { expiresIn: "2h"})

            user.token = token
            res.status(200).json({
                id: user._id,
                username: user.username,
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

/*
In JSON format, get a list of all registered users from the database.
This function only returns the user's id, username, name, and role.
 */
exports.getUser = async () => {
    const user = await User.find({})
    const userFiltered = user.map(
        ({_id,username, name, role}) => ({id: _id, username, name, role})
    )
    return userFiltered
}

/*
Get JSON-formatted user data based on the user's id.
This function only returns one database record.
 */
exports.getUserById = async (id) => {
    return User.findOne({_id:id})
}

/*
Add user data to the database.This function determines whether or not a user already exists in the database.
This function performs bcrypt hashing on the password obtained from the HTTP request body.
 */
exports.addUser = async (req, res) => {
    if(!authorized(req, res, "INSERT")){
        return 0
    }

    const {username, name, password, role} = req.body

    // Check if request incomplete
    if(!(username && password && name && role)){
        res.status(400).send({"message": "Body request incomplete"})
        return 0
    }

    // Check if User Already Exist
    const checkedUser = await User.findOne({username})
    if(checkedUser){
        res.status(409).send({"message": "User Already exist."})
        return 0
    }

    const user = new User({
        username: username,
        name: name,
        password: await bcrypt.hash(password, 10),
        role: role
    })

    user.save().then(data => {
        res.status(200).json({
            id: data._id,
            username: data.username,
            name: data.name,
            role: data.role})
    }).catch(err => {
        console.log(err)
        res.status(500).send({
            message: "Failed to save data to database"
        });
    })
}

/*
To update user data in a database, use this method.
This function reads data from the body of an HTTP request.
It is not required to enter all data into the body request.
You only need to enter the field that needs to be updated.
 */
exports.updateUser = async (req, res) => {
    if(!authorized(req, res, "UPDATE")){
        return 0
    }

    try{
        const { id } = req.params
        const {username, name, password, role} = req.body

        const user = await User.findById(id)

        user.username = username || user.username
        user.name = name || user.name
        user.password = await bcrypt.hash(password, 10) || user.password
        user.role = role || user.role

        user.save().then(data => {
            res.status(200).json({
                id: data._id,
                name: data.name,
                username: data.username,
                role: data.role
            })
        }).catch(err => {
            console.log(err)
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

/*
This function determines whether the user attempting to access an endpoint is authorized to do so.
This function also keeps track of unauthorized access to the nodejs console for future reference.
 */
const authorized = (req, res, access) => {
    let status = 1
    try{
        if(req.user.role != "Admin"){
            console.log(`Unauthorized ${access} access by ${req.user.username}-${req.user.user_id} on Users API`)
            res.status(400).send({"message": "Unauthorized access"})
            status = 0
        }
    }catch(e){
        console.log(e)
        res.status(500).send({"message": "Invalid token, please login to get access token"})
        status = 0
    }
    return status
}

/*
Delete a user from the database based on their id.
 */
exports.deleteUser = async (req, res) => {
    if(!authorized(req, res, "DELETE")){
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