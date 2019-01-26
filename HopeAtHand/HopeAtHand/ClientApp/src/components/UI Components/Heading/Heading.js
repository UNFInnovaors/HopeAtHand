import React from 'react'

import {Grid, Typography } from '@material-ui/core'

const Heading = (props) => {

    return(
        <Grid style={{marginTop:'2.5%'}} container>
            <Grid item xs={3}></Grid> 
                <Grid item xs={6}>
                    <Typography variant={props.variant ? props.variant : 'headline'} align='center'>{props.children}</Typography>
                </Grid>
            <Grid item xs={3}></Grid>
        </Grid>
    )
}

export default Heading