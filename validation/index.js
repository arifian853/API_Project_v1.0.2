const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(404).json ({
            status : false,
            message: errors.array()[0].msg
        })
    }
    next();
}

exports.validationRegister = [
    check('fullName',`Name can not be empty`).notEmpty(),
    check('studentID',`Student ID can not be empty`).notEmpty(),
    check('userID',`UserID can not be empty`).notEmpty(),
    check('username',`Username can not be empty`).notEmpty(),
    check('pwd',`Password can not be empty`).notEmpty().isLength({min : 8}).withMessage('Password must be at least 8 characters long with combination of Word and Character'),
    check('level',`Level can not be empty`).notEmpty(),
]

exports.validationLogin = [
    check('fullName',`Name can not be empty`).notEmpty(),
    check('studentID',`Student ID can not be empty`).notEmpty(),
    check('userID',`UserID can not be empty`).notEmpty(),
    check('username',`Username can not be empty`).notEmpty(),
    check('pwd',`Password can not be empty`).notEmpty().isLength({min : 8}),
    check('level',`Level can not be empty`).notEmpty(),
]

exports.validationAdminReg = [
    check('fullName_Admin',`Name can not be empty`).notEmpty(),
    check('adminID',`Admin ID / NIP can not be empty`).notEmpty(),
    check('userID_Admin',`UserID can not be empty`).notEmpty(),
    check('username_Admin',`Username can not be empty`).notEmpty(),
    check('pwd_Admin',`Password can not be empty`).notEmpty().isLength({min : 8}).withMessage('Password must be at least 8 characters long with combination of Word and Character'),
    check('level_Admin',`Level can not be empty`).notEmpty(),
]

exports.validationAdminLogin = [
    check('fullName_Admin',`Name can not be empty`).notEmpty(),
    check('adminID',`Admin ID / NIP can not be empty`).notEmpty(),
    check('userID_Admin',`UserID can not be empty`).notEmpty(),
    check('username_Admin',`Username can not be empty`).notEmpty(),
    check('pwd_Admin',`Password can not be empty`).notEmpty().isLength({min : 8}).withMessage('Password must be at least 8 characters long with combination of Word and Character'),
    check('level_Admin',`Level can not be empty`).notEmpty(),
]
    
