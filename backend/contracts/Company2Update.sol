pragma solidity ^0.4.24;

import './Company.sol';
import './Company2.sol';
import './Update.sol';
import './CompanyDataInternal.sol';
import './Company2DataInternal.sol';


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
