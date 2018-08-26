pragma solidity ^0.4.24;

import './UpdatableProxyData.sol';
import './CompanyHeader.sol';


/// @title CompanyDataInternal
/// @dev The CompanyDataInternal holds definition of all data variables
/// of the proxying contract. All variables have `internal` visibility
/// so as to not appear on the proxying contract.
contract CompanyDataInternal is UpdatableProxyData, CompanyHeader {

    bool internal isEmergency;
    uint internal balance;
    uint internal rewardsToBePaid;
    string internal name;
    string internal ipfsHash;
    bytes32[] internal openedJobOffersList;
    bytes32[] internal closedJobOffersList;
    mapping(bytes32 => JobOffer) internal openedJobOffers;
    mapping(bytes32 => JobOffer) internal closedJobOffers;

}

