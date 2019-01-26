import React, { Component } from 'react';
import Filler from '../../../../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import SearchSelect from '../../../../../../../components/UI/ThemeSelect/ThemeSelect'
class SearchArtPieces extends Component{
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
                            <Typography variant='h4'>Search for Art Pieces</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={24} xs={12}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Please enter the art assignment's name" onChange={this.props.poemDataChangeHandler} inputProps={{"data-input" : "name"}} data-input="name"></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Please enter the art supplies required" onChange={this.props.poemDataChangeHandler} inputProps={{"data-input" : "supplies"}}></TextField>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop:16}} xs={12}>
                        <Grid xs={3}><Button fullWidth color='primary' variant='contained'>Search</Button></Grid>
                    </Grid>
                </Grid>
            </Filler>
    
    return(
    <Filler>
        <Grid container xs={12}>
            {createForm}
        </Grid>
    </Filler>
    )}
}
export default SearchArtPieces