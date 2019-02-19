import React from 'react'
import {Grid, Typography } from '@material-ui/core'

const BigHeading = (props) => {

    return(
        <Grid container>
            
                <Grid item xs={12}>
                    <Typography variant='display2' align='left'>{props.children}</Typography>
                </Grid>
            
        </Grid>
    )
}

export default BigHeading