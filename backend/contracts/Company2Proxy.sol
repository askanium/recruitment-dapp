pragma solidity ^0.4.24;

import './Company2DataInternal.sol';
import './CompanyProxy.sol';


/// @title Company2Proxy
/// @dev The Company2Proxy is an upgrade of the CompanyProxy contract
/// that is used to demonstrate the implemented contract upgradable
/// pattern. The Company2Proxy holds updated constructor behavior.
contract Company2Proxy is CompanyProxy, Company2DataInternal {

    /// @dev Initialize the Company2Proxy by calling the CompanyProxy
    /// and additionally, instantiate the `greeting` variable with the
    /// value.
    constructor (
        address _proxied,
        address _owner,
        string _name,
        string _ipfsHash
    )
        public
        CompanyProxy(_proxied, _owner, _name, _ipfsHash)
    {
        greeting = "Welcome!";
    }
}
