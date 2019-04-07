import React, { Component } from 'react'
import LogInForm from './LogInComponents/LoginForm'
import Filler from '../../components/HOC/Filler'
import * as hello from 'hellojs'
import { post } from '../../components/Axios/Instances'
import { Paper, Grid, Button } from '@material-ui/core';
 


class Login extends Component {

    state = {
        Username: null,
        Password: null,
        ApplicationId: '0c0cb088-99ec-4dcc-943b-ea815d73ee89',
        Authorized : false
    }
   
    componentDidMount = () => {

    }
    ChangeUsername = (event) => {
        this.setState({Username : event.target.value})
    }
    ChangePassword = (event) => {
        this.setState({Password : event.target.value})
    }
    login = () => {
        this.props.login(this.state.Username, this.state.Password)
    }
    
    render(){

        let disabled = (this.state.Username === null || this.state.Username === "" || this.state.Password === null || this.state.Password === null)
        return (
            
            <Filler>
                <LogInForm      logIn={this.login}
                                buttonDisabled={disabled} 
                                changeUsername={this.ChangeUsername} 
                                changePassword={this.ChangePassword}
                                Invalid={this.props.Invalid}
                    />
            </Filler>
                )
    }
}

export default Login

/*
        if(this.state.Authorized === false){
            return(
            <Filler>
                    <Paper style={{padding:24, margin: 16}}>
                        <Grid container spacing={16}>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={4}><Button fullWidth color='primary' variant='contained' onClick={this.Auth}>Authorize</Button></Grid>
                            <Grid item xs={4}></Grid>
                        </Grid>
                    </Paper>
            </Filler>)
        }
        Auth = () => {
        hello.init(
            {windows: '9157ef49-4ec9-491b-94a2-a31b6963bf98'},
            {redirect_uri : '../',
             oauth_proxy : 'https://auth-server.herokuapp.com',
             oauth_version: '2.0' // probably 1.0a with hello.js
           },{scope: 'email'}
          
       );
       hello('windows').login().then( (res) => {console.log('hello')
                                                console.log(res) 
                                                this.setState({Authorized:res})})
        }
    */