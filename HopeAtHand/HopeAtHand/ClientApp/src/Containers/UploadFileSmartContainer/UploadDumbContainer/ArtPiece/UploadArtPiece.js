import React from 'react';
import Filler from '../../../../components/HOC/Filler'
import { TextField, Grid, Typography, Paper } from '@material-ui/core'
const poem = (props) => {
    let createForm = <div></div>
        createForm=
            <Filler>
                <Grid container xs={12}>
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <Typography variant='h2'>Art Piece Information and Themes</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container spacing={24} xs={12} style={{marginTop:24}}>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={8} className="test1">
                            <TextField fullWidth label="Please enter the art assignment's name" onChange={props.poemDataChangeHandler} inputProps={{"data-input" : "name"}} data-input="name"></TextField>
                        </Grid>
                        <Grid item xs={2}></Grid>
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