import React from 'react';
import Typography from "@material-ui/core/Typography";
import { withStyles } from '@material-ui/core/styles';
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: '100%',
    height: '100vh',
    zIndex: 999
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const LoadingSpinner = ({
  classes,
  loadingTransaction,
  loadingIPFS,
  eventName
}) => {

  return (
      <div className={classes.loading}>
        <div className={classes.wrapper}>
          <Fade
            in={loadingIPFS || loadingTransaction}
            style={{
              transitionDelay: (loadingIPFS || loadingTransaction) ? '800ms' : '0ms',
              marginTop: '45vh',
              textAlign: 'center'
            }}
            unmountOnExit
          >
            <div>
              <CircularProgress />
              {loadingIPFS
                  ? <Typography>Uploading info to IPFS...</Typography>
                  : null
              }
              {loadingTransaction
                  ? <Typography>Signing and waiting for {eventName} event...</Typography>
                  : null
              }
            </div>
          </Fade>
        </div>
      </div>
  );
};

export default withStyles(styles)(LoadingSpinner);