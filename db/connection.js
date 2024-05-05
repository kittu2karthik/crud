const mongoose = require('mongoose');

const makeDbConnection = async () => {
    try {
        const createConnection = await mongoose.connect(process.env.mongo_uri);
        console.log(`DB Connection established successfully, ${createConnection.connection.host}`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { makeDbConnection };