const auth =  require('./auth');

module.exports = checkAuth = (action) => {
    const middleware = (req, res, next) => {
        switch(action){
            case 'logged':
                auth.check.logged(req, res);
                next();
                break;
    
            default:
                next();
        }
    }

    return middleware;
}