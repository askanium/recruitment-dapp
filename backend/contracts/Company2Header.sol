pragma solidity ^0.4.24;

import './CompanyHeader.sol';


/// @title Company2Header
/// @dev The Company2Header is an upgrade of the CompanyHeader contract
/// that is used to demonstrate the implemented contract upgradable
/// pattern. The Company2Header holds new contract variable, events and
/// structs declaration.
contract Company2Header is CompanyHeader {
    event EmergencyStatusUpdate(bool _status);
}
