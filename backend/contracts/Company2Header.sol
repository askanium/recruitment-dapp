pragma solidity ^0.4.24;

import './CompanyHeader.sol';


contract Company2Header is CompanyHeader {
    event EmergencyStatusUpdate(bool _status);
}
