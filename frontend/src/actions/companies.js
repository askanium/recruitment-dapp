import {
  COMPANY_DETAILS_RECEIVED,
  COMPANY_IPFS_DETAILS_RECEIVED,
  COMPANY_SELECTED,
  JOB_OFFER_DETAILS_RECEIVED,
  JOB_OFFER_IPFS_DETAILS_RECEIVED,
  BALANCE_RECEIVED,
} from "../reducers/companies";

export const receiveCompanyDetails = (companyDetails) => {
  return dispatch => {
    dispatch({
      type: COMPANY_DETAILS_RECEIVED,
      companyDetails
    });
  }
};

export const receiveCompanyIPFSDetails = (companyAddress, ipfsDetails) => {
  return dispatch => {
    dispatch({
      type: COMPANY_IPFS_DETAILS_RECEIVED,
      companyAddress,
      ipfsDetails
    });
  }
};

export const receiveJobOfferIPFSDetails = (companyAddress, jobOfferHash, ipfsDetails) => {
  return dispatch => {
    dispatch({
      type: JOB_OFFER_IPFS_DETAILS_RECEIVED,
      companyAddress,
      jobOfferHash,
      ipfsDetails
    });
  }
};

export const receiveJobOfferDetails = (jobOfferHash, jobOfferDetails) => {
  return dispatch => {
    dispatch({
      type: JOB_OFFER_DETAILS_RECEIVED,
      jobOfferDetails,
      jobOfferHash
    });
  }
};

export const selectCompany = (companyAddress) => {
  return dispatch => {
    dispatch({
      type: COMPANY_SELECTED,
      companyAddress
    });
  }
};

export const receiveCompanyBalance = (balance) => {
  return dispatch => {
    dispatch({
      type: BALANCE_RECEIVED,
      balance
    });
  }
};
