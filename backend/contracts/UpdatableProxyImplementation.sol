pragma solidity ^0.4.24;

import './OwnableData.sol';
import './UpdatableProxyShared.sol';


contract UpdatableProxyImplementation is UpdatableProxyShared {
    constructor() public OwnableData(0) {}
}
