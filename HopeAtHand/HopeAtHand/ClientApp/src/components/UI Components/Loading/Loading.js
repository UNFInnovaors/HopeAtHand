import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography, Grid} from '@material-ui/core'

import Filler from '../../HOC/Filler'

const Loading = (props) => {
    return (
        <Grid container item xs={12}>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
                <Typography variant='headline'><CircularProgress/></Typography>
            </Grid>
        </Grid>)
}

export default Loading