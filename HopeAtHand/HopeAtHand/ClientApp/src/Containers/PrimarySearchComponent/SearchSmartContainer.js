import React, { Component } from 'react'

import Layout from './PrimarySearchComponents/Layout'
import LessonPlan from '../../components/UI Components/Modals/ViewLessonPlan'

import Filler from '../../components/HOC/Filler'
class PrimarySearchSmartContainer extends Component{

    state = {
        DocumentTypes: ['Poem', 'Writing Template', 'Art Piece'],
        SearchOptions: ['Choose how you would like to search','Lesson Plans','Art Pieces','Poems','Writing Templates','By Themes','All' ],
        
        //Search MetaData
        ChosenSearchOption: 'Initial',
        SearchAll: false,
        SearchFavorites:false,
        SearchString: "",

        //Results
        SearchResults:[],

        //ViewDocumentData
        ViewLessonPLan : null
    }
    
    componentDidMount(){

    }

    BeginLessonPlanView = (document) => {
        this.setState({ViewLessonPLan:document})
    }

    CancelLessonPlanView = () => {
        this.setState({ViewDocument : null})
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
        if(this.state.ViewLessonPLan)
        {
            return(
                <LessonPlan 
                    viewLessonPlan={this.state.ViewLessonPLan}
                    cancelViewDocument={this.state.CancelLessonPlanView}
                />
            )
        }
        return(

            <Layout  
                documentTypes={this.state.DocumentTypes}
                searchOptions={this.state.SearchOptions} 
                isUpload={this.props.isUpload}               
            
                searchString={this.state.SearchString}
                selectedSearchDomain={this.state.ChosenSearchOption}

                chooseSearchString={this.ChooseSearchString}
                selectSearchDomain={this.ChooseSearchOption}
                addToLesson={this.props.addToLesson}
                
                
                searchResults={this.state.SearchResults}  
                setSearchResults={this.SetSearchResults}
                addFavorites={this.props.addFavorites}

                beginLessonPlanView={this.BeginLessonPlanView}
                
            ></Layout>

        )
    }

}

export default PrimarySearchSmartContainer