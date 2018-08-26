pragma solidity ^0.4.24;

import './ProxyData.sol';
import './Ownable.sol';
import './Update.sol';


/// @title UpdatableProxyShared
/// @dev Updates the proxy of the deployed contracts according to the
/// Update interface, assuring that the update is made from a specific
/// type of contract to another specific type of contract, migrating and
/// initializing any new data in the process.
contract UpdatableProxyShared is ProxyData, Ownable {

    /// @dev Updates the CompanyProxy contract's proxied variable to
    /// point to a new implementation contract.
    /// @param update The contract that implements the Update interface.
    function updateProxied(Update update)
        public
        onlyOwner
    {
        // Assure that the update object "implementationBefore" is
        // a contract we want to update from.
        require(update.implementationBefore() == proxied);

        proxied = update;
        Update(this).migrateData();
        proxied = update.implementationAfter();
    }
}
