pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import 'truffle/DeployedAddresses.sol';
import '../contracts/Company.sol';
import '../contracts/CompanyFactory.sol';

contract TestCompanyFactory {
    // Truffle will send the TestCompany ten Ether after deploying the contract.
    uint public initialBalance = 3 ether;

    function testSettingAnOwnerOfDeployedContractThroughFactory() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = cf.createCompany("A", "B");
        Assert.equal(deployedCompany.getOwner(), address(this), 'An owner is different than a deployer');
    }

    function testGetNrOfCompaniesGetter() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        uint nrOfCompanies = cf.getNrOfCompanies();
        Assert.equal(nrOfCompanies, uint(1), 'There should be 1 deployed company');
    }

    function testGetAddressOfDeployedCompany() public {
        CompanyFactory cf = CompanyFactory(DeployedAddresses.CompanyFactory());

        Company deployedCompany = cf.createCompany("B", "C");

        // Get the second element in companies array, as the first one
        // holds the company address created in the first testcase above.
        address company = cf.companies(1);

        Assert.equal(address(deployedCompany), company, 'There should be 1 deployed company');
    }

}
