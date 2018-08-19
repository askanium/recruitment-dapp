pragma solidity ^0.4.24;

import './Company2DataInternal.sol';
import './CompanyProxy.sol';


contract Company2Proxy is CompanyProxy, Company2DataInternal {

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
