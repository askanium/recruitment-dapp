pragma solidity ^0.4.24;

import './SafeMath.sol';

library UtilsLib {

    /// @dev Taken and adjusted from https://ethereum.stackexchange.com/a/13886/41771
    function utfStringLength(string _str, bool _computeByteLength)
        pure
        public
        returns (uint length)
    {
        uint i = 0;
        bytes memory string_rep = bytes(_str);

        if (_computeByteLength) {
            length = string_rep.length;
        } else {
            while (i < string_rep.length) {
                if (string_rep[i] >> 5 == 0x6)
                    i+=2;
                else if (string_rep[i] >> 4 == 0xE)
                    i+=3;
                else if (string_rep[i] >> 3 == 0x1E)
                    i+=4;
                else
                    i+=1;

                length++;
            }
        }
    }
}

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

/**
 * @title ProxyData
 * @dev The ProxyData contract has an internal proxied address, that is used to
 * align memory slots between proxy contract and implementation contract.
 */
contract ProxyData {
    address internal proxied;
}


/**
 * @title Proxy
 * @dev The Proxy contract has a proxied address, and delegates all calls to that address.
 */
contract Proxy is ProxyData {

    constructor(address _proxied) public payable {
        proxied = _proxied;
    }

    /// @dev EIP 897 methods
    function implementation() public view returns (address) {
        return proxied;
    }

    function proxyType() public pure returns (uint256) {
        return 1; // for "forwarding proxy"
                  // see EIP 897 for more details
    }

    /// Proxies the call to the implementation contract
    function () public payable {
        bool success = proxied.delegatecall(msg.data);
        assembly {
            let freememstart := mload(0x40)
            returndatacopy(freememstart, 0, returndatasize())
            switch success
            case 0 { revert(freememstart, returndatasize()) }
            default { return(freememstart, returndatasize()) }
        }
    }
}

interface Update {
    function implementationBefore() external view returns (address);
    function implementationAfter() external view returns (address);
    function migrateData() external;
}

contract UpdatableProxyData is ProxyData, OwnableData {}

contract UpdatableProxyShared is ProxyData, Ownable {
    function updateProxied(Update update)
        public
        onlyOwner
    {
        require(update.implementationBefore() == proxied);
        proxied = update;
        Update(this).migrateData();
        proxied = update.implementationAfter();
    }
}

contract UpdatableProxy is Proxy, UpdatableProxyShared {
    constructor(address proxied, address owner)
        public
        Proxy(proxied)
        OwnableData(owner)
    {}

    function proxyType() public pure returns (uint256) {
        return 2; // for "upgradable proxy"
                  // again, see EIP 897
    }
}

contract UpdatableProxyImplementation is UpdatableProxyShared {
    constructor() public OwnableData(0) {}
}

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

contract CompanyProxy is Proxy, CompanyDataInternal {

    using UtilsLib for string;

    constructor (
        address _proxied,
        address _owner,
        string _name,
        string _ipfsHash
    )
        public
        Proxy(_proxied) OwnableData(_owner)
    {
        // If the address where the contract is going to be
        // deployed is non-zero, revert contract creation.
        require(address(this).balance == 0);

        // In order to not have huge gas prices for contract
        // deployment, limit the length of the company name
        // variable to 32 bytes.
        require(_name.utfStringLength(true) <= 32 && _ipfsHash.utfStringLength(true) <= 46);
        name = _name;
        ipfsHash = _ipfsHash;
        balance = 0;
        rewardsToBePaid = 0;
    }
}

/// @title Company
/// @dev The Company has an owner address that can create, update and publish
/// Job Offers as well as approve candidates for a specific Job Offer.
contract Company is UpdatableProxyImplementation, CompanyData {

    /// @dev Modifier to check functions are called only by contract owners.
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /// @dev Circuit breaker modifier.
    modifier coveredByEmergencyStop() {
        require(!isEmergency);
        _;
    }

    /// @dev Getter function to return owner.
    ///
    /// @return The owner of the contract.
    function getOwner()
        external
        view
        returns(address)
    {
        return owner;
    }

    /// @dev Enable emergency mode.
    function switchEmergency(bool _state) external onlyOwner {
        isEmergency = _state;
    }

    /// @dev Getter function to obtain company details.
    ///
    /// @return Returns the address of the contract,
    ///         company name, ipfs hash, number of offers
    ///         and the owner of the contract.
    function getCompanyDetails()
        view
        external
        returns (address, string, string, uint, address)
    {
        uint numberOfOffers = openedJobOffersList.length;
        return (address(this), name, ipfsHash, numberOfOffers, owner);
    }

    /// @dev Creates a JobOffer struct and adds it to the open offers list and mapping.
    ///
    /// @param _salaryMin The minimum salary an applicant might get while applying.
    /// @param _salaryMax The maximum salary an applicant might get while applying.
    /// @param _rewardInWei The reward an applicant will get if approved for the job.
    /// @param _domain The domain this job offer refers to.
    /// @param _title The title of the job offer.
    /// @param _jobDescription The IPFS has that contains the job description info.
    ///
    /// @return Whether function executed successfully or failed.
    function createJobOffer(
        uint32 _salaryMin,
        uint32 _salaryMax,
        uint _rewardInWei,
        Domains _domain,
        string _title,
        string _jobDescription
    )
        public
        onlyOwner
        coveredByEmergencyStop
        returns(bool)
    {
        // If contract does not have sufficient
        // balance to cover the reward, then it
        // cannot create another job offer.
        require(balance >= _rewardInWei);

        balance -= _rewardInWei;
        rewardsToBePaid += _rewardInWei;

        JobOffer memory jobOffer = JobOffer({
            isOpen: true,
            isPublished: false,
            salaryRangeMin: _salaryMin,
            salaryRangeMax: _salaryMax,
            rewardInWei: _rewardInWei,
            domain: _domain,
            title: _title,
            jobDescription: _jobDescription,
            approvedApplicant: 0x0,
            applicantsList: new address[](0)
        });
        openedJobOffersList.push(keccak256(bytes(_title)));
        openedJobOffers[keccak256(bytes(_title))] = jobOffer;

        emit JobOfferCreated(name, _title);

        return true;
    }

    /// @dev Updates salary and job description fields of a JobOffer.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    /// @param _salaryMin The minimum salary an applicant might get while applying.
    /// @param _salaryMax The maximum salary an applicant might get while applying.
    /// @param _jobDescription The IPFS has that contains the job description info.
    ///
    /// @return Whether function executed successfully or failed.
    function updateJobOffer(
        bytes32 _titleHash,
        uint32 _salaryMin,
        uint32 _salaryMax,
        string _jobDescription
    )
        external
        onlyOwner
        coveredByEmergencyStop
        returns(bool)
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // Updating a Job Offer is possible only if it wasn't published already.
        require(bytes(jobOffer.title).length > 0 && jobOffer.isPublished == false);

        jobOffer.salaryRangeMin = _salaryMin;
        jobOffer.salaryRangeMax = _salaryMax;
        jobOffer.jobDescription = _jobDescription;

        emit JobOfferUpdated(name, jobOffer.title);

        return true;
    }

    /// @dev Getter function to get details of a specific job offer.
    ///
    /// The function searches for the given _titleHash in both opened
    /// and closed job offer lists.
    ///
    /// @param _titleHash The bytes32 representation of the job offer
    ///         title for which to get details.
    ///
    /// @return A tuple with job offer title, job description, min salary,
    ///         max salary, reward, domain, number of applicants,
    ///         open/close status and whether it is published or not.
    function getJobOffer(bytes32 _titleHash)
        external
        view
        returns (string, string, uint, uint, uint, Domains, uint, bool, bool, address)
    {
        JobOffer memory jo;

        if (keccak256(bytes(openedJobOffers[_titleHash].title)) == _titleHash) {
            jo = openedJobOffers[_titleHash];
        } else {
            jo = closedJobOffers[_titleHash];
        }

        // Check for the job offer title to exist, meaning that it was found
        // in one of the two mappings (open or closed job offers).
        require(bytes(jo.title).length > 0);

        return (jo.title, jo.jobDescription, jo.salaryRangeMin, jo.salaryRangeMax, jo.rewardInWei, jo.domain, jo.applicantsList.length, jo.isOpen, jo.isPublished, jo.approvedApplicant);
    }

    /// @dev Publish a job offer so that it can start receiving applications.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    ///
    /// @return Whether function executed successfully or failed.
    function publishJobOffer(bytes32 _titleHash)
        external
        onlyOwner
        coveredByEmergencyStop
        returns (bool)
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // You can only publish a Job Offer that isn't published yet.
        require(bytes(jobOffer.title).length > 0 && jobOffer.isPublished == false);
        jobOffer.isPublished = true;

        emit JobOfferPublished(name, jobOffer.title);

        return true;
    }

    /// @dev Receives applicants for a specific job offer.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    /// @param _ipfsCVHash The IPFS hash of the applicant's CV file.
    ///
    /// @return Whether function executed successfully or failed.
    function applyToJobOffer(
        bytes32 _titleHash,
        string _ipfsCVHash
    )
        external
        coveredByEmergencyStop
        returns(bool)
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // Application to job offer is only possible if it is open and published.
        require(jobOffer.isOpen && jobOffer.isPublished);

        // We need to assure that the applicant didn't apply already to this JobOffer.
        // In order to do this, we check that the applicant's IPFS value should be
        // absent, meaning that its length should be zero.
        require(bytes(jobOffer.applicants[msg.sender]).length == 0);

        jobOffer.applicantsList.push(msg.sender);
        jobOffer.applicants[msg.sender] = _ipfsCVHash;

        emit JobOfferReceivedApplication(name, jobOffer.title, msg.sender);

        return true;
    }

    /// @dev Approve a specific candidate, which closes the job offer and releases reward to be withdrawn.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    /// @param _applicant The address of the person that applied to the job offer.
    ///
    /// @return Whether function executed successfully or failed.
    function approveCandidateForJobOffer(
        bytes32 _titleHash,
        address _applicant
    )
        external
        onlyOwner
        coveredByEmergencyStop
        returns(bool)
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // Job Offer can be approved only if it wasn't previously approved.
        require(jobOffer.approvedApplicant == 0x0);

        // We need to assure that the applicant applied to this JobOffer.
        // In order to do this, we check that the applicant's IPFS value
        // should be present, meaning that its length should be greater than zero.
        require(bytes(jobOffer.applicants[msg.sender]).length != 0);

        jobOffer.approvedApplicant = _applicant;

        // Close the job offer, but keep the balance frozen,
        // so that the approved applicant can withdraw it.
        closeJobOffer(_titleHash, true);

        emit JobOfferCovered(name, jobOffer.title, _applicant);
    }

    /// @dev Closes a give job offer and can either free associated reward or keep it frozen.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    /// @param _keepBalanceFrozen Tells whether to return reward into contract balance or
    ///         keep it frozen for applicant to withdraw.
    function closeJobOffer(
        bytes32 _titleHash,
        bool _keepBalanceFrozen
    )
        public
        onlyOwner
        coveredByEmergencyStop
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // Only an open job offer can be closed.
        require(jobOffer.isOpen);

        jobOffer.isOpen = false;

        closedJobOffers[_titleHash] = jobOffer;
        closedJobOffersList.push(_titleHash);

        delete openedJobOffers[_titleHash];

        // In order to remove the job offer from openedJobOffersList, we first
        // need to find the index at which it is located in the array.
        // As earlier we did a require(jobOffer.isOpen), we are sure it
        // is present in the opened job offers list.
        uint index = 0;
        for (uint i = 0; i < openedJobOffersList.length; i++) {
            if (openedJobOffersList[i] == _titleHash) {
                index = i;
            }
        }

        // After finding the index, substitute the value
        // at it with the value at last element in the array and decrease
        // the array length by one.
        openedJobOffersList[index] = openedJobOffersList[openedJobOffersList.length - 1];
        openedJobOffersList.length--;

        // In case Job Offer is closed without approving any
        // candidate, simply move frozen reward to contract balance.
        if (!_keepBalanceFrozen) {
            balance += jobOffer.rewardInWei;
            rewardsToBePaid -= jobOffer.rewardInWei;
        }

        emit JobOfferClosed(name, jobOffer.title);
    }

    /// @dev Used by approved applicants to withdraw their reward from a job offer.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    /// @param _amount The amount the applicant wants to withdraw.
    function withdrawReward(
        bytes32 _titleHash,
        uint _amount
    )
        external
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // Only approved applicants can withdraw.
        require(jobOffer.approvedApplicant == msg.sender);

        // In order to withdraw, the amount should be smaller or equal to the reward.
        require(jobOffer.rewardInWei >= _amount);

        // In order to avoid re-entrancy attacks, do the state changing
        // operations first and only after that send in the reward.
        uint amountToExtract = _amount;
        uint remainingReward = jobOffer.rewardInWei - amountToExtract;
        jobOffer.rewardInWei = remainingReward;

        require(msg.sender.send(_amount));
    }

    /// @dev A getter of all the applicants that applied to a job offer.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    ///
    /// @return The list with all applicant addresses that applied to the job offer.
    function getApplicantsOfJobOffer(bytes32 _titleHash)
        external
        view
        returns(address[])
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        require(jobOffer.isPublished);

        return jobOffer.applicantsList;
    }

    /// @dev Fallback function to be able to receive payments.
    function ()
        public
        payable
    {
        require(msg.data.length == 0);
        balance += msg.value;
    }
}

contract CompanyFactory {

    // TODO upon selfdestructing a company, remove it from the array.
    address[] public companies;
    Company private masterCopy;

    event CompanyCreated(address _address, string _name, uint _timestamp);

    constructor(Company _masterCopy) public {
        masterCopy = _masterCopy;
    }

    function createCompany(
        string _name,
        string _ipfsHash
    )
        public
        returns (Company)
    {
        Company company = Company(new CompanyProxy(masterCopy, msg.sender, _name, _ipfsHash));
        companies.push(address(company));

        emit CompanyCreated(address(company), _name, now);

        return company;
    }

    function getNrOfCompanies()
        public
        view
        returns (uint)
    {
        return companies.length;
    }
}

contract Company2Header is CompanyHeader {
    event EmergencyStatusUpdate(bool _status);
}

contract Company2DataInternal is CompanyDataInternal, Company2Header {
    string internal greeting;
}

contract Company2Data is CompanyData, Company2Header {
    string public greeting;
}

contract Company2Proxy is CompanyProxy, Company2DataInternal {

    constructor (
        address _proxied,
        address _owner,
        string _name,
        string _ipfsHash
    )
        public
        CompanyProxy(_proxied, _owner, _name, _ipfsHash)
    {
        greeting = "Welcome!";
    }
}

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
    function withdrawReward(
        bytes32 _titleHash,
        uint _amount
    )
        external
    {
        require(!isEmergency);

        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // Only approved applicants can withdraw.
        require(jobOffer.approvedApplicant == msg.sender);

        // In order to withdraw, the amount should be smaller or equal to the reward.
        require(jobOffer.rewardInWei >= _amount);

        // In order to avoid re-entrancy attacks, do the state changing
        // operations first and only after that send in the reward.
        uint amountToExtract = _amount;
        uint remainingReward = jobOffer.rewardInWei - amountToExtract;
        jobOffer.rewardInWei = remainingReward;

        require(msg.sender.send(_amount));
    }

    function switchEmergency(bool _state) external onlyOwner {
        isEmergency = _state;

        emit EmergencyStatusUpdate(_state);
    }

}

contract Company2Update is
    CompanyDataInternal,
    Company2DataInternal,
    Update
{

    Company internal company;
    Company2 internal company2;

    constructor(Company _company, Company2 _company2)
        public
        OwnableData(0)
    {
        company = _company;
        company2 = _company2;
    }

    function implementationBefore() external view returns (address)
    {
        return company;
    }

    function implementationAfter() external view returns (address) {
        return company2;
    }

    function migrateData() external {
        greeting = "Welcome!";
    }
}
