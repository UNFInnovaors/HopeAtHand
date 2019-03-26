import React from 'react'
import { Button, Grid, TextField, Select, MenuItem, Paper, Typography, Divider  } from '@material-ui/core'
import Heading from'../../../components/UI Components/Heading/Heading'
import CreateAccountModal from '../../../components/UI Components/Modals/CreateAccountModal'
import EachUser from './eachUser';

const AdminLayout = (props) => {
    const Facilitators = props.facilitators === null ? <Heading>No Matching Results</Heading> : 
        props.facilitators.map( (fac,index) => {
            console.log(fac)
            return <EachUser id={fac.facilitatorID} role={fac.role} name={fac.email} update={props.update}/>
        })
    const Search = props.searchType === 'Name' ? 

            <Grid xs={6}style={{marginTop:16}}>
                <TextField variant='standard' label='Enter Username' onChange={props.handleChange} value={props.search}></TextField> 
            </Grid>: 
             <Grid xs={6}style={{marginTop:16}}>
                <Select
                    style={{minWidth:100}}
                    value={props.search}
                    onChange={props.handleChange}
                >
                    <MenuItem value={'Inactive'}>Inactive</MenuItem>
                    <MenuItem value={'Facilitator'}>Facilitator</MenuItem>
                    <MenuItem value={'Creating Facilitator'}>Creating Facilitator</MenuItem>
                    <MenuItem value={'Administrator'}>Administrator</MenuItem>
                </Select>
            </Grid>
        
    return(
    <Grid container spacing={24}>
       
            <Grid container item xs={3} style={{borderWidth:1, borderStyle:'solid', borderColor:'black', marginLeft:16}}>
                    
                    <Grid item xs={6}>Search For Facilitator by :</Grid>
                    <Grid item xs={6}>
                        <Select
                            style={{minWidth:150}}
                            value={props.searchType}
                            onChange={props.changeSearchType}
                        >
                            <MenuItem value={'Name'}>Name</MenuItem>
                            <MenuItem value={'Role'}>Role</MenuItem>
                        </Select>
                    </Grid>
                    
                            {Search}
                    <Grid xs={2}style={{marginTop:16}}><Button style={{minWidth:150}} color='secondary' variant='contained' onClick={props.searchMethod}>Search</Button></Grid>
                    <Grid item xs={2}style={{marginTop:16}}></Grid>
            </Grid>
            <Grid item xs={3}><Typography align='center' variant='h3'>Manage Facilitators</Typography></Grid>
            <Grid style={{marginTop:16, marginLeft:70}} xs={2}><CreateAccountModal reload={props.reload}/></Grid>
            <Grid style={{marginTop:16, marginLeft:70}} xs={2}><Button color='primary' fullWidth onClick={props.update} variant='contained'>See All Facilitators</Button></Grid>
            
            <Grid item container xs={12} style={{marginTop:16}}>
                <Grid xs={2}><Typography variant='headline' style={{marginLeft: 16}}><b>Email</b></Typography></Grid>
                <Grid xs={2}><Typography variant='headline'><b>Current Role</b></Typography></Grid>
                <Grid xs={2}><Typography variant='headline'><b>Organization</b></Typography></Grid>
                <Grid xs={6}><Typography variant='headline'><b>Actions</b></Typography></Grid>
            <Grid xs={12}><Divider></Divider></Grid>
            </Grid>
            {Facilitators}
    </Grid>)
}

export default AdminLayout