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
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      manageJobOffer: (address, hash) => push(`/company/${address}/jobOffer/${hash}`)
    }, dispatch);
}

class JobOffer extends React.Component {

  state = {
    buffer: '',
    ipfsHash: null,
    loadingTransaction: false,
  };

  constructor(props) {
    super(props);
    this.applyToJobOffer = this.applyToJobOffer.bind(this);
  }

  componentDidMount = async () => {
    await ipfs.get(this.props.jobOffer.jobDescriptionIPFSHash, (err, result) => {
      if (err) { console.log(err); return; }

      const str = new TextDecoder('utf-8').decode(result[0].content);
      const jobDescription = JSON.parse(str).data;

      this.props.receiveJobOfferIPFSDetails(this.props.company.address, this.props.jobOffer.hash, jobDescription);
    });
  };

  goToJobOfferPage(address, hash) {
    this.props.manageJobOffer(address, hash)
  }

  publishJobOffer(hash) {
    this.setState({loadingTransaction: true});
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
      await ipfs.add(this.state.buffer, (err, ipfsHash) => {
        console.log(err, ipfsHash);

        // Set state by setting ipfsHash to ipfsHash[0].hash
        self.setState({ ipfsHash: ipfsHash[0].hash });

        // Save the hash onto blockchain
        self.props.companyContract.applyToJobOffer(
            hash,
            self.state.ipfsHash,
            {from: self.props.userAddress, gas: 1000000},
            (err, result) => console.log('err: ', err, 'result: ', result)
        );
      });
    } else {
      console.log('No file selected!!!');
    }
  };

  retrieveJobApplication = async () => {
    await ipfs.get('QmQ6QCUpV4ytSUSc5SdF818ktRALmNPPL4cRCXwvdZSBhZ', (err, files) => {
      console.log('got files');
      console.log(err, files);
      const blob = new Blob([files[0].content]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'test-ipfs.pdf';
      link.click();
    });
  };

  captureFile = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const file = event.target.files[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => this.convertToBuffer(reader);
      console.log('capture file final');
    };

  convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
      const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
      this.setState({buffer});
      console.log('convert to buffer final');
      console.log(this.state);
  };

  render() {
    const {
      isAdmin,
      jobOffer,
      classes
    } = this.props;

    return <Paper className={classes.paper}>
      <Grid container spacing={24}>
        <Grid item xs={10} md={8}>
          <Typography variant="headline" gutterBottom>
            {jobOffer.title}
          </Typography>
        </Grid>
        <Grid item xs={2} md={4}>
          {isAdmin
              ? <Button color="primary" className={classes.button} onClick={() => this.goToJobOfferPage(this.props.company.address, jobOffer.hash)}>
                Manage
              </Button>
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
                <Typography variant={"body1"}>Status: {jobOffer.isPublished ? '' : 'Not'} Published</Typography>
                {jobOffer.isPublished && isAdmin
                    ? null
                    : <Button onClick={() => this.publishJobOffer(jobOffer.hash)} variant={"outlined"} color={"primary"}>Publish</Button>
                }
              </div>
              : <div>
                <input type="file" onChange={this.captureFile}/>
                <Button onClick={() => this.applyToJobOffer(jobOffer.hash)} variant={"outlined"} color={"secondary"}>Apply</Button>
                <Button onClick={() => this.retrieveJobApplication()} variant={"outlined"} color={"secondary"}>Retrieve</Button>
              </div>
          }

          {/* Loading animation on waiting for Ethereum */}
          {this.state.loadingTransaction
            ? <div className={this.props.classes.loading}>
              <div className={this.props.classes.wrapper}>
                <Fade
                  in={this.state.loadingTransaction}
                  style={{
                    transitionDelay: this.state.loadingTransaction ? '800ms' : '0ms',
                    marginTop: '50%',
                    textAlign: 'center'
                  }}
                  unmountOnExit
                >
                  <div>
                    <CircularProgress />
                    {this.state.loadingTransaction
                        ? <Typography>Signing and waiting for PublishJobOffer event...</Typography>
                        : null
                    }
                  </div>
                </Fade>
              </div>
            </div>
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