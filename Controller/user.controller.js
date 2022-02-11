require('dotenv').config();
const User          = require('../models/user.model');
const Admin         = require('../models/admin.model');
const bcryptjs      = require('bcryptjs');
const jsonwebtoken  = require('jsonwebtoken');
const { use } = require('../routes/user');

exports.RegisterUser = async (req,res) => {
    const {userID, username, pwd, level, fullName , studentID} = req.body

    const usernameUser = await User.findOne({username: username})
    const studentIDUser = await User.findOne({studentID: studentID})

    if(usernameUser) {
        return res.status(404).json({
            status:false,
            message: 'Username already exists'
        })
    }

    if(studentIDUser) {
        return res.status(404).json({
            status:false,
            message: 'Student ID already exists'
        })
    }

    const HashPassword = await bcryptjs.hash(pwd, 10); 

    const user = new User({
        fullName : fullName,
        studentID : studentID,
        userID : userID,
        username : username,
        pwd : HashPassword,
        level : level
    })

    user.save();

    return res.status(201).json({
        message:'User Account Created',
    })
}

exports.RegisterAdmin = async (req,res) => {
    const {userID_Admin, username_Admin, pwd_Admin, level_Admin, fullName_Admin , adminID} = req.body

    const usernameAdmin = await Admin.findOne({username_Admin: username_Admin})
    const findAdminID = await Admin.findOne({adminID : adminID})

    if(usernameAdmin) {
        return res.status(404).json({
            status:false,
            message: 'Username already exists'
        })
    }

    if(findAdminID) {
        return res.status(404).json({
            status:false,
            message: 'Student ID already exists'
        })
    }

    const HashPassword = await bcryptjs.hash(pwd_Admin, 10); 

    const admin = new Admin({
        fullName_Admin : fullName_Admin,
        adminID : adminID,
        userID_Admin : userID_Admin,
        username_Admin : username_Admin,
        pwd_Admin : HashPassword,
        level_Admin : level_Admin,
    })

    admin.save();

    return res.status(201).json({
        message:'Admin Account Created',
    })
}

exports.LoginUser = async (req,res) => {
    const {userID, username, pwd, level, fullName, studentID} = req.body
    const datauser = await User.findOne({username:username})
    console.log(datauser)
    if(datauser) {
        const passwordUser = await bcryptjs.compare(pwd, datauser.pwd)
        if(passwordUser) {
            const data = {
                id : datauser._id
            }
            const token = await jsonwebtoken.sign(data, process.env.JSWT_SECRET) 
            return res.status(200).json({
                message: `Login Success, Welcome ${fullName} , ${studentID}`,
                userID : `You are : ${userID}`,
                level : `Your Level is : ${level}`,
                token : token
            })
        }else {
            return res.status(404).json({
                status:false,
                message: `Login Failed, Password not match with Username`
            })
        }
    }else {
        return res.status(404).json({
            status:false,
            message: `Login Failed, Username doesn't exist`,
        })
    }
}

exports.LoginAdmin = async (req,res) => {
    const {userID_Admin, username_Admin, pwd_Admin, level_Admin, fullName_Admin , adminID} = req.body
    const dataAdmin = await Admin.findOne({username_Admin:username_Admin})
    console.log(dataAdmin)
    if(dataAdmin) {
        const passwordAdmin = await bcryptjs.compare(pwd_Admin, dataAdmin.pwd_Admin);
        if(passwordAdmin) {
            const data = {
                id : dataAdmin._id
            }
            const infoToken = 'Token only available for this session and will changed after logout';
            const token = await jsonwebtoken.sign(data, process.env.JSWT_SECRET_ADMIN) 
            return res.status(200).json({
                message: `Login Success, Welcome Admin ${fullName_Admin} , ${adminID}`,
                userID : `You are : ${userID_Admin}`,
                level : `Your Level is : ${level_Admin}`,
                token : token,
                infoToken : infoToken
                
            })
        }else {
            return res.status(404).json({
                status:false,
                message: `Login Failed, Password not match with Username`,
            })
        }
    }else {
        return res.status(404).json({
            status:false,
            message: `Login Failed, Username doesn't exist`,
        })
    }
}