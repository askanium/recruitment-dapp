import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import connect from "react-redux/es/connect/connect";
import Company from "../../components/Company";
import JobOffer from "../../components/JobOffer";
import {bindActionCreators} from "redux";
import * as companiesActionCreators from "../../actions/companies";
import * as contractsActionCreators from "../../actions/contracts";
import * as menuActionCreators from "../../actions/menu";
import {push} from "connected-react-router";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";

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
    userAddress: state.web3.ethAddress,
    isAdmin: state.companies.selectedCompany ? state.web3.ethAddress === state.companies.companies[state.companies.selectedCompany].owner : false,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...companiesActionCreators,
      ...contractsActionCreators,
      ...menuActionCreators,
      createJobOffer: (address) => push(`/company/${address}/jobOffer/create`),
      manageJobOffer: (address, hash) => push(`/company/${address}/jobOffer/${hash}`)
    }, dispatch);
}

class CompanyPage extends React.Component {

  state = {
    amount: 0,
    frozenAmount: 0,
    open: false
  };

  constructor(props) {
    super(props);
    this.depositFunds = this.depositFunds.bind(this);
  }

  componentWillMount() {
    if (!this.props.company) {
      window.location = '/';
    } else {
      this.getJobOffers();
    }

    this.props.setTitleAction(this.props.company.name);
    this.props.companyContract.balance((err, result) =>
        this.props.receiveCompanyBalance(result.toNumber()));
  }

  getJobOffers() {
    for (let i = 0; i < +this.props.company.numberOfOffers; i++) {
      this.getJobOfferAddress(i);
    }
  }

  getJobOfferAddress(index) {
    this.props.companyContract.openedJobOffersList.call(index, (err, address) => {
      this.getJobOfferDetails(address);
    });
  }

  getJobOfferDetails(address) {
    this.props.companyContract.getJobOffer.call(address, (err, details) => {
      console.log('address, details', address, details);
      this.props.receiveJobOfferDetails(address, details);
      this.setState({frozenAmount: this.state.frozenAmount + details[4].toNumber()})
    });
  }

  depositFunds() {
    window.web3.eth.sendTransaction({from: this.props.userAddress, to: this.props.company.address, value: window.web3.toWei(this.state.amount, 'ether'), gas: 100000}, (err, result) => {
      if (err) return;
      this.setState({open: true, amount: 0});
      this.props.companyContract.balance((err, result) =>
        this.props.receiveCompanyBalance(result.toNumber()));
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const visibleJobOffers = [];
    Object.keys(this.props.company.jobOffers).forEach(key => {
      const jobOffer = this.props.company.jobOffers[key];
      if (this.props.isAdmin || jobOffer.isPublished) {
        visibleJobOffers.push(jobOffer);
      }
    });
    console.log(this.props.company);

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={0} sm={1} md={2} />
          <Grid item xs={12} sm={10} md={8}>
            <Typography variant="subheading" gutterBottom>
              Company Page
            </Typography>

            <Company name={this.props.company.name}
                     link={this.props.company.link}
                     domain={this.props.company.domain}
                     size={this.props.company.size}
                     numberOfOffers={visibleJobOffers.length}
                     logo={this.props.company.logo}
                     description={this.props.company.description}
                     owner={this.props.company.owner}
            />

            <Divider className={this.props.classes.divider}/>

            {this.props.isAdmin
                ? <div>
                  <Grid container spacing={24}>
                    <Grid item xs={6}>
                      <Typography variant="title" gutterBottom>
                        Current balance: {window.web3.fromWei(this.props.company.availableBalance, 'ether')} Ether
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="title" gutterBottom>
                        Frozen balance: {window.web3.fromWei(this.state.frozenAmount, 'ether')} Ether
                      </Typography>
                    </Grid>
                  </Grid>

                  <Typography variant="subheading" gutterBottom>
                    Deposit Funds
                  </Typography>

                  <TextField
                    id="amount"
                    name="amount"
                    label="Ether amount"
                    value={this.state.amount}
                    type='number'
                    onChange={this.handleChange('amount')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Ex: 1.3"
                    helperText="How much ether to send to be able to set rewards for job offers."
                    fullWidth
                    margin="normal"
                  />

                  <Button onClick={this.depositFunds} variant={"raised"} color={"primary"}>Deposit</Button>

                  <Divider className={this.props.classes.divider}/>
                </div>
                : null
            }

            <Typography variant="subheading" gutterBottom>
              Job Offers
            </Typography>

            {visibleJobOffers.length
                ? visibleJobOffers.map(offer =>
                <JobOffer key={offer.hash}
                          jobOffer={offer}
                />)
                : (this.props.isAdmin
                    ? null
                    : <Typography>It seems there are no open job offers from {this.props.company.name}. Try later!</Typography>
                )
            }

            {this.props.isAdmin
                ? <Button variant={"contained"} color={"primary"}
                          onClick={() => this.props.createJobOffer(this.props.company.address)}>
                  Create Job Offer
                </Button>
                : null
            }

            <Snackbar
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={this.state.open}
              onClose={this.handleClose}
              ContentProps={{
                'aria-describedby': 'message-id',
              }}
              message={<span id="message-id">Amount deposited!</span>}
            />
          </Grid>
          <Grid item xs={0} sm={1} md={2} />
        </Grid>
      </div>
    );
  }
}

CompanyPage.propTypes = {
  company: PropTypes.object.isRequired,
};

CompanyPage = withStyles(styles)(CompanyPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyPage);