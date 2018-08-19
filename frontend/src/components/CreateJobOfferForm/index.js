import React from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from "redux";
import { withStyles } from '@material-ui/core/styles';
import * as actionCreators from "../../actions/contracts";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import ipfs from "../../ipfs";
import {push} from "connected-react-router";
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
    ...state.companies,
    selectedCompany: state.companies.companies[state.companies.selectedCompany],
    userAddress: state.web3.ethAddress,
    blockNr: state.web3.latestEventBlockNumber,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...actionCreators,
      goToCompanyPage: (address) => push(`/company/${address}`),
    }, dispatch);
}

class CreateJobOfferForm extends React.Component {

  constructor(props) {
    super(props);
    this.createJobOffer = this.createJobOffer.bind(this);
    this.updateJobOffer = this.updateJobOffer.bind(this);
    this.state = props.jobOffer || this.state;
  }

  state = {
    salaryRangeMin: '',
    salaryRangeMax: '',
    rewardInEther: '',
    title: '',
    jobDescription: '',
    domain: '',
    loadingIPFS: false,
    loadingTransaction: false,
  };

  componentWillMount() {
    if (!this.props.selectedCompany || this.props.selectedCompany.owner !== this.props.userAddress) {
      window.location = '/';
    }
    if (this.props.jobOffer) {
      this.setState({rewardInEther: window.web3.fromWei(this.props.jobOffer.rewardInWei, 'ether')});
    }

  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  createJobOffer = async () => {
    this.setState({loadingIPFS: true});
    await ipfs.add(new Buffer(JSON.stringify({data: this.state.jobDescription})), (err, ipfsHash) => {
      if (err) return;

      this.setState({loadingIPFS: false});
      this.setState({loadingTransaction: true});

      this.props.selectedCompanyContractInstance.createJobOffer(
        this.state.salaryRangeMin,
        this.state.salaryRangeMax,
        +window.web3.toWei(this.state.rewardInEther),
        this.state.domain,
        this.state.title,
        ipfsHash[0].hash,
        {from: this.props.userAddress, gas: 1500000},
        (err, result) => console.log('err: ', err, 'result: ', result)
      );

      // Watch for the JobOfferCreated event on the blockchain.
      const jobOfferCreateEvent = this.props.selectedCompanyContractInstance.JobOfferCreated({_companyName: this.props.selectedCompany.name, _jobTitle: this.state.title}, {fromBlock: this.props.blockNr, toBlock: 'latest'});
      jobOfferCreateEvent.watch((error, event) => {
        if (error) console.log('ERROR!!!', error);

        if (event.args._jobTitle === this.state.title && event.args._companyName === this.props.selectedCompany.name) {
          this.setState({loadingTransaction: false});
          this.props.goToCompanyPage(this.props.selectedCompany.address);
        }
      })
    });
  };

  updateJobOffer() {
    this.props.selectedCompanyContractInstance.updateJobOffer(
      this.props.jobOffer.hash,
      this.state.salaryRangeMin,
      this.state.salaryRangeMax,
      this.state.jobDescription,
      {from: this.props.userAddress, gas: 1500000},
      (err, result) => console.log('err: ', err, 'result: ', result)
    );

    // TODO listen to event here!
    // Watch for the JobOfferCreated event on the blockchain.
    // const jobOfferCreateEvent = this.props.selectedCompanyContractInstance.JobOfferUpdated({name: this.props.selectedCompany.name, _title: this.state.title});
    // jobOfferCreateEvent.watch((error, event) => {
    //   if (!error) console.log('RECEIVED EVENT!!!', event);
    //   else console.log('ERROR!!!', error);
    // })

  }

  render() {
    return <div className={this.props.classes.container}>
      <TextField
        id="name"
        name="name"
        label="Job Title"
        value={this.state.title}
        onChange={this.handleChange('title')}
        disabled={!!this.props.jobOffer}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex: Web Developer"
        helperText="The title of your job offer"
        fullWidth
        margin="normal"
      />
      <FormControl className={this.props.classes.formControl}>
        <InputLabel shrink htmlFor="domain">Domain</InputLabel>
        <Select
          value={this.state.domain}
          onChange={this.handleChange('domain')}
          disabled={!!this.props.jobOffer}
          inputProps={{
            name: 'domain',
            id: 'domain',
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={0}>IT</MenuItem>
          <MenuItem value={1}>Marketing</MenuItem>
          <MenuItem value={2}>Sales</MenuItem>
          <MenuItem value={3}>Finance</MenuItem>
        </Select>
      </FormControl>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            id="salaryRangeMin"
            name="salaryRangeMin"
            label="Start Salary Range ($)"
            value={this.state.salaryRangeMin}
            type='number'
            onChange={this.handleChange('salaryRangeMin')}
            disabled={this.props.jobOffer && this.props.jobOffer.isPublished}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Ex: 1000"
            helperText="Number of people that work at the given company"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="salaryRangeMax"
            name="salaryRangeMax"
            label="End Salary Range ($)"
            value={this.state.salaryRangeMax}
            type='number'
            onChange={this.handleChange('salaryRangeMax')}
            disabled={this.props.jobOffer && this.props.jobOffer.isPublished}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Ex: 1000"
            helperText="Number of people that work at the given company"
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
      <TextField
        id="rewardInEther"
        name="rewardInEther"
        label="Reward (in Ether)"
        value={this.state.rewardInEther}
        type='number'
        onChange={this.handleChange('rewardInEther')}
        disabled={!!this.props.jobOffer}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex: 1.3"
        helperText="Amount of Ether that a person will receive if he/she is approved for the job."
        fullWidth
        margin="normal"
      />
      <TextField
        id="jobDescription"
        name="jobDescription"
        value={this.state.jobDescription}
        disabled={this.props.jobOffer && this.props.jobOffer.isPublished}
        label="Job Description"
        onChange={this.handleChange('jobDescription')}
        InputLabelProps={{
          shrink: true,
        }}
        placeholder="Ex: Write Code"
        fullWidth
        multiline
        rows={5}
        rowsMax={10}
        margin="normal"
      />
      {this.props.jobOffer
          ? <div>
            {this.props.jobOffer.isPublished
                ? <Tooltip title="Published Job Offers cannot be updated">
                  <span>
                    <Button variant="contained"
                            color="primary"
                            onClick={this.updateJobOffer}
                            disabled={this.props.jobOffer.isPublished}
                    >
                      Update Job Offer
                    </Button>
                  </span>
                </Tooltip>
                : <Button variant="contained"
                          color="primary"
                          onClick={this.updateJobOffer}
                          disabled={this.props.jobOffer.isPublished}
                  >
                    Update Job Offer
                  </Button>
            }
          </div>
          : <Button variant="contained" color="primary" onClick={this.createJobOffer}>
            Create Job Offer
          </Button>
      }

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
                    ? <Typography>Signing and waiting for CreateJobOfferEvent...</Typography>
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

CreateJobOfferForm = withStyles(styles)(CreateJobOfferForm);

CreateJobOfferForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateJobOfferForm);

export default CreateJobOfferForm;