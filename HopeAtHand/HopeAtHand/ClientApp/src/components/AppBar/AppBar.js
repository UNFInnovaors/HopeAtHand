import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import './AppBar.css'


const appBar = () => {
    return(
    <div className='margin'>
          <AppBar position="static">
            <Grid container xs={12} spacing={12}>
              <Grid item xs={1}/>
              <Grid item xs={2} style={{ marginTop: '14px' }}>
                <Button variant="contained" fullWidth color="secondary">
                  <Typography>LOGO</Typography>
                </Button>
              </Grid>
              <Grid item xs={1}/>
              <Grid item xs={4}>
                <InputBase
                  style={{ margin: '8px' }}
                  placeholder="Search..."
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={2} style={{  marginTop: '14px' }}>
                <Button variant="contained" fullWidth color="secondary">
                  <Typography>LOGOUT</Typography>
                </Button>
              </Grid>

              <Grid item xs={1}>
                <IconButton style={{  margin: '8px' }}>
                  <AccountCircle style={{}} />
                </IconButton>
              </Grid>
            </Grid>
          </AppBar>
        </div>
        )
}

export default appBar