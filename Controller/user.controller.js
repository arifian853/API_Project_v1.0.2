require('dotenv').config();
const User          = require('../models/user.model');
const bcryptjs      = require('bcryptjs');
const jsonwebtoken  = require('jsonwebtoken');

exports.DaftarUser = async (req,res) => {
    const {userID, username, pwd, level, authkey} = req.body

    const HashPassword = await bcryptjs.hash(pwd, 10); 

    const user = new User({
        userID : userID,
        username : username,
        pwd : HashPassword,
        level : level,
        authkey : authkey
    })

    user.save();

    return res.status(201).json({
        message:'Account Created',
    })
}

exports.LoginUser = async (req,res) => {
    const {userID, username, pwd, level, authkey } = req.body
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
                message: `Login Failed, Password wrong`,
            })
        }
    }else {
        return res.status(404).json({
            message: `Login Failed, Username doesn't exist`,
        })
    }
}