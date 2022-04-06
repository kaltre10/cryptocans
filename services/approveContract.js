const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const privateKey = "1a025e50c6ba6783083a708e8bf572bf1162e94f45204d3ce105e635f6d2aa61";
const rpcurl = "https://speedy-nodes-nyc.moralis.io/e00858622bcd980632329c43/bsc/testnet";
const abi = require('./abi.json');
const contractAddress = "0x6B396D7841426EDd2a1aD72d60E94C6F7beA573d";
const walletOwner = "0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da";

async function start(amount, walletUser){
  const provider = new Provider(privateKey, rpcurl);
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, contractAddress)
  contract.methods.approve(walletUser, web3.utils.toWei(amount.toString(), "ether"))
  .send({
    from: walletOwner
    // gas: 25e6,
    // gasPrice: 20e9
    // }, (error, transactionHash) => console.log(transactionHash))
    }, (error, transactionHash) => {response: "Hola1"})
    // .on('error', error => { })
    // .on('transactionHash', transactionHash => console.log(transactionHash))
    // .on('receipt', receipt => receipt)
    // .on('confirmation', (confirmationNumber) => {
    //   console.log(confirmationNumber)
    //   if(confirmationNumber >= 10){
    //     return confirmationNumber;
    //   }
    // })
    // .then( newContractInstance => {

        // console.log(newContractInstance.options.address)
    // })
    // .then(res => console.log(JSON.stringify(res)))
    .then(res => {response: "Hola2"})
    .catch(error => console.log(error));
}
module.exports = start;