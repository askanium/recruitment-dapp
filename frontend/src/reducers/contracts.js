import {WEB3_INITIALIZED} from "./web3";
import CompanyFactory from "../contracts/CompanyFactory";
import CompanyUpdater from "../contracts/CompanyUpdater";
import {DEPLOYED_COMPANY_FACTORY_ADDRESS, DEPLOYED_COMPANY_UPDATER_ADDRESS} from "../constants";

export const CONTRACTS_REQUESTED = 'contracts/CONTRACTS_REQUESTED';
export const CONTRACTS_RECEIVED = 'contracts/CONTRACTS_RECEIVED';

const initialState = {
  deployedFactoryAddress: DEPLOYED_COMPANY_FACTORY_ADDRESS,
  deployedUpdaterAddress: DEPLOYED_COMPANY_UPDATER_ADDRESS,
  deployedFactoryInstance: null,
  deployedUpdaterInstance: null,
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
      const updater = window.web3.eth.contract(CompanyUpdater.abi);

      return {
        ...state,
        deployedFactoryInstance: contract.at(state.deployedFactoryAddress),
        deployedUpdaterInstance: updater.at(state.deployedUpdaterAddress),
      };

    default:
      return state
  }
}
