const mongoose = require("mongoose")

const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGO_INITDB_DATABASE
} = process.env
const MONGO_URI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`

/*
Using an environment variable, a MongoDB connection to a specific URI is established.
Environment variables can be set up in your operating system using the.env file or the export command.
*/
exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: `${MONGO_INITDB_DATABASE}`
    }).then(() => {
        console.log("Successfully connected to MongoDB Databases")
    }).catch((error => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    }))
}