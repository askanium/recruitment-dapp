pragma solidity ^0.4.24;

import './ProxyData.sol';


/**
 * @title Proxy
 * @dev The Proxy contract has a proxied address, and delegates all calls to that address.
 */
contract Proxy is ProxyData {

    constructor(address _proxied) public payable {
        proxied = _proxied;
    }

    /// @dev EIP 897 method
    function implementation() public view returns (address) {
        return proxied;
    }

    /// @dev EIP 897 method
    function proxyType() public pure returns (uint256) {
        return 1; // for "forwarding proxy"
                  // see EIP 897 for more details
    }

    /// @dev Proxies the call to the implementation contract
    function () public payable {
        bool success = proxied.delegatecall(msg.data);
        assembly {
            let freememstart := mload(0x40)
            returndatacopy(freememstart, 0, returndatasize())
            switch success
            case 0 { revert(freememstart, returndatasize()) }
            default { return(freememstart, returndatasize()) }
        }
    }
}
