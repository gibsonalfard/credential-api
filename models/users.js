const mongoose = require("mongoose")

const Users = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String},
    name: { type: String, default: null },
    role: { type: String},
    token: { type: String}
}, { timestamps: {} })

module.exports = mongoose.model("users", Users)