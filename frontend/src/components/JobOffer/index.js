import React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import {bindActionCreators} from "redux";
import * as companiesActionCreators from "../../actions/companies";
import * as contractsActionCreators from "../../actions/contracts";
import {push} from "connected-react-router";
import connect from "react-redux/es/connect/connect";
import ipfs from "../../ipfs";
import LoadingSpinner from "../LoadingSpinner";
import Tooltip from "@material-ui/core/Tooltip";
import Snackbar from "@material-ui/core/Snackbar";

const domainMapping = {
  0: 'IT',
  1: 'Marketing',
  2: 'Sales',
  3: 'Finance'
};

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit,
  },
  button: {
    float: 'right',
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '100%',
    height: '100vh'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});


function mapStateToProps(state) {
  return {
    company: state.companies.companies[state.companies.selectedCompany],
    companyContract: state.companies.selectedCompanyContractInstance,
    userAddress: state.web3.ethAddress,
    isAdmin: state.companies.selectedCompany ? state.web3.ethAddress === state.companies.companies[state.companies.selectedCompany].owner : false,
    blockNr: state.web3.latestEventBlockNumber,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...companiesActionCreators,
      ...contractsActionCreators,
      createJobOffer: (address) => push(`/company/${address}/jobOffer/create`),
      manageJobOffer: (address, hash) => push(`/company/${address}/jobOffer/${hash}`),
      goToCompanyPage: (address) => push(`/company/${address}`),
    }, dispatch);
}

class JobOffer extends React.Component {

  state = {
    buffer: '',
    ipfsHash: null,
    loadingTransaction: false,
    loadingIPFS: false,
    eventName: '',
    open: false
  };

  constructor(props) {
    super(props);
    this.applyToJobOffer = this.applyToJobOffer.bind(this);
    props.jobOffer.rewardInEther = window.web3.fromWei(props.jobOffer.rewardInWei);
  }

  componentDidMount = async () => {
    await ipfs.get(this.props.jobOffer.jobDescriptionIPFSHash, (err, result) => {
      if (err) { console.log(err); return; }

      const str = new TextDecoder('utf-8').decode(result[0].content);
      const jobDescription = JSON.parse(str).data;

      this.props.receiveJobOfferIPFSDetails(this.props.company.address, this.props.jobOffer.hash, jobDescription);
    });

    if (this.props.jobOffer.isPublished && this.props.jobOffer.isOpen) {
      this.props.companyContract.getApplicantsOfJobOffer(this.props.jobOffer.hash, {from: this.props.userAddress, gas: 100000}, (err, result) => {

        this.props.applicantsListReceivedAction(this.props.company.address, this.props.jobOffer.hash, result)
      });
    }
  };

  goToJobOfferPage(address, hash) {
    this.props.manageJobOffer(address, hash)
  }

  publishJobOffer(hash) {
    this.setState({loadingTransaction: true, eventName: 'JobOfferPublished'});
    this.props.companyContract.publishJobOffer(hash, {from: this.props.userAddress, gas: 500000}, (err, result) => console.log(err, result));

    // Watch for the CompanyCreated event on the blockchain.
    const jobOfferPublishEvent = this.props.companyContract.JobOfferPublished(null, {fromBlock: this.props.blockNr, toBlock: 'latest'});
    jobOfferPublishEvent.watch((error, event) => {
      if (error) console.log('ERROR!!!', error);

      if (event.args._companyName === this.props.company.name && event.args._jobTitle === this.props.jobOffer.title) {
        this.setState({loadingTransaction: false});
        this.props.publishJobOfferAction(this.props.company.address, this.props.jobOffer.hash);
      }
    });
  }

  applyToJobOffer = async (hash) => {
    const self = this;
    if (this.state.buffer) {
      this.setState({loadingIPFS: true, eventName: 'JobOfferReceivedApplication'});
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {

        // Set state by setting ipfsHash to ipfsHash[0].hash
        self.setState({
          loadingIPFS: false,
          loadingTransaction: true,
          ipfsHash: ipfsHash[0].hash
        });

        // Save the hash onto blockchain
        self.props.companyContract.applyToJobOffer(
            hash,
            self.state.ipfsHash,
            {from: self.props.userAddress, gas: 1000000},
            (err, result) => {
              console.log('err: ', err, 'result: ', result)
            }
        );

        // Watch for the JobOfferReceivedApplication event on the blockchain.
        const jobOfferReceivedApplicationEvent = self.props.companyContract.JobOfferReceivedApplication({_applicant: self.props.userAddress}, {fromBlock: self.props.blockNr, toBlock: 'latest'});
        jobOfferReceivedApplicationEvent.watch((error, event) => {
          if (error) console.log('ERROR!!!', error);

          if (event.args._companyName === self.props.company.name && event.args._jobTitle === self.props.jobOffer.title) {
            self.setState({loadingTransaction: false});
            self.props.applyToJobOfferAction(self.props.company.address, self.props.jobOffer.hash, self.props.userAddress, self.state.ipfsHash);
          }
        });

      });
    } else {
      console.log('No file selected!!!');
    }
  };

  closeJobOffer = async (hash) => {
    this.setState({loadingTransaction: true, eventName: 'JobOfferClosed'});
    this.props.companyContract.closeJobOffer(hash, false, {from: this.props.userAddress, gas: 500000}, (err, result) => console.log(err, result));

    // Watch for the CompanyCreated event on the blockchain.
    const jobOfferCloseEvent = this.props.companyContract.JobOfferClosed(null, {fromBlock: this.props.blockNr, toBlock: 'latest'});
    jobOfferCloseEvent.watch((error, event) => {
      if (error) console.log('ERROR!!!', error);
      console.log('ERROR, EVENT', error, event);

      if (event.args._companyName === this.props.company.name && event.args._jobTitle === this.props.jobOffer.title) {
        this.setState({loadingTransaction: false});
        this.props.closeJobOfferAction(this.props.company.address, this.props.jobOffer.hash);
        this.props.goToCompanyPage(this.props.company.address);
      }
    });
  };

  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async(reader) => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({buffer});
  };

  withdraw = async (amount) => {
    this.props.companyContract.withdrawReward(this.props.jobOffer.hash, amount, {from: this.props.userAddress, gas: 500000}, (err, result) => console.log(err, result));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      isAdmin,
      jobOffer,
      classes,
      userAddress,
    } = this.props;

    const userApplied = !!jobOffer.applicants[userAddress];

    return <Paper className={classes.paper}>
      <Grid container spacing={24}>
        <Grid item xs={10} md={8}>
          <Typography variant="headline" gutterBottom>
            {jobOffer.title}
          </Typography>
        </Grid>
        <Grid item xs={2} md={4}>
          {isAdmin
              ? <div>
                {jobOffer.isOpen
                  ? <Button color="primary" className={classes.button}
                            onClick={() => this.goToJobOfferPage(this.props.company.address, jobOffer.hash)}>
                    Manage
                  </Button>
                  : null
                }
              </div>
              : <div className={classes.button}>
                <Typography>Status: {jobOffer.isPublished ? '' : 'Not'} Published</Typography>
              </div>
          }

        </Grid>
        <Grid item xs={12}>
          <Typography variant="subheading" gutterBottom>
            Domain: {domainMapping[jobOffer.domain]}
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Salary Range: {`$${jobOffer.salaryRangeMin} - ${jobOffer.salaryRangeMax}`}
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Reward: {window.web3.fromWei(jobOffer.rewardInWei, 'ether')} Ether
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Number of applicants: {jobOffer.nrOfApplicants}
          </Typography>

          <Typography variant="subheading" gutterBottom>
            Job Description: {jobOffer.jobDescription}
          </Typography>

          <Divider className={classes.divider}/>

          {isAdmin
              ? <div>
                {jobOffer.isOpen
                    ? <Typography variant={"body1"}>Status: {jobOffer.isPublished ? '' : 'Not'} Published</Typography>
                    : <Typography variant={"body1"}>Status: Closed</Typography>
                }
                {jobOffer.isPublished && isAdmin
                    ? null
                    : <div>
                      {jobOffer.isOpen
                          ? <div>
                            <Button onClick={() => this.publishJobOffer(jobOffer.hash)} variant={"outlined"}
                                    color={"primary"}>Publish</Button>
                            <Tooltip
                                title="Closed job offers will disappear from your page and balance will be made available.">
                              <Button onClick={() => this.closeJobOffer(jobOffer.hash)} variant={"outlined"}
                                      color={"primary"}>Close</Button>
                            </Tooltip>
                          </div>
                          : null
                      }
                    </div>
                }
              </div>
              : <div>
                {jobOffer.isOpen
                    ? <div>
                      {userApplied
                          ? <Typography variant={"body1"}>You have already applied to this job offer</Typography>
                          : <div>
                            <input type="file" onChange={this.captureFile}/>
                            <Button onClick={() => this.applyToJobOffer(jobOffer.hash)} variant={"outlined"}
                                    color={"default"}>Apply</Button>
                          </div>
                      }
                      </div>
                    : <div>
                      {this.props.userAddress === jobOffer.approvedApplicant ? <div>
                            <Typography variant={"body1"}>
                              Congrats! You were selected! You can claim {jobOffer.rewardInEther} Ether
                            </Typography>
                            <Button variant={"outlined"} color={"default"} onClick={() => this.withdraw(jobOffer.rewardInWei)}>
                              Claim
                            </Button>
                          </div>
                          : <Typography variant={"body1"}>Snap! This job offer is already closed.</Typography>
                      }
                    </div>
                }
              </div>
          }

          <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={this.state.open}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Amount withdrawn! Check in a couple of seconds your balance!</span>}
            />

          {/* Loading animation on waiting for Ethereum */}
          {this.state.loadingTransaction || this.state.loadingIPFS
            ? <LoadingSpinner
                  loadingTransaction={this.state.loadingTransaction}
                  loadingIPFS={this.state.loadingIPFS}
                  eventName={this.state.eventName}
              />
            : null
          }

        </Grid>
      </Grid>
    </Paper>
  }
}

JobOffer = withStyles(styles)(JobOffer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobOffer);