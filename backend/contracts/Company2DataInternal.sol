pragma solidity ^0.4.24;

import './CompanyDataInternal.sol';
import './Company2Header.sol';


/// @title Company2DataInternal
/// @dev The Company2DataInternal is an upgrade of the CompanyDataInternal
/// contract that is used to demonstrate the implemented contract upgradable
/// pattern. The Company2DataInternal holds updated storage variables of the
/// proxy contract.
contract Company2DataInternal is CompanyDataInternal, Company2Header {

    // The visibility is `internal` so as to not be displayed in
    // the proxy contract.
    string internal greeting;
}
