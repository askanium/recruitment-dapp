pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import 'truffle/DeployedAddresses.sol';
import '../contracts/Company.sol';
import '../contracts/CompanyFactory.sol';
import '../contracts/CompanyHeader.sol';

contract TestCompany {
    // Truffle will send the TestCompany ten Ether after deploying the contract.
    uint public initialBalance = 3 ether;
    event LogGeneric(bytes32 _message);
    event LogAddress(address _a, address _b);
    event LogUInt(uint _x);

    function testOwnerDuringCompanyCreationIsNull() public {
        Company company = new Company();
        Assert.equal(company.getOwner(), 0x0, 'For a newly generated Company without CompanyFactory, the owner should be 0x0');
    }

    function testSettingAnOwnerOfDirectlyDeployedCompanyContract() public {
        Company company = Company(DeployedAddresses.Company());
        Assert.equal(company.getOwner(), 0x0, 'For a newly generated Company without CompanyFactory, the owner should be 0x0');
    }

    function testSettingAnOwnerOfDeployedContractThroughFactory() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = cf.createCompany("A", "B");
        Assert.equal(deployedCompany.getOwner(), address(this), 'An owner is different than a deployer');
    }

    function testGettingCompanyDetails() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = cf.createCompany("A", "B");

        (address _contract,
        string memory _name,
        string memory _ipfsHash,
        uint _nrOfOffers,
        address _owner) = deployedCompany.getCompanyDetails();
        Assert.equal(_contract, address(deployedCompany), "Created company should have correct address");
        Assert.equal(_name, "A", "Created company should have correct name");
        Assert.equal(_ipfsHash, "B", "Created company should have correct IPFS hash");
        Assert.equal(_nrOfOffers, uint(0), "Created company should not have any offers upon creation");
        Assert.equal(_owner, address(this), "Created company should not have any offers upon creation");
    }

    function testCreateJobOffer() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = cf.createCompany("A", "B");
        require(address(deployedCompany).call.value(2 ether).gas(1000000)());

        (,,, uint _nrOfOffers,) = deployedCompany.getCompanyDetails();
        Assert.equal(_nrOfOffers, uint(0), "Created company should not have any offers upon creation");
        deployedCompany.createJobOffer(1000, 2000, 1000000000, CompanyHeader.Domains.IT, "Web Dev", "JD");

        (,,, uint _newNrOfOffers,) = deployedCompany.getCompanyDetails();
        Assert.equal(_newNrOfOffers, uint(1), "Created offer should increase Nr of offers available");
    }

//    function testGetJobOfferFromOpenedOffers() public {
//        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());
//
//        Company deployedCompany = Company(cf.companies(cf.getNrOfCompanies() - 1));
//        bytes32 jobOfferHash = deployedCompany.openedJobOffersList(0);
//
//        (string memory _title,
//        string memory _jobDescription,
//        uint _salaryRangeMin,
//        uint _salaryRangeMax,
//        uint _rewardInWei,
//        Company.Domains _domain,
//        uint _numberOfApplicants,
//        bool _isOpen,
//        bool _isPublished) = deployedCompany.getJobOffer(jobOfferHash);
//        Assert.equal(_title, "Web Dev", "Job Offer title should be 'Web Dev'");
//        Assert.equal(_jobDescription, "JD", "Job Offer description should be 'JD'");
//        Assert.equal(_salaryRangeMin, uint(1000), "Job Offer min salary does not correspond");
//        Assert.equal(_salaryRangeMax, uint(2000), "Job Offer max salary does not correspond");
//        Assert.equal(_rewardInWei, uint(1000000000), "Job Offer reward does not correspond");
//        Assert.equal(uint(_domain), uint(0), "Job Offer domain does not correspond");
//        Assert.equal(_numberOfApplicants, uint(0), "Job Offer applicants does not correspond");
//        Assert.equal(_isOpen, true, "Job Offer should be open");
//        Assert.equal(_isPublished, false, "Job Offer should not be published");
//    }
//
//    function testUpdateJobOffer() public {
//        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());
//
//        Company deployedCompany = Company(cf.companies(cf.getNrOfCompanies() - 1));
//        bytes32 jobOfferHash = deployedCompany.openedJobOffersList(0);
//
//        deployedCompany.updateJobOffer(jobOfferHash, uint32(2000), uint32(3000), "JD_v.2.0");
//
//        (, string memory _jobDescription,
//        uint _salaryRangeMin,
//        uint _salaryRangeMax,,
//        CompanyHeader.Domains _domain,,,) = deployedCompany.getJobOffer(jobOfferHash);
//        Assert.equal(_jobDescription, "JD_v.2.0", "Job Offer description should be 'JD_v.2.0'");
//        Assert.equal(_salaryRangeMin, uint(2000), "Job Offer min salary does not correspond");
//        Assert.equal(_salaryRangeMax, uint(3000), "Job Offer max salary does not correspond");
//    }

    function testPublishJobOffer() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = Company(cf.companies(cf.getNrOfCompanies() - 1));
        bytes32 jobOfferHash = deployedCompany.openedJobOffersList(0);

        deployedCompany.publishJobOffer(jobOfferHash);

        (,,,,,,,, bool _isPublished,) = deployedCompany.getJobOffer(jobOfferHash);

        Assert.equal(_isPublished, true, "Job Offer should be published");
    }


//    function testGetJobOfferFromClosedOffers() public {
//        // TODO this one should come after testing PUBLISHOFFER functionality
//        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());
//
//        Company deployedCompany = Company(cf.companies(cf.getNrOfCompanies() - 1));
//        bytes32 jobOfferHash = deployedCompany.openedJobOffersList(0);
//
//        (string memory _title,
//        string memory _jobDescription,
//        uint _salaryRangeMin,
//        uint _salaryRangeMax,
//        uint _rewardInWei,
//        Company.Domains _domain,
//        uint _numberOfApplicants,
//        bool _isOpen,
//        bool _isPublished) = deployedCompany.getJobOffer(jobOfferHash);
//        Assert.equal(_title, "Web Dev", "Job Offer title should be 'Web Dev'");
//        Assert.equal(_jobDescription, "JD", "Job Offer description should be 'JD'");
//        Assert.equal(_salaryRangeMin, uint(1000), "Job Offer min salary does not correspond");
//        Assert.equal(_salaryRangeMax, uint(2000), "Job Offer max salary does not correspond");
//        Assert.equal(_rewardInWei, uint(1000000000), "Job Offer reward does not correspond");
//        Assert.equal(uint(_domain), uint(0), "Job Offer domain does not correspond");
//        Assert.equal(_numberOfApplicants, uint(0), "Job Offer applicants does not correspond");
//        Assert.equal(_isOpen, true, "Job Offer should be open");
//        Assert.equal(_isPublished, false, "Job Offer should not be published");
//    }

    //////////////////////////////////////
//    function testCompanyIsNotCreatedIfNotSufficientFundsAreSent() public {
//        Company core = new Company();
//        ThrowProxy throwProxy = new ThrowProxy(address(core));
//        Company(address(throwProxy)).createCompanyAccount.value(1 wei)(bytes32("AA"), Company.Domains.IT, 1000, bytes32("google.com"));
//        bool result = throwProxy.execute.gas(10000000)();
//
//        Assert.isFalse(result, "Company should not be created if insufficient funds were sent");
//    }
//
//    function testCompanyIsNotCreatedIfOneAttemptsToUseAnExistingCompanyName() public {
//        Company core = new Company();
//        ThrowProxy throwProxy = new ThrowProxy(address(core));
//        Company(address(throwProxy)).createCompanyAccount.value(1 ether)(bytes32("AC"), Company.Domains.IT, 1000, bytes32("google.com"));
//        bool result = throwProxy.execute.gas(10000000)();
//
//        Assert.isFalse(result, "Company should not be created if a company with such a name already exists");
//    }

    function () public {}
}


// Proxy contract for testing throws
contract ThrowProxy {
  address public target;
  bytes data;

  constructor (address _target) public {
    target = _target;
  }

  //prime the data using the fallback function.
  function() public payable {
    data = msg.data;
  }

  function execute() public returns (bool) {
    return target.call(data);
  }
}