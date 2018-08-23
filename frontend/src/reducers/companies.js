import CompanyABI from "../contracts/Company";

export const CONTRACTS_RECEIVED = 'contracts/CONTRACTS_RECEIVED';
export const COMPANY_DETAILS_RECEIVED = 'companies/COMPANY_DETAILS_RECEIVED';
export const COMPANY_IPFS_DETAILS_RECEIVED = 'companies/COMPANY_IPFS_DETAILS_RECEIVED';
export const COMPANY_SELECTED = 'companies/COMPANY_SELECTED';
export const JOB_OFFER_DETAILS_RECEIVED = 'companies/JOB_OFFER_DETAILS_RECEIVED';
export const JOB_OFFER_IPFS_DETAILS_RECEIVED = 'companies/JOB_OFFER_IPFS_DETAILS_RECEIVED';
export const BALANCE_RECEIVED = 'companies/BALANCE_RECEIVED';
export const JOB_OFFER_PUBLISHED = 'companies/JOB_OFFER_PUBLISHED';
export const APPLICATION_RECEIVED = 'companies/APPLICATION_RECEIVED';
export const APPLICANTS_RECEIVED = 'companies/APPLICANTS_RECEIVED';
export const APPROVE_APPLICANT = 'companies/APPROVE_APPLICANT';
export const CLOSE_JOB_OFFER = 'companies/CLOSE_JOB_OFFER';
export const JOB_OFFER_CREATED = 'companies/JOB_OFFER_CREATED';

const initialState = {
  nrOfCompanies: 0,
  companies: {},
  selectedCompany: null,
  selectedCompanyContractInstance: null
};

export default (state = initialState, action) => {
  let company;
  let jobOffer;
  let jobOffers;

  switch (action.type) {
    case CONTRACTS_RECEIVED:
      return {
        ...state,
        nrOfCompanies: action.nrOfCompanies
      };

    case COMPANY_DETAILS_RECEIVED:
      company = {
        address: action.companyDetails[0],
        name: action.companyDetails[1],
        ipfsHash: action.companyDetails[2],
        numberOfOpenedOffers: action.companyDetails[3].toNumber(),
        numberOfClosedOffers: action.companyDetails[4].toNumber(),
        owner: action.companyDetails[5],
        jobOffers: {},
        availableBalance: 0,
        frozenBalance: 0,
      };
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case COMPANY_IPFS_DETAILS_RECEIVED:
      company = Object.assign({}, state.companies[action.companyAddress], action.ipfsDetails);

      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case JOB_OFFER_IPFS_DETAILS_RECEIVED:
      jobOffer = Object.assign({}, state.companies[action.companyAddress].jobOffers[action.jobOfferHash], {jobDescription: action.ipfsDetails});
      jobOffers = Object.assign({}, state.companies[action.companyAddress].jobOffers, {[jobOffer.hash]: jobOffer});
      company = Object.assign({}, state.companies[action.companyAddress], {jobOffers: jobOffers});

      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company}),
      };

    case JOB_OFFER_DETAILS_RECEIVED:
      jobOffer = {
        hash: action.jobOfferHash,
        title: action.jobOfferDetails[0],
        jobDescriptionIPFSHash: action.jobOfferDetails[1],
        jobDescription: '',
        salaryRangeMin: action.jobOfferDetails[2].toNumber(),
        salaryRangeMax: action.jobOfferDetails[3].toNumber(),
        rewardInWei: action.jobOfferDetails[4].toNumber(),
        domain: action.jobOfferDetails[5].toNumber(),
        nrOfApplicants: action.jobOfferDetails[6].toNumber(),
        isOpen: action.jobOfferDetails[7],
        isPublished: action.jobOfferDetails[8],
        approvedApplicant: action.jobOfferDetails[9],
        applicants: {}
      };
      jobOffers = Object.assign({}, state.companies[state.selectedCompany].jobOffers, {[jobOffer.hash]: jobOffer});
      company = Object.assign({}, state.companies[state.selectedCompany], {jobOffers: jobOffers});

      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case COMPANY_SELECTED:
      return {
        ...state,
        selectedCompany: action.companyAddress,
        selectedCompanyContractInstance: window.web3.eth.contract(CompanyABI.abi).at(action.companyAddress)
      };

    case BALANCE_RECEIVED:
      company = Object.assign({}, state.companies[state.selectedCompany], {availableBalance: action.balance});
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case JOB_OFFER_PUBLISHED:
      jobOffer = Object.assign({}, state.companies[action.companyAddress].jobOffers[action.jobOfferHash], {isPublished: true});
      jobOffers = Object.assign({}, state.companies[action.companyAddress].jobOffers, {[jobOffer.hash]: jobOffer});
      company = Object.assign({}, state.companies[action.companyAddress], {jobOffers: jobOffers});
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case APPLICATION_RECEIVED:
      jobOffer = Object.assign({}, state.companies[action.companyAddress].jobOffers[action.jobOfferHash], {applicants: {[action.applicant]: action.ipfsHash}});
      jobOffer.nrOfApplicants += 1;
      jobOffers = Object.assign({}, state.companies[action.companyAddress].jobOffers, {[jobOffer.hash]: jobOffer});
      company = Object.assign({}, state.companies[action.companyAddress], {jobOffers: jobOffers});
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case APPLICANTS_RECEIVED:
      const applicants = {};
      action.applicants.forEach(applicant => applicants[applicant] = true);

      jobOffer = Object.assign({}, state.companies[action.companyAddress].jobOffers[action.jobOfferHash], {applicants: applicants});
      jobOffer.nrOfApplicants = Object.keys(jobOffer.applicants).length;
      jobOffers = Object.assign({}, state.companies[action.companyAddress].jobOffers, {[jobOffer.hash]: jobOffer});
      company = Object.assign({}, state.companies[action.companyAddress], {jobOffers: jobOffers});
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case APPROVE_APPLICANT:
      jobOffer = Object.assign({}, state.companies[action.companyAddress].jobOffers[action.jobOfferHash], {approvedApplicant: action.applicant});
      jobOffers = Object.assign({}, state.companies[action.companyAddress].jobOffers, {[jobOffer.hash]: jobOffer});
      company = Object.assign({}, state.companies[action.companyAddress], {jobOffers: jobOffers});
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case CLOSE_JOB_OFFER:
      jobOffers = Object.assign({}, state.companies[action.companyAddress].jobOffers);
      delete jobOffers[action.jobOfferHash];
      company = Object.assign({}, state.companies[action.companyAddress], {jobOffers: jobOffers});
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    case JOB_OFFER_CREATED:
      company = Object.assign({}, state.companies[action.companyAddress]);
      company.numberOfOpenedOffers += 1;
      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company})
      };

    default:
      return state
  }
}
