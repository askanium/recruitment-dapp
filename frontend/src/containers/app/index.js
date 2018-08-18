import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { push } from 'connected-react-router';
import Web3 from 'web3';
import { bindActionCreators } from "redux";
import * as web3Actions from "../../actions/web3";
import * as menuActions from "../../actions/menu";
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import routes from '../../routes/index';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  content: {
    marginTop: "10px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    "&:before,&:after": {
      display: "table",
      content: '" "'
    },
    "&:after": {
      clear: "both"
    }
  }
};

function mapStateToProps(state) {
  return {
    web3: state.web3,
    classes: state.classes,
    menuTitle: state.menu.title,
  };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      ...web3Actions,
      ...menuActions,
      registerPage: () => push('/company/register'),
      home: () => push('/')
    }, dispatch);
}

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
      if (prop.collapse)
        return prop.views.map((prop, key) => {
          return (
            <Route path={prop.path} component={prop.component} key={key} />
          );
        });
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  componentWillMount() {

    if (window.web3) {
      // TEMPORARY SOLUTION! Save old, injected web3 to be able to listen to events, as
      // Metamask currently doesn't work with web3 1.0.
      window.web3Old = window.web3;
      console.log(window.web3Old);

      // Then replace the old injected version by the local Web3.JS version 1.0.0-beta.N
      window.web3 = new Web3(window.web3.currentProvider);
      console.log(window.web3);

      this.props.web3InitializedAction();

      // Subscribe to the "update" event when account changes in MetaMask
      // and change the address in the dapp as well.
      window.web3.currentProvider.publicConfigStore.on('update', this.props.metamaskChangeAccount);

      // Get the latest block number, needed to filter relevant events.
      window.web3.eth.getBlock('latest', (err, result) => {
        if (err) return;

        this.props.receiveLatestBlockNumberAction(result.number);
      });
    }

    this.props.setTitleAction('List of companies');
  }

  render() {
    return (
      <div>
        <AppBar position={"static"}>
          <Toolbar>
            <IconButton className={this.props.classes.menuButton} color={"inherit"} aria-label={"Menu"}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={this.props.classes.flex}>
              {this.props.menuTitle}
            </Typography>
            <Button color="inherit" onClick={() => this.props.registerPage()}>Register Company</Button>
            <Button color="inherit" onClick={() => this.props.home()}>Home</Button>
          </Toolbar>
        </AppBar>

        <div className={this.props.classes.content}>
          <div className={this.props.classes.container}>{switchRoutes}</div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  ethAddress: PropTypes.object,
  classes: PropTypes.object.isRequired
};

App = withStyles(styles)(App);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);