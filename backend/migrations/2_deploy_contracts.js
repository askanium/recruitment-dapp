var Company = artifacts.require("./Company.sol");
var CompanyFactory = artifacts.require("./CompanyFactory.sol");
var UtilsLib = artifacts.require("./UtilsLib.sol");

module.exports = function(deployer) {
  deployer.deploy(UtilsLib);
  deployer.link(UtilsLib, CompanyFactory);
  deployer.deploy(Company)
      .then(() => Company.deployed())
      .then((instance) => deployer.deploy(CompanyFactory, Company.address));
};
