const UserModel = require('../models/users');

const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});



exports.createUser = asyncHandler(async (req, res) => {
    const checkExistingUser = await UserModel.exists({ email: req.body.email });

    if (checkExistingUser) {
        return res.status(400).json('User is already exists....')
    }
    const newUser = await UserModel.create(req.body);
    return res.status(200).json(newUser);
});

exports.updateTheUserInfo = asyncHandler(async (req, res) => {
    const exisitngUser = await UserModel.exists({ _id: req.params.userId });

    if (!exisitngUser) {
        res.status(400).json("User with this i'd doesn't exists");
    } else {
        const updateUserInfo = await UserModel.updateOne({ _id: req.params.userId }, req.body);
        res.json({
            status: 200,
            updateUserInfo,
        });
    }
});


exports.getAllTheUsers = asyncHandler(async (req, res) => {
    res.json({
        status: 200,
        data: await UserModel.find(),
    });
});

exports.getUserInfo = asyncHandler(async (req, res) => {
    res.json({
        status: 200,
        data: await UserModel.findOne({ _id: req.params.userId }),
    });
});


exports.deleteUser = asyncHandler(async (req, res) => {
    res.json({
        status: 200,
        data: await UserModel.deleteOne({ _id: req.body.userId }),
    });
});


exports.uploadProfilePic = asyncHandler(async (req, res) => {
    // Upload image to Cloudinary
    cloudinary.uploader.upload_stream({ resource_type: "image" }, async (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Upload failed' });
        }
        // Image uploaded successfully, return Cloudinary URL
        
        const userProfile = await UserModel.findOneAndUpdate({ _id : req.params.userId }, {profilePic: result.url }, { new: true });
        
        res.status(200).json(userProfile);
    }).end(req.file.buffer);
})