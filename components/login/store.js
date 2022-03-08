const Model = require('../user/model');

const login = wallet => {
    Model.find(),(err, res) => {
        console.log(err);
      };
}

module.exports = {
    login
}