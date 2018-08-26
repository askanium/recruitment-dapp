pragma solidity ^0.4.24;

import './OwnableData.sol';
import './UpdatableProxyShared.sol';


/// @title UpdatableProxyImplementation
/// @dev Inherits from ProxyShared and sets the ownership to 0x0 address
/// so that nobody can alter the implementation contract.
contract UpdatableProxyImplementation is UpdatableProxyShared {
    constructor() public OwnableData(0) {}
}
