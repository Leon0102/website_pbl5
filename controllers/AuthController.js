const User = require('../models/User');
const Employee = require('../models/Employee');

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res, next) => {
    const user = await User.create({ ...req.body });
    if(!user) {
        return next(new BadRequestError('User already exists'));
    }
    if(length(req.body.password) <8) {
        return next(new BadRequestError('Password must be at least 8 characters long'));
    }
    res.status(StatusCodes.OK).redirect('/login');
}

const login_form = async (req, res, next) => {
    res.clearCookie('jwt');
    return res.status(StatusCodes.OK).render('register-login/login', { showTitle: true });
}

const register_form = async (req, res, next) => {
    res.status(StatusCodes.OK).render('register-login/register', { showTitle: true });
}

const login = async (req, res, next) => {
    const emp = await Employee.find({});
    empObject = emp.map(emp => emp.toObject());
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Missing required fields');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials');
    }
    // compare password
    const token = user.createJWT();
    const userObj = user.toObject();
    // res.status(StatusCodes.OK).json({user,token,empObject});
    res.cookie('jwt', token, { 
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.cookie('user', userObj.name, {false: true });
    return res.redirect('/home');
}

module.exports = {
    register,
    login,
    login_form,
    register_form
}
