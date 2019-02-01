import React, { Component } from 'react'
import LogInForm from './LogInComponents/LoginForm'

class Login extends Component {

    state = {
        Username: null,
        Password: null,
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
        
        let disabled = (this.state.Username === null || this.state.Username === "" || this.state.Password === null || this.state.Password === "")
        return <LogInForm logIn={this.login}
                            buttonDisabled={disabled} 
                            changeUsername={this.ChangeUsername} 
                            changePassword={this.ChangePassword}/>
    }
}

export default Login