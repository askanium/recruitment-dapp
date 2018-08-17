import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router';
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import * as companiesActionCreators from "../../actions/companies";
import * as contractsActionCreators from "../../actions/contracts";
import CompanyContract from "../../contracts/Company";
import Company from '../Company';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

  render() {
    return <div></div>
  }
}

ApplicantsList = withStyles(styles)(ApplicantsList);

ApplicantsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicantsList);

export default ApplicantsList;