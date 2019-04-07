import React from 'react'
import {Grid, TextField, Button, Typography} from '@material-ui/core'

 const LogInForm = (props) => {
     return(
    <Grid container spacing={24}>
        <Grid item xs={2}></Grid>
        <Grid item xs={3} className={'test1'}>
            <TextField fullWidth label="Please Enter Your Email" onChange={props.changeUsername}></TextField>
        </Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={3} className={'test1'}><TextField fullWidth label="Please Enter Your Password" type="password" onChange={props.changePassword}></TextField></Grid>
        <Grid item xs={2}></Grid>

        {(props.Invalid === true ? <Grid xs={12} style={{margin:8}}><Typography color='error' align='center' variant='h4'>Invalid Username or Password</Typography></Grid> : "")}

        <Grid item xs={3}></Grid>
        <Grid item xs={6}><Button disabled={props.buttonDisabled} fullWidth color="primary" variant="contained" onClick={props.logIn}>Submit</Button></Grid>
        <Grid item xs={3}></Grid>
    </Grid>
)
}

export default LogInForm

