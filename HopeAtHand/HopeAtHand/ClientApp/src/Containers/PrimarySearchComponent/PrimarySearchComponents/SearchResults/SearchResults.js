import React, { Component } from 'react'

import ResultsDisplayModule from './ResultDisplayModules/ResultDisplayModules'

import {Grid, Typography, Paper} from '@material-ui/core'
import Heading from '../../../../components/UI Components/Heading/Heading';
import Filler from '../../../../components/HOC/Filler'


class SearchResults extends Component{

    state = {
        SelectedLesson: null,
        NumberToDisplay: 4,
        page : 1
    }

    componentDidMount(){

    }
    /*results is an array of search results*/
    FormatResultsForDisplay = (results) =>{
        console.log('This is results', results)
        if(results.length === 0)
        {
            return <Heading>No results</Heading>
        }
        let formattedResults = []
        const resultsPerTow = this.state.NumberToDisplay
        const numberOfRows = Math.ceil(results.length/resultsPerTow)
        //(this.props.numberPerRow !== null ? this.props.numberPerRow : this.state.NumberPerRow );
        //console.log(resultsPerTow, Math.ceil(results.length/resultsPerTow))

        for(let x = 0; x < numberOfRows; x++)
        {
            //console.log('The X Value Is ', x)
            formattedResults[x] = [...results.splice(0,resultsPerTow)]
            //console.log(formattedResults[x], "these are formatted results", results)
        };
        let count = 0;
        let TableToDisplay = formattedResults.map((rowOfResults,index) => {
           // console.log(themeRow, 'This is a themeRow')
            
            return(
                <Grid xs={12} container>
                    {rowOfResults.map((result,index) => {
                        count++;
                        //console.log(theme, "this is a theme")
                        return (
                            <Grid xs={3}><ResultsDisplayModule 
                                            documentData={result} 
                                            isUpload={this.props.isUpload}
                                            addToLesson={this.props.addToLesson}
                                            addFavorites={this.props.addFavorites}>
                                            
                                        </ResultsDisplayModule></Grid>
                        )
                    })}
                </Grid>
            )
        })
        console.log(TableToDisplay)
        return TableToDisplay
    }
    render(){
        console.log(this.props, 'these are the search restulrs')
        const table= this.FormatResultsForDisplay(this.props.searchResults)
        
        if(this.props.isUpload === true)
        {
            return(
                <Filler>
                    <Heading>Search Results</Heading>
                    <Grid container xs={12}>
                        {table}
                    </Grid>
                </Filler>)
        }
        return(
            <Filler>
                
                <Paper style={{padding:36}}>
                    <Heading>Search Results</Heading>
                    <Grid container xs={12}>
                        {table}
                    </Grid>
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

        /*const max = this.state.page * 4
        const min = max - 4
        const resultsToMap=(max < this.props.searchResults.length > 0 ? this.props.searchResults.slice(min, max) : this.props.searchResults.slice(min, this.props.searchResults.length))
        console.log('This is all the results', this.props.searchResults)
        console.log('This is sliced results', resultsToMap)
        const contentToRender = (this.props.searchResults.length > 0 ? resultsToMap.map( (result, index) => {
            return <Grid xs={3}>
                        <ResultsDisplayModule documentData={result}/>
                    </Grid>}) : 
            <Heading>There are no results for your search</Heading>)*/
