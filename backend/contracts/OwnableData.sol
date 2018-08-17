pragma solidity ^0.4.24;


contract OwnableData {
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    address internal owner;

    constructor(address _owner)
        public
    {
        owner = _owner;
    }
}
