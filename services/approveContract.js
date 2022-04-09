const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const privateKey = "1a025e50c6ba6783083a708e8bf572bf1162e94f45204d3ce105e635f6d2aa61";
const rpcurl = "https://speedy-nodes-nyc.moralis.io/e00858622bcd980632329c43/bsc/testnet";
const abi = require('./abi.json');
const contractAddress = "0xDD4f413f98dD8Bf8cABc9877156aE2B5108f1397";
const walletOwner = "0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da";

async function start(amount, walletUser) {
  const provider = new Provider(privateKey, rpcurl);
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, contractAddress)
  const gas = web3.utils.toWei("0.00015", "gwei")
  const gasPrice = web3.utils.toWei("15", "gwei")
  try {
    const _ammount = await web3.utils.toWei(amount, "ether")
    // const res = await contract.methods.approve(walletUser, _ammount).send({ from: walletOwner, gas , gasPrice })
    const res = await contract.methods.approveCaller(walletUser, _ammount).send({ from: walletOwner, gas , gasPrice })
    return res
  } catch (error) {
    return error
  }

}
module.exports = start;