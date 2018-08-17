import {CONTRACTS_RECEIVED, CONTRACTS_REQUESTED} from "../reducers/contracts";

export const requestNrOfCompaniesAction = () => {
  return dispatch => {
    dispatch({
      type: CONTRACTS_REQUESTED
    });
  }
};

export const receiveNrOfCompaniesAction = (nrOfCompanies) => {
  return dispatch => {
    dispatch({
      type: CONTRACTS_RECEIVED,
      nrOfCompanies: nrOfCompanies.c[0]
    });
  }
};
