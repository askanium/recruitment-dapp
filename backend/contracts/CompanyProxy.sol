pragma solidity ^0.4.24;

import './Proxy.sol';
import './CompanyDataInternal.sol';
import './UtilsLib.sol';


/// @title CompanyProxy
/// @dev This is what gets deployed by the CompanyFactory. It proxies all
/// calls to whatever the _proxied address points to.
contract CompanyProxy is Proxy, CompanyDataInternal {

    using UtilsLib for string;

    /// @dev Call the constructor of Proxy and OwnableData, do the corresponding
    /// safety checks and initialize data.
    constructor (
        address _proxied,
        address _owner,
        string _name,
        string _ipfsHash
    )
        public
        Proxy(_proxied) OwnableData(_owner)
    {
        // If the address where the contract is going to be
        // deployed is non-zero, revert contract creation.
        require(address(this).balance == 0);

        // In order to not have huge gas prices for contract
        // deployment, limit the length of the company name
        // variable to 32 bytes.
        require(_name.utfStringLength(true) <= 32 && _ipfsHash.utfStringLength(true) <= 46);

        name = _name;
        ipfsHash = _ipfsHash;
        balance = 0;
        rewardsToBePaid = 0;
    }
}
