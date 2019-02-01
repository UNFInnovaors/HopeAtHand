import React, { Component } from 'react';
import Filler from '../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import SearchSelect from '../../../../components/UI/ThemeSelect/ThemeSelect'
const poem = (props) => {
    let createForm = <div></div>
        createForm=
                <Grid container xs={12}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant='h2'>Writing Template Information and Themes</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={24} xs={12}>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Please Name the Writing Assignment" onChange={props.poemDataChangeHandler}  inputProps={{"data-input":"name"}}></TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField fullWidth label="Please Describe the Target Age Group" onChange={props.poemDataChangeHandler} inputProps={{"data-input" : "writingType"}}></TextField>
                        </Grid>
                    </Grid>
                </Grid>
    
    return(
    <Filler>
        <Grid container xs={12}>

                {createForm}
        </Grid>
    </Filler>
    )
}
export default poem