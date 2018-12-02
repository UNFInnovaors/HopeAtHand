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
    render(){
        
        let disabled = (this.state.Username === null || this.state.Username === "" || this.state.Password === null || this.state.Password === "")
        console.log(this.state, disabled)
        return <LogInForm logIn={this.props.login}
                            buttonDisabled={disabled} 
                            changeUsername={this.ChangeUsername} 
                            changePassword={this.ChangePassword}/>
    }
}

export default Login