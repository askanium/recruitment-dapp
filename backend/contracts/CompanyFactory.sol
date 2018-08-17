pragma solidity ^0.4.24;

import './Company.sol';
import './CompanyProxy.sol';


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