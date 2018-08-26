pragma solidity ^0.4.24;


/// @title OwnableData
/// @dev Defines the onlyOwner modifier and sets the owner upon initialization.
contract OwnableData {

    /// @dev Modifier to check if the function was invoked by the owner.
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    address internal owner;

    /// @dev Set the owner of the contract to the passed in _owner variable.
    constructor(address _owner)
        public
    {
        owner = _owner;
    }
}
