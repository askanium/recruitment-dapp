export const RECEIVE_ACCOUNT = 'web3/RECEIVE_ACCOUNT';
export const CHANGE_ACCOUNT = 'web3/CHANGE_ACCOUNT';
export const WEB3_INITIALIZED = 'web3/WEB3_INITIALIZED';
export const METAMASK_ACCOUNT_CHANGED = 'web3/METAMASK_ACCOUNT_CHANGED';
export const BLOCK_NUMBER_RECEIVED = 'web3/BLOCK_NUMBER_RECEIVED';

const initialState = {
  latestEventBlockNumber: 0,
  ethAddress: null
};


export default (state = initialState, action) => {
  switch(action.type) {
    case RECEIVE_ACCOUNT:
      return {
        ...state,
        ethAddress: action.address
      };

    case CHANGE_ACCOUNT:
      return {
        ...state,
        ethAddress: action.address
      };

    case METAMASK_ACCOUNT_CHANGED:
      return {
        ...state,
        ethAddress: action.selectedAddress
      };

    case BLOCK_NUMBER_RECEIVED:
      return {
        ...state,
        latestEventBlockNumber: action.blockNumber
      };

    default:
      return state
  }
};