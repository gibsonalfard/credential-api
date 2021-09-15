const mongoose = require("mongoose")

const {
    MONGO_INITDB_ROOT_USERNAME,
    MONGO_INITDB_ROOT_PASSWORD,
    MONGODB_HOST,
    MONGODB_PORT,
    MONGO_INITDB_DATABASE
} = process.env
const MONGO_URI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}`

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