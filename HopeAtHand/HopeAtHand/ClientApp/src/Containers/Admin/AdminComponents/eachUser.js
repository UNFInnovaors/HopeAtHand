import React, {Component } from 'react'

import {post} from '../../../components/Axios/Instances'
import {Grid, Select, Button, MenuItem, Divider} from '@material-ui/core'
import Filler from '../../../components/HOC/Filler'

class EachUser extends Component{

    state = {
        Role: "Select New Role"
    }

    componentDidMount(){
        this.setState({ Role : this.props.role})
    }

    handleChange = (event) => {
        this.setState({Role: event.target.value})
    }

    changeRole = () => {
        const ChangeRoleDTO = {
            NewRole: this.state.Role,
            FacilitatorId : this.props.id
        }
        post('/user/ChangeRole', ChangeRoleDTO).then( res =>{
            this.forceUpdate()
            this.props.update()
            }
        )
    }

    resetPassword = () => {
        const ResetDTO = {
            email : this.props.id
        }
        post('/user/Reset', ResetDTO).then(res => {
            if(res.data == "Ok"){

            } else {

            }
        })
    }


    render(){


        return(
        <Filler>
            <Grid container item xs={12} style={{marginLeft: 8}}>
            
                <Grid item xs={2}>{this.props.name}</Grid>
                <Grid item xs={2}>{this.props.role} </Grid>
                <Grid item xs={2}>{this.props.org}</Grid>
                <Grid item xs={1}>Change Role : </Grid>
                <Grid item xs={2}>
                <Select
                    style={{minWidth:200}}
                    value={this.state.Role}
                    onChange={this.handleChange}
                >
                    <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    <MenuItem value={'Facilitator'}>Facilitator</MenuItem>
                    <MenuItem value={'Creating Facilitator'}>Creating Facilitator</MenuItem>
                    <MenuItem value={'Administrator'}>Administrator</MenuItem>
                </Select>
                </Grid>
                <Grid item xs={1}><Button fullWidth color='secondary' variant='contained' onClick={this.changeRole} style={{width:'97%'}}>Update Role</Button></Grid>
                <Grid item xs={1}><Button fullWidth color='secondary' variant='contained' onClick={this.resetPassword} style={{width:'97%'}}>Reset Password</Button></Grid>
                <Grid item xs={12} style={{marginTop:12}}><Divider></Divider></Grid>
            </Grid>
        </Filler>)
    }
}

export default EachUser