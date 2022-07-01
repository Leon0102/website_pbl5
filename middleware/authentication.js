const User = require('../models/User');
const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');


const auth = async (req, res, next) => {
    // Check header
    // const authHeader = req.headers['authorization'];
    // console.log(authHeader)
    // if(!authHeader || !authHeader.startsWith('Bearer')) {
    //     throw new UnauthenticatedError('Missing authorization header');
    // }
    const token = req.cookies['jwt'];
    // console.log(token);
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes

        const user = User.findById(payload.id).select('-password');
        req.user = user;

        req.user = {userId:payload.userId,name:payload.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Invalid token');
    }
}

module.exports = auth;