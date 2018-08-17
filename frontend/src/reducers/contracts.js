import {WEB3_INITIALIZED} from "./web3";
import CompanyFactory from "../contracts/CompanyFactory";

export const CONTRACTS_REQUESTED = 'contracts/CONTRACTS_REQUESTED';
export const CONTRACTS_RECEIVED = 'contracts/CONTRACTS_RECEIVED';

const initialState = {
  deployedFactoryAddress: '0xeac51ce3155c8bed3ebcf33dd62b3ad27d36da05',
  deployedFactoryInstance: null,
  deployedFactoryLogSubscription: null,
  isQueryingNode: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTRACTS_REQUESTED:
      return {
        ...state,
        isQueryingNode: true
      };

    case CONTRACTS_RECEIVED:
      return {
        ...state,
        isQueryingNode: false
      };

    case WEB3_INITIALIZED:
      const contract = window.web3.eth.contract(CompanyFactory.abi);

      return {
        ...state,
        deployedFactoryInstance: contract.at(state.deployedFactoryAddress),
        // deployedFactoryLogSubscription: window.web3.eth.subscribe('logs', {
        //   address: state.deployedFactoryAddress,
        //   topics: [null, null]
        // }, (error, result) => {
        //   if (!error) console.log('triggered callback. received result:', result);
        // })
        // .on('data', (log) => console.log('triggered "data" event. received: ', log))
        // .on('changed', (log) => {
        //   console.log(`Changed: ${log}`)
        // })
        // .on('error', (log) => {
        //   console.log(`error:  ${log}`)
        // })
      };

    default:
      return state
  }
}
