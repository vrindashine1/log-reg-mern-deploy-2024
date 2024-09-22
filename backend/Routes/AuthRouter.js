const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router=require('express').Router();

router.post('/login',loginValidation,login)
//signupValidation check req valid then call signup
router.post('/signup',signupValidation,signup)


module.exports=router;