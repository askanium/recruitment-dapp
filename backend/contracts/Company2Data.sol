pragma solidity ^0.4.24;

import './CompanyData.sol';
import './Company2Header.sol';


contract Company2Data is CompanyData, Company2Header {
    string public greeting;
}
