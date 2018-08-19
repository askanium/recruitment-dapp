pragma solidity ^0.4.24;

import './Company.sol';
import './Company2Data.sol';


contract Company2 is Company, Company2Data {

    /// @dev Function to set the newly added `greeting` contract
    /// variable.
    /// @notice This demonstrates how we can add new functionality
    /// to the upgradeable contract.
    function changeGreeting(string _greeting)
        external
        onlyOwner
        returns(bool)
    {
        greeting = _greeting;
        return true;
    }

    /// @dev Set emergency status and emit an event.
    /// @notice This demonstrates how we can override an existing
    /// function from Company contract and add modify its logic.
    function switchEmergency(bool _state) external onlyOwner {
        isEmergency = _state;

//        emit EmergencyStatusUpdate(_state);
    }

}
