require('dotenv').config({ path: '.env' });

const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const privateKey = process.env.PRIVATE_KEY;
const rpcurl = "https://speedy-nodes-nyc.moralis.io/e00858622bcd980632329c43/bsc/testnet"; 
const abi = require('./abi.json');
const contractAddress = "0x829Ac5026C3A86c55fa17C98046f6fE039dC2844";
const walletOwner = "0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da";
const walletFee = "0x0b18947426e74500dc0e96312A02E410d961a91E";

async function start(amount, walletUser, feePercent) {
  const provider = new Provider(privateKey, rpcurl);
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, contractAddress)
  const gas = web3.utils.toWei("0.0002", "gwei")
  const gasPrice = web3.utils.toWei("18", "gwei")
  try {
    const _ammount = await web3.utils.toWei(amount.toString(), "ether")
    const _feePercent = await web3.utils.toWei(feePercent.toString(), "ether")
    const res = await contract.methods.approveCaller(walletUser, _ammount).send({ from: walletOwner, gas , gasPrice })
    if(res.status == true){
      await contract.methods.transferCaller(walletFee, _feePercent).send({ from: walletOwner, gas , gasPrice })
    }
    return res
  } catch (error) {
    console.log(error)
    return error
  }

}
module.exports = start;