import React, { Component } from 'react'


import {Grid, Typography, Paper} from '@material-ui/core'
import Heading from '../../../../components/UI Components/Heading/Heading';
import Filler from '../../../../components/HOC/Filler'


class SearchResults extends Component{

    state = {
        SelectedLesson: null
    }

    componentDidMount(){

    }

    render(){
        console.log('This is props in search resutls', this.props)
        const contentToRender = (this.props.searchResults.length > 0 ? this.props.searchResults.map( (result, index) => {
            return <p>{index} Search Results Has Been Generated</p>}) : 
            <Heading>There are no resutls for your search</Heading>)
        
        return(
            <Filler>
                
                <Paper style={{padding:36}}>
                <Heading>Search Results</Heading>
                    {contentToRender}
                </Paper>
            </Filler>
        )
    }
}

export default SearchResults


/*let contentToRender = <Heading content={"No results have matched your search"}></Heading>
        if(this.props.searchResults.length > 0){
            contentToRender = this.props.searchResults.map( (result, index) => {
                return <p>{index} Search Results Has Been Generated</p>
            })
        } */

