pragma solidity ^0.4.24;

import './UpdatableProxyData.sol';
import './CompanyHeader.sol';


contract CompanyData is UpdatableProxyData, CompanyHeader {

    bool public isEmergency;
    uint public balance;
    uint public rewardsToBePaid;
    string public name;
    string public ipfsHash;
    bytes32[] public openedJobOffersList;
    bytes32[] public closedJobOffersList;
    mapping(bytes32 => JobOffer) public openedJobOffers;
    mapping(bytes32 => JobOffer) public closedJobOffers;

}

