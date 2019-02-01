import React, {Component } from 'react'

import {post} from '../../../components/Axios/Instances'
import {Grid, Select, Button, MenuItem} from '@material-ui/core'
import SnackbarContent from '@material-ui/core/SnackbarContent';
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


    render(){


        return(
        <Filler>
            <Grid container item xs={12}>
                <Grid item xs={1}></Grid>
                <Grid item xs={1}>Username : </Grid>
                <Grid item xs={2}>{this.props.name}</Grid>
                <Grid item xs={2}>Current Role : {this.props.role} </Grid>
                <Grid item xs={1}>Select New Role : </Grid>
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
                <Grid item xs={2}><Button fullWidth color='secondary' variant='contained' onClick={this.changeRole}>Update Role</Button></Grid>
            </Grid>
        </Filler>)
    }
}

export default EachUser