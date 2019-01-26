import React, { Component } from 'react'

import Layout from './PrimarySearchComponents/Layout'

import Filler from '../../components/HOC/Filler'
class PrimarySearchSmartContainer extends Component{

    state = {
        DocumentTypes: ['Poem', 'Writing Template', 'Art Piece'],
        SearchOptions: ['Choose how you would like to search','All','Art Pieces','By Themes','Poems','Writing Templates'],
        
        //Search MetaData
        ChosenSearchOption: 'All',
        SearchAll: false,
        SearchFavorites:false,
        SearchString: "",

        //Results
        SearchResults:[]
    }
    
    componentDidMount(){

    }

    ChooseSearchOption = (ChosenSearchOption) => {
        this.setState({ ChosenSearchOption })
    }

    ChooseSearchString =( SearchString ) => {
        this.setState({ SearchString })
    }

    SetSearchResults = (SearchResults) => {
        this.setState({ SearchResults })}

    render(){
        console.log('This is render in my search smart container', this.state)
        return(

            <Layout  
                documentTypes={this.state.DocumentTypes}
                searchOptions={this.state.SearchOptions}                
            
                searchString={this.state.SearchString}
                selectedSearchDomain={this.state.ChosenSearchOption}

                chooseSearchString={this.ChooseSearchString}
                selectSearchDomain={this.ChooseSearchOption}
                
                searchResults={this.state.SearchResults}  
                setSearchResults={this.SetSearchResults}
            ></Layout>

        )
    }

}

export default PrimarySearchSmartContainer