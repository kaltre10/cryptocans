const jwt = require('jsonwebtoken');
const response = require('../network/response');

const sign = async (data) => {
    return jwt.sign({data}, 'secret');
}

const check = {
    owner: (req, res, owner) => {
        const decoded = decodeHeader(req);
        if(req.user.data !== owner) response.error(req, res, "You don't have permissions", 401); 
    },

    logged: (req) => {
        const decoded = decodeHeader(req);
    }
}

const verify = (token) => {
    return jwt.verify(token.toString(), 'secret');
}

const getToken = (authorization) => {
    if(!authorization) throw 'Token Vacio';
    if(authorization.indexOf('Bearer ') === -1 ) throw 'token Invalid';
    return authorization.replace('Bearer ', '');
}


const decodeHeader = req => {
    const authorization = req.headers.authorization;
    const token = getToken(authorization);
    const decoded = verify(token);
    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check
};