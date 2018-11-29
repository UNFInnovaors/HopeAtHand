import React, { Component } from 'react';
import Filler from '../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import SearchSelect from '../../../../components/UI/ThemeSelect/ThemeSelect'
const poem = (props) => {
    let createForm = <div></div>
        createForm=
            <Filler>
                <Grid container xs={12}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant='h2'>Poem Information and Themes</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={24} xs={12}>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Please enter the Poem's Name" onChange={props.poemDataChangeHandler} data-input="name"></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Please enter the Author's Name" onChange={props.poemDataChangeHandler} data-input="author"></TextField>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Please enter the source of the poem" onChange={props.poemDataChangeHandler} data-input="source"></TextField>
                    </Grid>
                
                    <Grid container item xs={12}>
                        <Grid item xs={4}>
                            <Typography style={{marginTop:'8px'}} variant="display1">Choose Themes :</Typography>
                        </Grid>
                        <Grid item xs={8} justify='center'><SearchSelect updateThemes={props.updateTheme}></SearchSelect></Grid>
                    </Grid>
                    <Grid container xs={12}>
                        <Grid item xs={3}>
                            <Button variant="contained" onClick={props.postData}>Submit</Button>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Filler>
    
    return(
    <Filler>
        <Grid container xs={12}>

                {createForm}
        </Grid>
    </Filler>
    )
}
export default poem



/*
            <Paper  style={(props.selectedDocumentType !== null ?{padding:'16px'} : {display:'None'} )}></Paper>
<input onChange={props.selectFile}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
        />
        <Grid container>
            <Grid item xs={2}>
                <label style={{width: '100%'}} htmlFor="raised-button-file">
                    <Button fullWidth variant="contained" color={"primary"} component="span">Upload</Button>
                </label> 
            </Grid>
            <Grid item xs={3}>
                <input value={(props.fileToUpload === null ? "" : props.fileToUpload.name)}></input>
            </Grid>
        </Grid>*/