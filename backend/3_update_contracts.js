var Company2 = artifacts.require("./Company2.sol");
var Company2Update = artifacts.require("./Company2Update.sol");

module.exports = function(deployer) {
  deployer.deploy(Company2)
      .then(() => Company2.deployed())
      .then((instance) => deployer.deploy(Company2Update, '{insert deployed Company address here}', Company2.address));
};
