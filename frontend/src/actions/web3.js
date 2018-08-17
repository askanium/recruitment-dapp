import {METAMASK_ACCOUNT_CHANGED, WEB3_INITIALIZED, BLOCK_NUMBER_RECEIVED} from "../reducers/web3";

export const web3InitializedAction = () => {
  return dispatch => {
    dispatch({
      type: WEB3_INITIALIZED
    });
  }
};

export const metamaskChangeAccount = ({selectedAddress, networkVersion}) => {
  return dispatch => {
    dispatch({
      type: METAMASK_ACCOUNT_CHANGED,
      selectedAddress,
      networkVersion
    });
  }
};

export const receiveLatestBlockNumberAction = (blockNumber) => {
  return dispatch => {
    dispatch({
      type: BLOCK_NUMBER_RECEIVED,
      blockNumber
    });
  }
};
