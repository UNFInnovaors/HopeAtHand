import React from 'react'
import {Grid, TextField, Button} from '@material-ui/core'

 const LogInForm = (props) => {
     return(
    <Grid container spacing={24}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3} className={'test1'}>
            <TextField fullWidth label="Please Enter Your Username" onChange={props.changeUsername}></TextField>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}><Button disabled={props.buttonDisabled} fullWidth color="primary" variant="contained" onClick={props.logIn}>Submit</Button></Grid>
        <Grid item xs={2}></Grid>
    </Grid>
)
}

export default LogInForm

