const Company = artifacts.require("Company");
const CompanyFactory = artifacts.require("CompanyFactory");

contract("Company", accounts => {
  const [firstAccount, secondAccount] = accounts;
  let tryCatch = require("./exceptions.js").tryCatch;
  let errTypes = require("./exceptions.js").errTypes;

  it("has a 0x0 owner if deployed not through CompanyFactory", async () => {
    const company = await Company.new();
    assert.equal(await company.getOwner.call(), '0x0000000000000000000000000000000000000000');
  });

  it("has the correct owner if deployed through CompanyFactory", async () => {
    const cf = await CompanyFactory.deployed();

    await cf.createCompany("A", "B", {from: firstAccount, gas: 2000000});

    const createCompanyEvent = cf.CompanyCreated({_name: "A"});
    createCompanyEvent.watch(async (err, result) => {
      if (err) { console.log(err); return; }
      const deployedCompany = Company.at(result.args._address);

      assert.equal(await deployedCompany.getOwner.call(), firstAccount);
      createCompanyEvent.stopWatching();
    });
  });

  it("does not allow to create a Job Offer if msg.sender is not the owner", async () => {
    const company = await Company.deployed();
    await tryCatch(company.createJobOffer(1, 2, 100, 0, "WebDev", "JD", {from: secondAccount, gas: 1000000}), errTypes.revert);
  });

  it("reverts if getJobOffer receives an invalid title hash", async () => {
    const cf = await CompanyFactory.deployed();
    const deployedCompanyHash = await cf.companies(0);
    const deployedCompany = Company.at(deployedCompanyHash);
    await tryCatch(deployedCompany.getJobOffer("0x0000000000000000000000000000000000000000", {from: firstAccount, gas: 1000000}), errTypes.revert);
  });

  it("reverts if updateJobOffer receives an invalid title hash", async () => {
    const cf = await CompanyFactory.deployed();
    const deployedCompanyHash = await cf.companies(0);
    const deployedCompany = Company.at(deployedCompanyHash);
    await tryCatch(deployedCompany.updateJobOffer("0x0000000000000000000000000000000000000000", 1, 2, "JD", {from: firstAccount, gas: 1000000}), errTypes.revert);
  });

  it("reverts if updateJobOffer receives an already published offer hash", async () => {
    const cf = await CompanyFactory.deployed();
    const deployedCompanyHash = await cf.companies(0);
    const deployedCompany = Company.at(deployedCompanyHash);

    await deployedCompany.deposit({from: firstAccount, value: web3.toWei(1), gas: 100000});

    await deployedCompany.createJobOffer(1, 2, 100, 0, "WebDev", "JD", {from: firstAccount, gas: 1000000});
    await deployedCompany.publishJobOffer(web3.sha3("WebDev"));

    await tryCatch(deployedCompany.updateJobOffer(web3.sha3("WebDev"), 1, 2, "JD", {from: firstAccount, gas: 1000000}), errTypes.revert);
  });

  it("reverts if trying to publish a published job offer", async () => {
    const cf = await CompanyFactory.deployed();
    const deployedCompanyHash = await cf.companies(0);
    const deployedCompany = Company.at(deployedCompanyHash);

    await tryCatch(deployedCompany.publishJobOffer(web3.sha3("WebDev"), {from: firstAccount, gas: 1000000}), errTypes.revert);
  });

  it("successfully processes an applicant", async () => {
    const cf = await CompanyFactory.deployed();
    const deployedCompanyHash = await cf.companies(0);
    const deployedCompany = Company.at(deployedCompanyHash);

    await deployedCompany.applyToJobOffer(web3.sha3("WebDev"), "IPFS_HASH", {from: secondAccount, gas: 1000000});

    const applicants = await deployedCompany.getApplicantsOfJobOffer(web3.sha3("WebDev"));

    assert.equal(applicants.length, 1);
    assert.equal(applicants[0], secondAccount);
  });

  it("successfully approves an applicant", async () => {
    const cf = await CompanyFactory.deployed();
    const deployedCompanyHash = await cf.companies(0);
    const deployedCompany = Company.at(deployedCompanyHash);

    await deployedCompany.approveCandidateForJobOffer(web3.sha3("WebDev"), secondAccount, {from: firstAccount, gas: 1000000});

    const jobOfferDetails = await deployedCompany.getJobOffer(web3.sha3("WebDev"));

    assert.equal(jobOfferDetails[jobOfferDetails.length - 1], secondAccount);
  });

});
