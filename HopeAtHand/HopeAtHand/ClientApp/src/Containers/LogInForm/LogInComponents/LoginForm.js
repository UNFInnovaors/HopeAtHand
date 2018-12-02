import React from 'react'
import {Grid, TextField, Button} from '@material-ui/core'

 const LogInForm = (props) => {
     return(
    <Grid container spacing={24}>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
            <TextField fullWidth label="Please Enter Your Username" onChange={props.changeUsername}></TextField>
        </Grid>
        
        <Grid item xs={4}>
            <TextField fullWidth color="secondary" label="Please Enter Your Password" onChange={props.changePassword}></TextField>
        </Grid>
        <Grid item xs={2}><Button disabled={props.buttonDisabled} fullWidth color="primary" variant="contained" onClick={props.logIn}>Submit</Button></Grid>
        <Grid item xs={1}></Grid>
    </Grid>
)
}

export default LogInForm

