import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from'../../../../components/UI Components/Modals/ViewDocument'
import { Grid, Button, Divider, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    
  },
});

function SimpleExpansionPanel(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>Favorite Art Pieces</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        {props.art.map( (p, index) => {
          if(p == null)
            return ""
          return <Grid container item xs={12} key={index}>
                  <Grid xs={2}></Grid>
                  <Grid xs={8}><Button color='primary' fullWidth >{p.title}</Button></Grid>
                  <Grid xs={2}></Grid>
                  <Grid xs={2}></Grid>
                  <Grid xs={8}><Modal id={p.poemId}></Modal></Grid>
                  <Grid xs={2}></Grid>
                  <Divider/>
                </Grid>
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);