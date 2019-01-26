import React, { Component } from 'react'

import ReusableSelect from '../../../../components/UI Components/ReuseableSelect'
import SearchHOC from './SearchFormByType/SearchHOC/SearchHOC'

import {Grid, Paper} from '@material-ui/core'
import Heading from '../../../../components/UI Components/Heading/Heading'
import Filler from '../../../../components/HOC/Filler'

class SearchForm extends Component{

    state = {}

    componentDidMount(){

    }

    render(){
        console.log('this is props in sarch form', this.props)
        return(
                <Paper style={{padding:36}}>
                    <Grid container>
                        <Heading>Search Form</Heading>
                        <Grid item xs={3}></Grid>
                        
                        <Grid item xs={6}>
                            <ReusableSelect 
                                label="What Would You Like To Search For"
                                changeStateOfOptions={this.props.selectSearchDomain} 
                                value={this.props.selectedSearchDomain} 
                                valuesForOptions={this.props.searchOptions} >
                            </ReusableSelect>
                        </Grid>
                        <Grid item xs={3}></Grid>
                        
                        <Grid style={{paddingTop:'2.5%'}} item xs={12}><SearchHOC searchDomain={this.props.searchDomain} setSearchResults={this.props.setSearchResults}/></Grid>
                        
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                        <Grid item xs={3}></Grid>
                    </Grid>
                </Paper>
        )
    }
}

export default SearchForm