const success = (req, res, message, status) => {
    res.status(status).json({
        message
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