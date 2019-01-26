import React, { Component } from 'react'

import {Grid, Typography, Button} from '@material-ui/core'

import Filler from  '../../../../../../../components/HOC/Filler'
import Heading from '../../../../../../../components/UI Components/Heading/Heading'

class SearchLessonPlans extends Component{

    state = {

    }

    componentDidMount(){

    }

    render(){

        return(
            <Grid container >
                <Heading>This is search lesson plans</Heading>
                <Grid container item xs={12}>
                    <Grid xs={3} item><Button variant="contained" color="primary" fullWidth>Search</Button></Grid>
                </Grid>
            </Grid>
        )
    }
}

export default SearchLessonPlans