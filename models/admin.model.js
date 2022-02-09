const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullName_Admin : {
        type: String,
        required: true,
    },
    adminID : {
        type: String,
        required: true,
    },
    userID_Admin: {
        type : String,
        required : true
    },
    username_Admin: {
        type : String,
        required : true,
    },
    pwd_Admin: {
        type : String,
        required : true,
    },
    level_Admin: {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('Admin', adminSchema);