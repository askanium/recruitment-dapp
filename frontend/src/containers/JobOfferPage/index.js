import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import * as companiesActionCreators from "../../actions/companies";
import * as contractsActionCreators from "../../actions/contracts";
import CreateJobOfferForm from "../../components/CreateJobOfferForm";
import ApplicantsList from "../../components/ApplicantsList";
import JobOffer from "../../components/JobOffer";

const styles = theme => ({
  divider: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

function mapStateToProps(state) {
  return {
    company: state.companies.companies[state.companies.selectedCompany],
    companyContract: state.companies.selectedCompanyContractInstance,
    userAddress: state.web3.ethAddress
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...companiesActionCreators,
      ...contractsActionCreators,
    }, dispatch);
}

class JobOfferPage extends React.Component {

  jobOfferTitleHash = null;

  componentWillMount() {
    if (!this.props.company) {
      window.location = '/';
    } else {
      const { match: { params } } = this.props;
      this.jobOfferTitleHash = params.titleHash;
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.userAddress !== prevProps.userAddress && this.props.company && this.props.company.owner !== this.props.userAddress) {
      window.location = '/';
    }
  }

  publishJobOffer(hash) {
    this.props.companyContract.publishJobOffer(hash, {from: this.props.userAddress, gas: 500000}, (err, result) => console.log(err, result));
  }

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={0} sm={1} md={2} />
          <Grid item xs={12} sm={10} md={8}>

            <Typography variant="subheading" gutterBottom>
              Job Offer: {this.props.company.jobOffers[this.jobOfferTitleHash].title}
            </Typography>

            {this.props.company.jobOffers[this.jobOfferTitleHash].isPublished
                ? <div>
                    <JobOffer jobOffer={this.props.company.jobOffers[this.jobOfferTitleHash]}/>

                    <Divider/>

                    <Typography variant="subheading" gutterBottom>
                      Applicants
                    </Typography>

                    <ApplicantsList />
                </div>

                : <CreateJobOfferForm jobOffer={this.props.company.jobOffers[this.jobOfferTitleHash]}/>
            }

          </Grid>
          <Grid item xs={0} sm={1} md={2} />
        </Grid>
      </div>
    );
  }
}

JobOfferPage.propTypes = {
  company: PropTypes.object.isRequired,
};

JobOfferPage = withStyles(styles)(JobOfferPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JobOfferPage);