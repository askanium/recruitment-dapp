pragma solidity ^0.4.24;

import './ProxyData.sol';
import './OwnableData.sol';


/// @title UpdatableProxyData
/// @dev Needed to align storage spaces of proxied and owner variables.
contract UpdatableProxyData is ProxyData, OwnableData {}
