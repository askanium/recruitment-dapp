pragma solidity ^0.4.24;

import './Company.sol';
import './Company2.sol';
import './Update.sol';
import './CompanyDataInternal.sol';
import './Company2DataInternal.sol';


/// @title Company2Update
/// @dev The Company2Update is needed to be able to instantiate new variables
/// of existing contracts to their default values. It is the bridging contract
/// that makes upgrading possible. It inherits from both CompanyDataInternal
/// and Company2DataInternal to align memory slots allocated for contract
/// variables in order to not override existing data.
contract Company2Update is
    CompanyDataInternal,
    Company2DataInternal,
    Update
{

    Company internal company;
    Company2 internal company2;

    /// @dev Upon deploying, the contract should receive the contract from
    /// which the migration will happen and the contract with updated variables/logic
    /// @param _company The "old" Company contract.
    /// @param _company2 The "new" Company contract.
    constructor(Company _company, Company2 _company2)
        public
        OwnableData(0)
    {
        company = _company;
        company2 = _company2;
    }

    /// @dev Return the contract *from* which to merge. This is done
    /// to ensure that the contract which is being migrated is actually
    /// a Company contract and not something else.
    function implementationBefore() external view returns (address)
    {
        return company;
    }

    /// @dev Return the contract *to* which to merge. This is done
    /// to ensure that the contract to which we migrate is actually
    /// a Company2 contract and not something else.
    function implementationAfter() external view returns (address) {
        return company2;
    }

    /// @dev As migrated
    function migrateData() external {
        greeting = "Welcome!";
    }
}
