import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router';
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import * as companiesActionCreators from "../../actions/companies";
import * as contractsActionCreators from "../../actions/contracts";
import CompanyContract from "../../contracts/Company";
import Company from '../Company';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ipfs from "../../ipfs";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3,
    color: theme.palette.text.secondary,
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

class CompanyList extends React.Component {

  componentDidMount() {
    this.getNrOfCompanies();
  }

  getNrOfCompanies() {
    this.props.requestNrOfCompaniesAction();
    this.props.deployedFactoryInstance.getNrOfCompanies.call((err, companies) => {
      this.props.receiveNrOfCompaniesAction(companies);
      this.getCompanies();
    });
  }

  getCompanies() {
    for (let i = 0; i < this.props.nrOfCompanies; i++) {
      this.getCompanyAddress(i);
    }
  }

  getCompanyAddress(index) {
    this.props.deployedFactoryInstance.companies(index, (err, address) => {
      this.getCompanyDetails(address);
    });
  }

  getCompanyDetails(address) {
    const deployedCompany = window.web3.eth.contract(CompanyContract.abi).at(address);
    deployedCompany.getCompanyDetails.call(async (err, details) => {
      this.props.receiveCompanyDetails(details);
      await ipfs.get(details[2], (err, result) => {
        if (err) { console.log(err); return; }

        const str = new TextDecoder('utf-8').decode(result[0].content);
        const companyJson = JSON.parse(str);

        this.props.receiveCompanyIPFSDetails(details[0], companyJson);
      })
    });
  }

  goToCompanyPage(address) {
    this.props.selectCompany(address);
    this.props.goToCompanyPage(address);
  }

  render() {
    return <div>
      {Object.keys(this.props.companies).length === 0
        ? <Paper className={this.props.classes.paper}>
            <Typography>
              Currently, there are no companies you can apply for. If you want, you can register one, though.
            </Typography>
            <Button className={this.props.classes.button}
                    variant="contained"
                    color="primary"
                    onClick={() => this.props.registerCompany()}>
              Register Company
            </Button>
          </Paper>
        : Object.keys(this.props.companies).map(key =>
            <Company key={this.props.companies[key].address}
                     name={this.props.companies[key].name}
                     ipfsHash={this.props.companies[key].ipfsHash}
                     numberOfOffers={this.props.companies[key].numberOfOpenedOffers + this.props.companies[key].numberOfClosedOffers}
                     owner={this.props.companies[key].owner}
                     description={this.props.companies[key].description}
                     link={this.props.companies[key].link}
                     logo={this.props.companies[key].logo}
                     size={this.props.companies[key].size}
                     visitCompanyPage={() => this.goToCompanyPage(this.props.companies[key].address)}
            />
          )
      }
    </div>
  }
}

CompanyList = withStyles(styles)(CompanyList);

CompanyList = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompanyList);

export default CompanyList;