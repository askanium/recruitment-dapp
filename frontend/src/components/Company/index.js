import React from 'react';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing.unit,
  },
  button: {
    whiteSpace: 'nowrap',
    float: 'right',
  },
  headerGrid: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px'
  }
});

const Company = ({
  name,
  ipfsHash,
  numberOfOffers,
  description,
  link,
  logo,
  size,
  classes,
  visitCompanyPage
}) => {

  return (
      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item xs={10} md={8} className={classes.headerGrid}>
            <img src={logo} alt="logo" style={{marginRight: '10px'}} width={80} height="auto"/>
            <Typography variant="display1" gutterBottom>
              {name}
            </Typography>
          </Grid>
          {visitCompanyPage
              ? <Grid item xs={2} md={4}>
                <Button color="primary" className={classes.button} onClick={visitCompanyPage}>
                  Visit Company Page
                </Button>
              </Grid>
              : null
          }
        </Grid>
        <Grid>
          <Typography variant="subheading" gutterBottom>
            Number of active offers: {numberOfOffers || 0}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
        </Grid>
      </Paper>
  );
};

export default withStyles(styles)(Company);