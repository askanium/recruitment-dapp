pragma solidity ^0.4.24;


/**
 * @title ProxyData
 * @dev The ProxyData contract has an internal proxied address, that is used to
 * align memory slots between proxy contract and implementation contract.
 */
contract ProxyData {
    address internal proxied;
}
