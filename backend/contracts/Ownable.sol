pragma solidity ^0.4.24;

import './OwnableData.sol';


/// @title Ownable
/// @dev The Ownable contract inherits from OwnableData and provides
/// a function to change ownership of the contract that will inherit from it.
contract Ownable is OwnableData {

    /// @dev Changes the owner address.
    /// @notice Renouncing to ownership will leave the contract without an owner.
    /// It will not be possible to call the functions with the `onlyOwner`
    /// modifier anymore.
    function setOwner(address newOwner)
        public
        onlyOwner
    {
        owner = newOwner;
    }
}
