import React, { Component } from 'react'

import {Grid, Typography, Button} from '@material-ui/core'
import SearchTheme from '../../../../../../../components/UI/ThemeSelect/SearchThemes'
import Filler from '../../../../../../../components/HOC/Filler'
import Heading from '../../../../../../../components/UI Components/Heading/Heading'
import Loading from '../../../../../../../components/UI Components/Loading/Loading'

class SearchThemes extends Component{

    state = {
        Loading:false,
    }

    componentDidMount(){

    }

    render(){
        if(this.state.Loading === true)
            return <Loading></Loading>
        return(
            <Grid container >
                <Heading>This is search themes</Heading>
                <Grid container item xs={12}>
                <SearchTheme always={true}/>
                    <Grid style={{marginTop:'2%'}} xs={3} item><Button variant="contained" color="primary" fullWidth>Search</Button></Grid>
                </Grid>
            </Grid>
        )
    }
}

export default SearchThemes