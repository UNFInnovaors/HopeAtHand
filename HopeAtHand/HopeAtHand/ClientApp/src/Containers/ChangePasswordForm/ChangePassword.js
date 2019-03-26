import React, { Component } from 'react'
import {Grid, TextField, Button, Typography} from '@material-ui/core'
import { post } from '../../components/Axios/Instances'
import { Link } from 'react-router-dom'

 class ChangePasswordForm extends Component{
     
    state={
        NewPassword: "",
        Valid: false,
        Success: "Initial"
    }
    
    UpdatePassword = () => {
        const loginDTO = {
            Username: this.props.email,
            Password: this.state.NewPassword
        }
        post('/User/Change', loginDTO).then( res =>{
            if(res.data === "No"){
                this.props.PasswordChanged();
                this.setState({Success: true})  
            }
        })
    }
    
    ValidatePassword = (event) => {
        let valid = true
        if(event.target.value.length < 8){
            valid = false
        }
        this.setState({NewPassword: event.target.value,
                        Valid: valid})
    }
     render(){ 
        if(this.state.Success === true){
            return(
                <Grid container spacing={24}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} className={'test1'}>
                        <Typography variant='h5'>Your Password has been successfully updated</Typography>
                    </Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} className={'test1'}>
                        <Link to="/"><Button fullWidth variant='container' color='primary'>Click Here To Return To The Home Page</Button></Link>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            )
        }
        return(
            <Grid container spacing={24}>
                <Grid item xs={2}></Grid>
                <Grid item xs={8} className={'test1'}>
                    <Typography variant='h3' align='center'>Before you may continue to the Hope At Hand Document Database You Must Change Your Password</Typography>
                </Grid>
                <Grid item xs={2}></Grid>

                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Typography variant='headline'>You are seeing this screen either because it is your first time logging into the system or because an administrator has requested that you change your password.</Typography>
                </Grid>
                <Grid item xs={2}></Grid>

                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                    <Typography variant='headline'>Please create a password that is at least 8 characters long</Typography>
                </Grid>
                <Grid item xs={2}></Grid>

                <Grid item xs={2}></Grid>
                <Grid item xs={3} className={'test1'}>
                    <TextField fullWidth label="Please Enter Your new Password" onChange={this.ValidatePassword}></TextField></Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={3}>
                    <Button fullWidth color="primary" variant="contained" onClick={this.UpdatePassword} disabled={!this.state.Valid}>Submit</Button></Grid>
                <Grid item xs={3}></Grid>
            </Grid>
            )
    }
}

export default ChangePasswordForm