import React, { Component } from 'react'

import {Grid, Typography, Button, TextField} from '@material-ui/core'

import Filler from  '../../../../../../../components/HOC/Filler'
import Heading from '../../../../../../../components/UI Components/Heading/Heading'

class SearchAll extends Component{

    state = {
        SearchString:''
    }

    componentDidMount(){

    }

    handelChange = (event) => {
        this.setState({SearchString: event.target.value})
    }

    Search = () => {

    }
    render(){

        return(
            <Grid container >
                <Heading>This is search all</Heading>
                <Grid container item xs={12}>
                <Grid xs={3}><TextField label='Enter Value To Search For' value={this.state.SearchString}></TextField></Grid>
                <Grid xs={12} className={'test1'}></Grid>
                    <Grid style={{marginTop:'2%'}} xs={3} item><Button variant="contained" color="primary" fullWidth onClick={this.Search}>Search</Button></Grid>
                </Grid>
            </Grid>
        )
    }
}

export default SearchAll