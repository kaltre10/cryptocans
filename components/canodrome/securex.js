const securex = require('../../services/securex');

module.exports = check = (action) => {
    const middleware = (req, res, next) => {

        let tokenWallet = (req.user.data).toLowerCase();

        switch(action){
            case 'validate':

                const wallet = (req.query.wallet).toLowerCase();
                
                if(wallet){
                    if(wallet != tokenWallet) throw 'Not authorized';
                }
                
                next();
                break;

            case 'validatePost':

                let walletBody = (req.body.wallet).toLowerCase();

                if(walletBody != tokenWallet) throw 'Not authorized';
                
                next();
                break;

            case 'validatePath':

                let walletPath = (req.body.can.wallet).toLowerCase();

                if(walletPath != tokenWallet) throw 'Not authorized';
                
                next();
                break;

            case 'validateSell':

                if((req.body.canodrome.wallet).toLowerCase() != tokenWallet) throw 'Not authorized';
                
                next();
                break;
    
            default:
                next();
        }
    }

    return middleware;
}