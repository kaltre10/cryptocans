const ModelUser = require('../user/model');

const addTicketUser = async (wallet, amount) => ModelUser.findOneAndUpdate({wallet}, { ticket: amount } , { new: true });

module.exports = {
    add: addTicketUser
};