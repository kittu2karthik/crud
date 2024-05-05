const express = require('express');
const {
    createUser,deleteUser,getAllTheUsers,getUserInfo,updateTheUserInfo,uploadProfilePic
} = require('../controllers/users');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;



const router = express.Router();

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.route('/user-creation').post(createUser);

router.route('/users').get(getAllTheUsers);

router.route('/user-info/:userId').get(getUserInfo);

router.route('/update-user-info/:userId').put(updateTheUserInfo);

router.route('/delete-user/:userId').delete(deleteUser);

router.route('/upload/:userId').post(upload.single('image'),  uploadProfilePic);

module.exports = router;