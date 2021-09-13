const mongoose = require("mongoose")

const Users = new mongoose.Schema({
    email: { type: String, unique: true },
    password: { type: String},
    name: { type: String, default: null },
    role: { type: String}
}, { timestamps: {} })

module.exports = mongoose.model("users", Users)