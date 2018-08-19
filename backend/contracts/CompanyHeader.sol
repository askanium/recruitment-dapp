pragma solidity ^0.4.24;

import './SafeMath.sol';


contract CompanyHeader {

    using SafeMath for uint;

    event JobOfferCreated(string _companyName, string _jobTitle);
    event JobOfferUpdated(string _companyName, string _jobTitle);
    event JobOfferPublished(string _companyName, string _jobTitle);
    event JobOfferReceivedApplication(string _companyName, string _jobTitle, address indexed _applicant);
    event JobOfferClosed(string _companyName, string _jobTitle);
    event JobOfferCovered(string _companyName, string _jobTitle, address indexed _applicant);

    enum Domains { IT, MARKETING, SALES, FINANCE }

    struct JobOffer {
        bool isOpen;
        bool isPublished;
        uint32 salaryRangeMin;
        uint32 salaryRangeMax;
        uint rewardInWei;
        Domains domain;
        string title;
        string jobDescription;
        address approvedApplicant;
        mapping (address => string) applicants;
        address[] applicantsList;
    }
}
