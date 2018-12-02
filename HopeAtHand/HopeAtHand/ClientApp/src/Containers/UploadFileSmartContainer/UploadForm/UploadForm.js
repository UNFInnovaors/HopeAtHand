import React, { Component } from 'react'
import { Grid, Typography, TextField } from '@material-ui/core'
import Filler from '../../../components/HOC/Filler'

class UploadForm extends Component
{

    state = {

    }

    
    render(){
        return(
            <Filler>
                <Grid container spacing={24}>
                    <Grid container item xs={12}>
                        <Typography variant='h2'>Upload {this.props.documentType}</Typography>
                    </Grid>
                    <Grid container item xs={12} >
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label></TextField>
                        </Grid>
                        <Grid item xs={2}></Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth></TextField>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={24}>
                        <Typography variant='h2'>Upload {this.props.documentType}</Typography>
                    </Grid>
                    <Grid container item xs={12} spacing={24}>
                        <Typography variant='h2'>Upload {this.props.documentType}</Typography>
                    </Grid>
                </Grid>
            
            
            
            
            
            
            
            </Filler>
        )
    }
}

export default UploadForm