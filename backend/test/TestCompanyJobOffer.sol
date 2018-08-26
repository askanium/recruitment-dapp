pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import 'truffle/DeployedAddresses.sol';
import '../contracts/Company.sol';
import '../contracts/CompanyFactory.sol';

contract TestCompanyJobOffer {
    // Truffle will send the TestCompany ten Ether after deploying the contract.
    uint public initialBalance = 3 ether;

    function testCreateJobOffer() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = cf.createCompany("A", "B");
        deployedCompany.deposit.value(2 ether)();

        (,,, uint _nrOfOpenedOffers,,) = deployedCompany.getCompanyDetails();
        Assert.equal(_nrOfOpenedOffers, uint(0), "Created company should not have any offers upon creation");
        deployedCompany.createJobOffer(1000, 2000, 1000000000, CompanyHeader.Domains.IT, "Web Dev", "JD");

        (,,, uint _newNrOfOpenedOffers,,) = deployedCompany.getCompanyDetails();
        Assert.equal(_newNrOfOpenedOffers, uint(1), "Created offer should increase Nr of offers available");
    }

    function testGetJobOfferFromOpenedOffers() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = Company(cf.companies(cf.getNrOfCompanies() - 1));
        bytes32 jobOfferHash = deployedCompany.openedJobOffersList(0);

        (string memory _title,
        string memory _jobDescription,
        uint _salaryRangeMin,
        uint _salaryRangeMax,
        uint _rewardInWei,
        Company.Domains _domain,
        uint _numberOfApplicants,
        bool _isOpen,
        bool _isPublished,
        address _approvedApplicant) = deployedCompany.getJobOffer(jobOfferHash);
        Assert.equal(_title, "Web Dev", "Job Offer title should be 'Web Dev'");
        Assert.equal(_jobDescription, "JD", "Job Offer description should be 'JD'");
        Assert.equal(_salaryRangeMin, uint(1000), "Job Offer min salary does not correspond");
        Assert.equal(_salaryRangeMax, uint(2000), "Job Offer max salary does not correspond");
        Assert.equal(_rewardInWei, uint(1000000000), "Job Offer reward does not correspond");
        Assert.equal(uint(_domain), uint(0), "Job Offer domain does not correspond");
        Assert.equal(_numberOfApplicants, uint(0), "Job Offer applicants does not correspond");
        Assert.equal(_isOpen, true, "Job Offer should be open");
        Assert.equal(_isPublished, false, "Job Offer should not be published");
        Assert.equal(_approvedApplicant, 0x0, "Job Offer should not be published");
    }

    function testUpdateJobOffer() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = Company(cf.companies(cf.getNrOfCompanies() - 1));
        bytes32 jobOfferHash = deployedCompany.openedJobOffersList(0);

        deployedCompany.updateJobOffer(jobOfferHash, uint32(2000), uint32(3000), "JD_v.2.0");

        (, string memory _jobDescription,
        uint _salaryRangeMin,
        uint _salaryRangeMax,,,,,,) = deployedCompany.getJobOffer(jobOfferHash);
        Assert.equal(_jobDescription, "JD_v.2.0", "Job Offer description should be 'JD_v.2.0'");
        Assert.equal(_salaryRangeMin, uint(2000), "Job Offer min salary does not correspond");
        Assert.equal(_salaryRangeMax, uint(3000), "Job Offer max salary does not correspond");
    }

    function testPublishJobOffer() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = Company(cf.companies(cf.getNrOfCompanies() - 1));
        bytes32 jobOfferHash = deployedCompany.openedJobOffersList(0);

        deployedCompany.publishJobOffer(jobOfferHash);

        (,,,,,,,, bool _isPublished,) = deployedCompany.getJobOffer(jobOfferHash);

        Assert.equal(_isPublished, true, "Job Offer should be published");
    }

    function () public {}
}
