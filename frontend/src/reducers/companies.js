import CompanyABI from "../contracts/Company";

export const CONTRACTS_RECEIVED = 'contracts/CONTRACTS_RECEIVED';
export const COMPANY_DETAILS_RECEIVED = 'companies/COMPANY_DETAILS_RECEIVED';
export const COMPANY_IPFS_DETAILS_RECEIVED = 'companies/COMPANY_IPFS_DETAILS_RECEIVED';
export const COMPANY_SELECTED = 'companies/COMPANY_SELECTED';
export const JOB_OFFER_DETAILS_RECEIVED = 'companies/JOB_OFFER_DETAILS_RECEIVED';
export const JOB_OFFER_IPFS_DETAILS_RECEIVED = 'companies/JOB_OFFER_IPFS_DETAILS_RECEIVED';
export const BALANCE_RECEIVED = 'companies/BALANCE_RECEIVED';

const initialState = {
  nrOfCompanies: 0,
  companies: {},
  selectedCompany: null,
  selectedCompanyContractInstance: null
};

export default (state = initialState, action) => {
  let company;
  let jobOffer;

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
        numberOfOffers: action.companyDetails[3].toNumber(),
        owner: action.companyDetails[4],
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
      const jobOffers = Object.assign({}, state.companies[action.companyAddress].jobOffers, {[jobOffer.hash]: jobOffer});
      company = Object.assign({}, state.companies[action.companyAddress], {jobOffers});

      return {
        ...state,
        companies: Object.assign({}, state.companies, {[company.address]: company}),
        selectedCompany: Object.assign({}, company, state.selectedCompany),
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
        approvedApplicant: action.jobOfferDetails[9]
      };
      const selectedCompany = Object.assign({}, state.selectedCompany);
      selectedCompany.jobOffers[jobOffer.hash] = jobOffer;
      selectedCompany.frozenBalance += jobOffer.rewardInWei;

      return {
        ...state,
        selectedCompany
      };

    case COMPANY_SELECTED:
      return {
        ...state,
        selectedCompany: state.companies[action.companyAddress],
        selectedCompanyContractInstance: window.web3.eth.contract(CompanyABI.abi).at(action.companyAddress)
      };

    case BALANCE_RECEIVED:
      return {
        ...state,
        selectedCompany: Object.assign({}, state.selectedCompany, {availableBalance: action.balance})
      };

    default:
      return state
  }
}
