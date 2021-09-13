const mongoose = require("mongoose")

const { MONGO_URI } = process.env

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "credentialdb"
    }).then(() => {
        console.log("Successfully connected to MongoDB Databases")
    }).catch((error => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    }))
}