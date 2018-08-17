import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CompanyList from "../../components/CompanyList";

const RegisteredCompaniesList = () => (
  <div>
    <Grid container spacing={24}>
      <Grid item xs={0} sm={1} md={2} />
      <Grid item xs={12} sm={10} md={8}>
        <Typography variant="subheading" gutterBottom>
          List of available companies
        </Typography>

        <CompanyList/>
      </Grid>
      <Grid item xs={0} sm={1} md={2} />
    </Grid>
  </div>
);

export default RegisteredCompaniesList;