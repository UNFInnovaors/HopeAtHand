import React, { Component } from 'react'
import LogInForm from './LogInComponents/LoginForm'
import Filler from '../../components/HOC/Filler'
 


class Login extends Component {

    state = {
        Username: null,
        Password: null,
        ApplicationId: '0c0cb088-99ec-4dcc-943b-ea815d73ee89'
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
        this.props.login(this.state.Username)
    }
    render(){
        var hello = require('hellojs/dist/hello.all.js')
        hello.init(
             {windows: '0c0cb088-99ec-4dcc-943b-ea815d73ee89'},
             {redirect_uri : '/',
             oauth_proxy : 'https://auth-server.herokuapp.com',
              oauth_version: '1.0' // probably 1.0a with hello.js
            }
        );
        let disabled = (this.state.Username === null || this.state.Username === "" || this.state.Password === null || this.state.Password === "")
        return (
            
            <Filler>
                <script src="./dist/hello.all.js"></script>
                <LogInForm logIn={this.login}
                                buttonDisabled={disabled} 
                                changeUsername={this.ChangeUsername} 
                                changePassword={this.ChangePassword}
                    />
                    <button onClick={ () => hello('windows').login().then( () => console.log('hello'))}>windows</button>
            </Filler>
                )
    }
}

export default Login