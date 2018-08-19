pragma solidity ^0.4.24;

import './CompanyDataInternal.sol';
import './Company2Header.sol';


contract Company2DataInternal is CompanyDataInternal, Company2Header {
    string internal greeting;
}
