import {create,hashMessage} from 'web3-eth-accounts';

const account = create();
const result = hashMessage("Test Message");


console.log('account',account);