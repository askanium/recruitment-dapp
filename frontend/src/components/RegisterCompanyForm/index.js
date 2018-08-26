import React from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router';
import { bindActionCreators } from "redux";
import { withStyles } from '@material-ui/core/styles';
import * as actionCreators from "../../actions/contracts";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ipfs from "../../ipfs";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
    marginLeft: 0,
    marginRight: 0
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
    ...state.contracts,
    userAddress: state.web3.ethAddress,
    blockNr: state.web3.latestEventBlockNumber
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...actionCreators,
      goToCompaniesListPage: () => push('/'),
    }, dispatch);
}

class RegisterCompanyForm extends React.Component {

  constructor(props) {
    super(props);
    this.createCompany = this.createCompany.bind(this);
  }

  state = {
    name: '',
    size: '',
    link: '',
    description: '',
    logo: '',
    loadingIPFS: false,
    loadingTransaction: false,
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createCompany = async () => {
    let valid = this.state.name
        && this.state.size
        && this.state.link
        && this.state.description
        && this.state.logo
        && this.state.size > 0;
    if (valid) {
      this.setState({loadingIPFS: true});
      await ipfs.add(new Buffer(JSON.stringify(this.state)), (err, ipfsHash) => {
        console.log(err, ipfsHash);
        if (err) return;

        this.setState({loadingIPFS: false});
        this.setState({loadingTransaction: true});

        this.props.deployedFactoryInstance.createCompany(
          this.state.name,
          ipfsHash[0].hash,
          {from: this.props.userAddress, gas: 1500000},
          (err, result) => console.log('error', err, 'result', result));

        // Watch for the CompanyCreated event on the blockchain.
        const companyCreateEvent = this.props.deployedFactoryInstance.CompanyCreated({_name: this.state.name}, {fromBlock: this.props.blockNr, toBlock: 'latest'});
        companyCreateEvent.watch((error, event) => {
          if (error) console.log('ERROR!!!', error);

          if (event.args._name === this.state.name) {
            this.setState({loadingTransaction: false});
            this.props.goToCompaniesListPage();
          }
        });
      });
    }
  };

  render() {
    return <div className={this.props.classes.container}>
      <TextField
        id="name"
        name="name"
        label="Company Name"
        value={this.state.name}
        onChange={this.handleChange('name')}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex: Google Inc."
        helperText="Full width ABC!"
        fullWidth
        margin="normal"
      />
      <TextField
        id="size"
        name="size"
        label="Company Size"
        value={this.state.size}
        type='number'
        onChange={this.handleChange('size')}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: 0
        }}
        placeholder="Ex: 1000"
        helperText="Number of people that work at the given company"
        fullWidth
        margin="normal"
      />
      <TextField
        id="link"
        name="link"
        value={this.state.link}
        label="Company Website"
        onChange={this.handleChange('link')}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex: www.google.com"
        fullWidth
        margin="normal"
      />
      <TextField
        id="description"
        name="description"
        value={this.state.description}
        label="Company Description"
        onChange={this.handleChange('description')}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex: What does your company do"
        fullWidth
        multiline
        margin="normal"
      />
      <TextField
        id="logo"
        name="logo"
        value={this.state.logo}
        label="Company Logo"
        onChange={this.handleChange('logo')}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex: www.google.com/logo.png"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={this.createCompany}>
        Register
      </Button>

      {/* Loading animation on waiting for IPFS and Ethereum */}
      {this.state.loadingIPFS || this.state.loadingTransaction
        ? <div className={this.props.classes.loading}>
          <div className={this.props.classes.wrapper}>
            <Fade
              in={this.state.loadingIPFS || this.state.loadingTransaction}
              style={{
                transitionDelay: this.state.loadingIPFS || this.state.loadingTransaction ? '800ms' : '0ms',
                marginTop: '45vh',
                textAlign: 'center'
              }}
              unmountOnExit
            >
              <div>
                <CircularProgress />
                {this.state.loadingIPFS
                    ? <Typography>Uploading info to IPFS...</Typography>
                    : null
                }
                {this.state.loadingTransaction
                    ? <Typography>Signing and waiting for CreateEvent...</Typography>
                    : null
                }
              </div>
            </Fade>
          </div>
        </div>
        : null
      }
    </div>
  }
}

RegisterCompanyForm = withStyles(styles)(RegisterCompanyForm);

RegisterCompanyForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterCompanyForm);

export default RegisterCompanyForm;