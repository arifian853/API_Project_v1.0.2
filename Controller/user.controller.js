require('dotenv').config();
const User          = require('../models/user.model');
const bcryptjs      = require('bcryptjs');
const jsonwebtoken  = require('jsonwebtoken');

exports.RegisterUser = async (req,res) => {
    const {userID, username, pwd, level} = req.body

    const HashPassword = await bcryptjs.hash(pwd, 10); 

    const user = new User({
        userID : userID,
        username : username,
        pwd : HashPassword,
        level : level,
    })

    user.save();

    return res.status(201).json({
        message:'User Account Created',
    })
}

exports.RegisterAdmin = async (req,res) => {
    const {userID, username, pwd, level} = req.body

    const HashPassword = await bcryptjs.hash(pwd, 10); 

    const user = new User({
        userID : userID,
        username : username,
        pwd : HashPassword,
        level : level,
    })

    user.save();

    return res.status(201).json({
        message:'Admin Account Created',
    })
}

exports.LoginUser = async (req,res) => {
    const {userID, username, pwd, level } = req.body
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
                message: `Login Success, Welcome ${username}`,
                userID : `You are : ${userID}`,
                level : `Your Level is : ${level}`,
                token : token
            })
        }else {
            return res.status(404).json({
                message: `Login Failed, Password not match with Username`
            })
        }
    }else {
        return res.status(404).json({
            message: `Login Failed, Username doesn't exist`,
        })
    }
}

exports.LoginAdmin = async (req,res) => {
    const {userID, username, pwd, level } = req.body
    const dataAdmin = await User.findOne({username:username})
    console.log(dataAdmin)
    if(dataAdmin) {
        const passwordAdmin = await bcryptjs.compare(pwd, dataAdmin.pwd)
        if(passwordAdmin) {
            const data = {
                id : dataAdmin._id
            }
            const infoToken = 'Token only available for this session and will changed after logout';
            const token = await jsonwebtoken.sign(data, process.env.JSWT_SECRET_ADMIN) 
            return res.status(200).json({
                message: `Login Success, Welcome Admin ${username}`,
                userID : `You are : ${userID}`,
                level : `Your Level is : ${level}`,
                token : token,
                infoToken : infoToken
                
            })
        }else {
            return res.status(404).json({
                message: `Login Failed, Password not match with Username`,
            })
        }
    }else {
        return res.status(404).json({
            message: `Login Failed, Username doesn't exist`,
        })
    }
}

