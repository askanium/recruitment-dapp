pragma solidity ^0.4.24;

import './UpdatableProxyImplementation.sol';
import './CompanyData.sol';

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

    /// @dev A getter of IPFS hash of the applicant to a specific job offer.
    ///
    /// @param _titleHash The bytes32 representation of the job offer title.
    /// @param _applicant The address of the applicant that applied to the job offer.
    ///
    /// @return The IPFS hash of the applicant that applied to the job offer.
    function getApplicantIPFSHash(bytes32 _titleHash, address _applicant)
        external
        view
        returns(string)
    {
        JobOffer storage jobOffer = openedJobOffers[_titleHash];

        // Proceed further only if there is such an applicant that applied.
        require(bytes(jobOffer.applicants[_applicant]).length > 0);

        return jobOffer.applicants[_applicant];
    }

    /// @dev Fallback function to be able to receive payments.
    function ()
        external
        payable
    {
        require(msg.data.length == 0);
        balance += msg.value;
    }
}
