import React from 'react'
import { Grid, Button } from '@material-ui/core';


const actions = (props) => {
    return(
    <Grid container spacing={24}>
        <Grid container item xs={12} spacing={24}>
            <Grid item xs={2}></Grid>
            <Grid item xs={4} >
                <Button variant='contained' color={'primary'} fullWidth>Action 1</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant='contained' color={'primary'} fullWidth>Action 2</Button>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
        <Grid container item xs={12} spacing={24}>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}>
                <Button variant='contained' color={'primary'} fullWidth>Action 3</Button>
            </Grid>
            <Grid item xs={4}>
                <Button variant='contained' color={'primary'} fullWidth>Action 4</Button>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>
    </Grid>
    )
}

export default actions