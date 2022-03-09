const success = (req, res, message, status) => {
    res.status(status).json({
        response: message,
    });
}

const error = (req, res, message, status) => {
    res.status(status).json({
        error: message
    });
}
module.exports = { 
    success, 
    error
}