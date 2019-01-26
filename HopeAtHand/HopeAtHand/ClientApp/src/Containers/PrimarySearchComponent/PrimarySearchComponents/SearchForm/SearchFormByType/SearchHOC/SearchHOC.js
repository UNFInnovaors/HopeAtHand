import React, { Component } from 'react'

import SearchWritingAssignment from './SearchWritingTemplates/SearchWritingAssignment'
import SearchPoems from './SearchPoem/SearchPoems'
import SearchArtPieces from './SearchArtPiece/SearchArtPieces'
import SearchAll from './SearchAll/SearchAll'
import SearchThemes from './SearchThemes/SearchThemes'
import SearchLessonPlans from './SearchLessonPLans/SearchLessonPlans'
import Heading from '../../../../../../components/UI Components/Heading/Heading'

import Filler from '../../../../../../components/HOC/Filler'
import { Typography, Grid } from '@material-ui/core';
class SearchHOC extends Component{

    state={

    }

    componentDidMount(){

    }

    determineSearchComponent = (searchDomain = "") => {
        console.log('This is in the method', searchDomain)
        switch(searchDomain)
        {
            case 'All':
                return <SearchAll
                            setSearchResults={this.props.setSearchResults}/> ;
            case 'Poems':
                return <SearchPoems
                            setSearchResults={this.props.setSearchResults}/>
            case 'Writing Templates':
                return <SearchWritingAssignment
                            setSearchResults={this.props.setSearchResults}/>
            case 'Lesson Plans':
                return <SearchLessonPlans
                            setSearchResults={this.props.setSearchResults}/>
            case 'Art Templates':
                return <SearchArtPieces
                            setSearchResults={this.props.setSearchResults}/>
            case 'By Themes':
                return <SearchThemes
                            setSearchResults={this.props.setSearchResults}/>
            case 'Art Pieces':
                return <SearchArtPieces
                            setSearchResults={this.props.setSearchResults}/>
            case 'Initial':
                return <Heading>Choose your search domain before continuing</Heading>
            default:
                return <Heading>Invalid Search Option</Heading> 
        }
    }

    render(){
        console.log('This is the props in search HOC', this.props)
        let SearchComponent = this.determineSearchComponent(this.props.searchDomain);
        return(
            <Filler>
                {SearchComponent}
            </Filler>)
    }
}

export default SearchHOC