require('dotenv').config({ path: '../.env' });
const mongoose = require("mongoose");

const mongoConfig = require("../utils/helper");
const env = process.env.ENV;
const mongoPwd = process.env.MONGO_PWD;
const mongoUser = process.env.MONGO_USER;

const pwd = mongoPwd.replace(/@/g, "\\@");
const userUri = `${mongoUser}:${pwd}`;
const hostUri = mongoConfig.getConnectionUri();
const port = process.env.MONGO_PORT;
const dbUri = process.env.MONGO_DB;
const options = mongoConfig.getOptionUri();

let mongoConnectionUri;

let mongooseConfig = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};

if (env === "production") {
    mongoConnectionUri = `mongodb://${userUri}@${hostUri}/${dbUri}?${options}`;
    console.log("This project is running in production mode");
} else {
    mongoConnectionUri = `mongodb://${hostUri}/${dbUri}`;
    console.log("This project is running in development mode");
}

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoConnectionUri, mongooseConfig);
        console.log(`MongoDB Connected: ${conn.connection.host}:${port}`);
    } catch (err) {
        console.log(`MongoDB connection error ${err}`);
    }
};

mongoose.set("useFindAndModify", false);
mongoose.set("debug", true);

module.exports = connectDB;
