import React, { Component } from 'react'

import Layout from './PrimarySearchComponents/Layout'
import LessonPlan from '../../components/UI Components/Modals/ViewLessonPlan'
import Document from '../../components/UI Components/Modals/ViewDocumentNoModal'

import Filler from '../../components/HOC/Filler'
class PrimarySearchSmartContainer extends Component{

    state = {
        DocumentTypes: ['Poem', 'Writing Template', 'Art Piece'],
        SearchOptions: ['Choose how you would like to search','Lesson Plans','Art Pieces','Poems','Writing Templates'],
        SearchOptions2: ['Choose how you would like to search','Art Pieces','Poems','Writing Templates'],
        
        //Search MetaData
        ChosenSearchOption: 'Initial',
        SearchAll: false,
        SearchFavorites:false,
        SearchString: "",

        //Results
        SearchResults:[],

        //ViewDocumentData
        ViewLessonPlan : null,
        ViewDocument: null
    }
    componentWillUnmount(){
        sessionStorage.removeItem("ArtSearch")
    }
    componentDidMount(){
        if(sessionStorage.getItem("ArtSearch")){
            this.setState({SearchResults: JSON.parse(sessionStorage.getItem("ArtSearch"))})
        }
    }

    BeginLessonPlanView = (document) => {
        this.setState({ViewLessonPlan:document})
    }

    CancelLessonPlanView = () => {
        this.setState({ViewLessonPlan : null})
    }

    ChooseSearchOption = (ChosenSearchOption) => {
        sessionStorage.removeItem("ArtSearch")
        this.setState({ ChosenSearchOption })
    }

    ChooseSearchString =( SearchString ) => {
        this.setState({ SearchString })
    }

    SetSearchResults = (searchResults) => {
        if(searchResults !== [])
        {
            sessionStorage.setItem("ArtSearch", JSON.stringify(searchResults))
        }
        
        this.setState({ SearchResults: searchResults })}

    BeginDocumentView = (document) => {
        this.setState({ViewDocument: document})
    }
    CancelDocumentView = () => {
        this.setState({ViewDocument: null})
    }
    render(){
        if(sessionStorage.getItem("ArtSearch") !== null && this.state.SearchResults.length === 0 && JSON.parse(sessionStorage.getItem("ArtSearch")).length > 0 ){
            this.setState({SearchResults: JSON.parse(sessionStorage.getItem("ArtSearch"))})
        }
        if(this.state.ViewLessonPlan && ! this.state.ViewDocument)
        {
            return(
                <LessonPlan 
                    ViewLessonPlan={this.state.ViewLessonPlan}
                    cancelViewDocument={this.CancelLessonPlanView}
                    beginDocumentView={this.BeginDocumentView}
                    cancelDocumentView={this.CancelDocumentView}
                    
                />
            )
        }
        if(this.state.ViewDocument){
            return(   
                <Filler>
                    <Document
                        viewDocument={this.state.ViewDocument}
                        cancelDocumentView={this.CancelDocumentView}/>
                </Filler>
            )
                
        }
        return(

            <Layout  
                documentTypes={this.state.DocumentTypes}
                searchOptions={this.state.SearchOptions} 
                searchOptions2={this.state.SearchOptions2} 
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
                beginDocumentView={this.BeginDocumentView}
                
            ></Layout>

        )
    }
}

export default PrimarySearchSmartContainer