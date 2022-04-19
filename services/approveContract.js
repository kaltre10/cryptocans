require('dotenv').config({ path: '.env' });

const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const privateKey = process.env.PRIVATE_KEY;
const rpcurl = "https://bsc-dataseed.binance.org/";
const abi = require('./abi.json');
const contractAddress = "0x693f8Ea857f5D71825Dd03E598931b3E48dC5a95";
const walletOwner = "0x20a4DaBC7C80C1139Ffc84C291aF4d80397413Da";
const walletFee = "0x0b18947426e74500dc0e96312A02E410d961a91E";

async function start(amount, walletUser, feePercent) {
  const provider = new Provider(privateKey, rpcurl);
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, contractAddress)
  const gas = web3.utils.toWei("0.00015", "gwei")
  const gasPrice = web3.utils.toWei("15", "gwei")
  try {
    const _ammount = await web3.utils.toWei(amount.toString(), "ether")
    const _feePercent = await web3.utils.toWei(feePercent.toString(), "ether")
    // const res = await contract.methods.approve(walletUser, _ammount).send({ from: walletOwner, gas , gasPrice })

    const res = await contract.methods.approveCaller(walletUser, _ammount).send({ from: walletOwner, gas , gasPrice })

    if(res.status == true){
      const fee = await contract.methods.transferCaller(walletFee, _feePercent).send({ from: walletOwner, gas , gasPrice })
    }

    return res
  } catch (error) {
    return error
  }

}
module.exports = start;