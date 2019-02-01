import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Account from '../../Containers/AccountContainer/AccountSmartContainer'
import {Link } from 'react-router-dom'
import './AppBar.css'


const appBar = (props) => {
  console.log('this is props is appbar', props)
    if(false)//props.LoggedIn === null || typeof(props.LoggedIn) === 'undefined'
    {
      return(
      <div className="margin2">
        <AppBar position="static">
         <Grid container spacing={24} style={{padding:'24px'}}>
            <Grid xs={12}><Typography variant="h2" align="center">Hope At Hand</Typography></Grid>
          
          </Grid>
        </AppBar>
      </div>)
    } else {
    return(
    <div className='margin'>
          <AppBar position="static">
            <Grid container spacing={24}>
              <Grid xs={1} item/>
              <Grid item xs={1} style={{ marginTop: '14px' }}>
                <Link to="/"><Button variant="contained" fullWidth color="secondary">
                  LOGO
                </Button></Link>
              </Grid>
              <Grid item xs={1} style={{ marginTop: '14px' }}>
                <Link to="/Admin"><Button variant="contained" fullWidth color="secondary">
                  <Typography>Admin</Typography>
                </Button></Link>
              </Grid>
              <Grid item xs={1} style={{ marginTop: '14px' }}>
                <Link to="/Search"><Button variant="contained" fullWidth color="secondary">
                  <Typography>Search</Typography>
                </Button></Link>
              </Grid>
              <Grid item xs={1} style={{ marginTop: '14px' }}>
                <Link to="/Upload"><Button variant="contained" fullWidth color="secondary">
                  <Typography>Upload</Typography>
                </Button>
                </Link>
              </Grid>
              
              <Grid item xs={3}>
                <InputBase
                  style={{ margin: '8px' }}
                  placeholder="Search Lesson Plans"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              
              <Grid item xs={1} style={{ marginTop: '14px' }}>
                <Link to="/Create"><Button variant="contained" fullWidth color="secondary">
                  <Typography>Create</Typography>
                </Button>
                </Link>
              </Grid>
              <Grid item xs={1} style={{  marginTop: '14px' }}>
                <Button variant="contained" fullWidth color="secondary" onClick={props.logOut}>
                  <Typography>LOGOUT</Typography>
                </Button>
              </Grid>

              <Grid item xs={1}>
                <Account favorites={props.favorites}/>
              </Grid>
            </Grid>
          </AppBar>
        </div>
        )
      }
}

export default appBar