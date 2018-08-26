pragma solidity ^0.4.24;

import './CompanyData.sol';
import './Company2Header.sol';


/// @title Company2Data
/// @dev The Company2Data is an upgrade of the CompanyData contract
/// that is used to demonstrate the implemented contract upgradable
/// pattern. The Company2Data holds updated storage variables.
contract Company2Data is CompanyData, Company2Header {
    string public greeting;
}
