import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, Modal, Divider, Grid, TextField} from '@material-ui/core';
import {post} from '../../Axios/Instances'

function getModalStyle() {
  const top = 20

  return {
    margin: 'auto',
    marginTop: '10%'
  };
}

const styles = theme => ({
  paper: {
    width: theme.spacing.unit * 150,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 8,
    paddingTop:2,
    outline: 'none',
  },
});

class SimpleModal extends React.Component {
  state = {
    open: false,
    email: "",
    name:"",
    phone:"",
    org:"",
  };
  changeEmail = (event) => {
    this.setState({email: event.target.value})
  }
  changeName = (event) => {
    this.setState({name: event.target.value})
  }
  changePhone = (event) => {
    this.setState({phone: event.target.value})
  }
  changeOrg = (event) => {
    this.setState({org: event.target.value})
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  post = () => {
      const createDTO = {
          Phone: this.state.phone,
          Email: this.state.email,
          Name: this.state.name,
          Org: this.state.org
      }
      post('/User/Create', createDTO).then( res => {
          this.handleClose()
          this.props.reload();
        })

  }

  render() {
    const { classes } = this.props;
    const valid = (this.state.email !== "" && this.state.name !== "" && this.state.org !== "" && this.state.phone !== "")
    return (
      <div>
        <Button color='secondary' fullWidth variant='contained' onClick={this.handleOpen}>Create Facilitator</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant='h3' align='center' id="modal-title" style={{padding:16}} >
              Create New Facilitator
            </Typography>
            <Divider></Divider>
            <Grid container>
                <Grid container item xs={12} className='test1'>
                    <Grid xs={5}><TextField variant='standard' label="Please Enter The New Facilitator's Email" fullWidth onChange={this.changeEmail}></TextField></Grid>
                    <Grid xs={2}></Grid>
                    <Grid xs={5}><TextField variant='standard' label="Please Enter The New Facilitator's Name" fullWidth onChange={this.changeName}></TextField></Grid>
                </Grid>
                <Grid container item xs={12} style={{marginTop:24}} className='test1'> 
                    <Grid xs={5}><TextField variant='standard' label="Please Enter The New Facilitator's Phone Number" fullWidth onChange={this.changePhone}></TextField></Grid>
                    <Grid xs={2}></Grid>
                    <Grid xs={5}><TextField variant='standard' label="Please Enter The New Facilitator's Organization" fullWidth onChange={this.changeOrg}></TextField></Grid>
                </Grid>
            </Grid>
            <Grid item container xs={12} style={{marginTop:24}}>
                <Grid item xs={6}><Button fullWidth color='primary' variant='contained' style={{width:'90%'}} onClick={this.handleClose}>Cancel</Button></Grid>
                <Grid item xs={6}><Button fullWidth color='secondary' variant='contained' style={{width:'90%'}} disabled={!valid} onClick={this.post}>Create</Button></Grid>
            </Grid>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
