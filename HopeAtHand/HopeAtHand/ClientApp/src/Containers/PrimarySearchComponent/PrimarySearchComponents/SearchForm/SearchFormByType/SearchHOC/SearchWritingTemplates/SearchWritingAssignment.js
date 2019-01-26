import React, { Component } from 'react';
import Filler from '../../../../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import SearchSelect from '../../../../../../../components/UI/ThemeSelect/ThemeSelect'
class SearchWriting extends Component{
    state = {

    }

    componentDidMount(){

    }

    render(){
    let createForm = <div></div>
        createForm=
        <Filler>
            <Grid container xs={12}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Search for writing templates</Typography>
                    </Grid>
                </Grid>
                <Grid item container spacing={24} xs={12}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Please Name the Writing Assignment" onChange={this.props.poemDataChangeHandler}  inputProps={{"data-input":"name"}}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Please Describe the Type of Writing" onChange={this.props.poemDataChangeHandler} inputProps={{"data-input" : "writingType"}}></TextField>
                    </Grid>
                </Grid>
                <Grid item style={{marginTop:16}} xs={12}>
                        <Grid xs={3}><Button fullWidth color='primary' variant='contained'>Search</Button></Grid>
                </Grid>
            </Grid>
        </Filler>
    
    return(
    <Filler>
            {createForm}
    </Filler>)
    }
}

export default SearchWriting