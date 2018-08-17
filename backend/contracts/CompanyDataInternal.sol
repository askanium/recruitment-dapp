pragma solidity ^0.4.24;

import './UpdatableProxyData.sol';
import './CompanyHeader.sol';


contract CompanyDataInternal is UpdatableProxyData, CompanyHeader {

    uint internal balance;
    uint internal rewardsToBePaid;
    string internal name;
    string internal ipfsHash;
    bytes32[] internal openedJobOffersList;
    bytes32[] internal closedJobOffersList;
    mapping(bytes32 => JobOffer) internal openedJobOffers;
    mapping(bytes32 => JobOffer) internal closedJobOffers;

}

