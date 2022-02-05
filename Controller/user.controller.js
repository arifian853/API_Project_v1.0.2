const User      = require('../models/user.model');
const bcryptjs  = require('bcryptjs');

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