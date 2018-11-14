import React, { Component } from 'react';
import Filler from '../../../../components/HOC/Filler'
import { Button, TextField, Grid } from '@material-ui/core'
import SearchSelect from '../../../../components/UI/ThemeSelect/ThemeSelect'
const poem = (props) => {
    let createForm = <div></div>
    if(props.fileToUpload !== null)
    {
        createForm=
            <Filler>
                <Grid container xs={12} spacing={24}>
                    <Grid item xs={4}>
                        <label>Poem Name : <input onChange={props.poemDataChangeHandler} data-input="name"></input></label>
                    </Grid>
                    <Grid item xs={4}>
                        <label>Poem Author : <input onChange={props.poemDataChangeHandler} data-input="author"></input></label>
                    </Grid>
                    <Grid item xs={4}>
                        <label>Poem Source : <input onChange={props.poemDataChangeHandler} data-input="source"></input></label>
                    </Grid>
                </Grid>
                <Grid container xs={12}>
                    <Grid item xs={11}><SearchSelect updateThemes={props.updateTheme}></SearchSelect></Grid>
                </Grid>
                <Grid container xs={12}>
                    <Grid item xs={3}>
                        <Button variant="contained" onClick={props.postData}>Submit</Button>
                    </Grid>
                </Grid>
            </Filler>
    }
    return(
    <Filler>
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
        </Grid>
        <Grid container xs={12}>
            {createForm}
        </Grid>
    </Filler>
    )
}
export default poem
