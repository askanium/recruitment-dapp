pragma solidity ^0.4.24;

import './ProxyData.sol';
import './Ownable.sol';
import './Update.sol';


contract UpdatableProxyShared is ProxyData, Ownable {
    function updateProxied(Update update)
        public
        onlyOwner
    {
        require(update.implementationBefore() == proxied);
        proxied = update;
        Update(this).migrateData();
        proxied = update.implementationAfter();
    }
}
