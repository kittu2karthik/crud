const express = require('express');
const cors = require('cors');
require('dotenv').config();
const serverless = require("serverless-http");


const userRouter = require('./routes/users')
const { makeDbConnection } = require('./db/connection')

const app = express();

makeDbConnection() //Making db connection


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);


const port = process.env.port || 5000;
app.listen(port , () => console.log(`Server is running on port ${port}`));

module.exports.handler = serverless(app);

