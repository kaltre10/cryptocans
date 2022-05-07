require('dotenv').config({ path: '.env' });

const { 
  PRIVATE_KEY,
  PRIVATE_KEY_TEST,
  NODO_TEST,
  NODO,
  NODE_ENV,
  CONTRACT_ADDRESS,
  CONTRACT_ADDRESS_TEST,
  WALLET_OWNER,
  WALLET_OWNER_TEST,
  WALLET_FEE,
  WALLET_FEE_TEST
} = process.env;

const privateKeyString = NODE_ENV === 'development' ? PRIVATE_KEY_TEST : PRIVATE_KEY;
const nodoString = NODE_ENV === 'development' ? NODO_TEST : NODO;
const contractAddressString = NODE_ENV === 'development' ? CONTRACT_ADDRESS_TEST : CONTRACT_ADDRESS;
const walletOwnerString = NODE_ENV === 'development' ? WALLET_OWNER_TEST : WALLET_OWNER;
const walletFeeString = NODE_ENV === 'development' ? WALLET_FEE_TEST : WALLET_FEE;

const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const privateKey = privateKeyString;
const rpcurl = nodoString; 
const abi = NODE_ENV === 'production' ? require('./abiTest.json') : require('./abi.json');

const contractAddress = contractAddressString;
const walletOwner = walletOwnerString;
const walletFee = walletFeeString;

async function start(amount, walletUser, feePercent) {
  const provider = new Provider(privateKey, rpcurl);
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(abi, contractAddress)
  const gas = web3.utils.toWei("0.00018", "gwei")
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