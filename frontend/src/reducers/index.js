import { combineReducers } from 'redux';
import web3 from './web3';
import contracts from './contracts';
import companies from './companies';
import menu from './menu';

export default combineReducers({
  web3,
  contracts,
  companies,
  menu,
});