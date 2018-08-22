import {
  COMPANY_DETAILS_RECEIVED,
  COMPANY_IPFS_DETAILS_RECEIVED,
  COMPANY_SELECTED,
  JOB_OFFER_DETAILS_RECEIVED,
  JOB_OFFER_IPFS_DETAILS_RECEIVED,
  BALANCE_RECEIVED,
  JOB_OFFER_PUBLISHED,
  APPLICATION_RECEIVED,
  APPLICANTS_RECEIVED,
  APPROVE_APPLICANT,
  CLOSE_JOB_OFFER,
  JOB_OFFER_CREATED,
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

export const publishJobOfferAction = (companyAddress, jobOfferHash) => {
  return dispatch => {
    dispatch({
      type: JOB_OFFER_PUBLISHED,
      companyAddress,
      jobOfferHash
    });
  }
};

export const applyToJobOfferAction = (companyAddress, jobOfferHash, applicant, ipfsHash) => {
  return dispatch => {
    dispatch({
      type: APPLICATION_RECEIVED,
      companyAddress,
      jobOfferHash,
      applicant,
      ipfsHash
    });
  }
};

export const applicantsListReceivedAction = (companyAddress, jobOfferHash, applicants) => {
  return dispatch => {
    dispatch({
      type: APPLICANTS_RECEIVED,
      companyAddress,
      jobOfferHash,
      applicants
    });
  }
};

export const approveApplicantAction = (companyAddress, jobOfferHash, applicant) => {
  return dispatch => {
    dispatch({
      type: APPROVE_APPLICANT,
      companyAddress,
      jobOfferHash,
      applicant
    });
  }
};

export const closeJobOfferAction = (companyAddress, jobOfferHash) => {
  return dispatch => {
    dispatch({
      type: CLOSE_JOB_OFFER,
      companyAddress,
      jobOfferHash
    });
  }
};

export const createJobOfferAction = (companyAddress) => {
  return dispatch => {
    dispatch({
      type: JOB_OFFER_CREATED,
      companyAddress,
    });
  }
};
