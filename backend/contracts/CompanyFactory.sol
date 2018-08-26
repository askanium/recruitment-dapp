pragma solidity ^0.4.24;

import './Company.sol';
import './CompanyProxy.sol';


/// @title CompanyFactory
/// @dev Is responsible for deploying specific contracts. It uses a `masterCopy`
/// of a Company contract and deploys CompanyProxy contracts that are wrapped as
/// Company contracts (as their storages are aligned).
contract CompanyFactory {

    // TODO upon selfdestructing a company, remove it from the array.
    address[] public companies;
    Company private masterCopy;

    event CompanyCreated(address _address, string _name, uint _timestamp);

    /// @dev Upon deployment, a base Company contract should be provided
    /// to the factory.
    constructor(Company _masterCopy) public {
        masterCopy = _masterCopy;
    }

    /// @dev Deploy a new CompanyProxy and add its address to the `companies` array.
    /// @param _name The name of the company.
    /// @param _ipfsHash The IPFS hash that contains all details of the company.
    /// @return The newly created contract wrapped as a company Contract.
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

    /// @dev Return number of companies that have been created by the factory.
    /// @return The number of companies.
    function getNrOfCompanies()
        public
        view
        returns (uint)
    {
        return companies.length;
    }
}