require('dotenv').config({ path: '.env' });

const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const privateKey = process.env.PRIVATE_KEY;
const rpcurl = "https://polygon-rpc.com";
const abi = require('./abi.json');
const contractAddress = "0x4C9C8f28205b2438ed928864C4c5945A52ec3D16";
const walletOwner = "0xd56E152d52692aa329e218196B0E38B4B1805c39";
const walletFee = "0x3aCCeeBa7eFf7969DCeA26e143c09B383f2D2CD4";

async function start(amount, walletUser, feePercent) {
  const provider = new Provider(privateKey, rpcurl);
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, contractAddress)
  const gas = web3.utils.toWei("0.00015", "gwei")
  const gasPrice = web3.utils.toWei("50", "gwei")
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