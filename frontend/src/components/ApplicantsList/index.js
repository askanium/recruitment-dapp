import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router';
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import * as companiesActionCreators from "../../actions/companies";
import * as contractsActionCreators from "../../actions/contracts";
import Button from "@material-ui/core/Button";
import ipfs from "../../ipfs";
import LoadingSpinner from "../LoadingSpinner";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  button: {
    marginTop: '20px',
  },
  span: {
    marginRight: theme.spacing.unit * 2
  }
});

function mapStateToProps(state) {
  return {
    ...state.contracts,
    ...state.companies,
    userAddress: state.web3.ethAddress,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...companiesActionCreators,
      ...contractsActionCreators,
      registerCompany: () => push('/company/register'),
      goToCompanyPage: (address) => push(`/company/${address}`)
    }, dispatch);
}

class ApplicantsList extends React.Component {

  state = {
    loadingTransaction: false,
    loadingIPFS: false,
    eventName: '',
  };

  constructor(props) {
    super(props);
    this.retrieveJobApplication = this.retrieveJobApplication.bind(this);
  }

  retrieveJobApplication = async (applicantAddress) => {
    await this.props.selectedCompanyContractInstance.getApplicantIPFSHash(this.props.jobOffer.hash, applicantAddress, async (err, ipfsHash) => {
      await ipfs.get(ipfsHash, (err, files) => {
        const blob = new Blob([files[0].content]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `applicant-${applicantAddress}.pdf`;
        link.click();
      });

    });
  };

  approveApplicant = (applicantAddress) => {
    const company = this.props.companies[this.props.selectedCompany];

    this.setState({loadingTransaction: true, eventName: 'JobOfferCovered'});
    this.props.selectedCompanyContractInstance.approveCandidateForJobOffer(this.props.jobOffer.hash, applicantAddress, {from: this.props.userAddress, gas: 500000}, (err, result) => {
      console.log('approving...');
      console.log(err, result);
    });

    // Watch for the JobOfferCovered event on the blockchain.
    const jobOfferCoveredEvent = this.props.selectedCompanyContractInstance.JobOfferCovered(null, {fromBlock: this.props.blockNr, toBlock: 'latest'});
    jobOfferCoveredEvent.watch((error, event) => {
      if (error) console.log('ERROR!!!', error);
      console.log('covered', error, event);

      if (event.args._companyName === company.name && event.args._jobTitle === this.props.jobOffer.title && event.args._applicant === applicantAddress) {
        this.setState({loadingTransaction: false});
        this.props.approveApplicantAction(company.address, this.props.jobOffer.hash, applicantAddress);
      }
    });
  };

  render() {
    return <div>
      {Object.keys(this.props.applicants).map((key) =>
        <div key={key}>
          <span className={this.props.classes.span}>Applicant {key}</span>
          <Button onClick={() => this.retrieveJobApplication(key)} variant={"flat"} color={"default"}>Retrieve Application</Button>
          <Button onClick={() => this.approveApplicant(key)}
                  disabled={this.props.jobOffer.approvedApplicant !== '0x0000000000000000000000000000000000000000'}
                  variant={"flat"}
                  color={"default"}>
            {this.props.jobOffer.approvedApplicant === key
                ? "Approved"
                : "Approve"
            }
          </Button>
        </div>
      )}

      {/* Loading animation on waiting for Ethereum */}
      {this.state.loadingTransaction || this.state.loadingIPFS
        ? <LoadingSpinner
              loadingTransaction={this.state.loadingTransaction}
              loadingIPFS={this.state.loadingIPFS}
              eventName={this.state.eventName}
          />
        : null
      }
    </div>
  }
}

ApplicantsList = withStyles(styles)(ApplicantsList);

ApplicantsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicantsList);

export default ApplicantsList;