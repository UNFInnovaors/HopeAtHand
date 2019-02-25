import React, { Component } from 'react'

import Layout from './PrimarySearchComponents/Layout'
import LessonPlan from '../../components/UI Components/Modals/ViewLessonPlan'
import Document from '../../components/UI Components/Modals/ViewDocumentNoModal'

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
        ViewLessonPlan : null,
        ViewDocument: null
    }
    
    componentDidMount(){

    }

    BeginLessonPlanView = (document) => {
        this.setState({ViewLessonPlan:document})
    }

    CancelLessonPlanView = () => {
        this.setState({ViewLessonPlan : null})
    }

    ChooseSearchOption = (ChosenSearchOption) => {
        this.setState({ ChosenSearchOption })
    }

    ChooseSearchString =( SearchString ) => {
        this.setState({ SearchString })
    }

    SetSearchResults = (SearchResults) => {
        this.setState({ SearchResults })}

    BeginDocumentView = (document) => {
        console.log('This is in BeginDocumentView')
        this.setState({ViewDocument: document})
    }
    CancelDocumentView = () => {
        this.setState({ViewDocument: null})
    }
    render(){
        console.log('This is render in my search smart container', this.state)
        if(this.state.ViewLessonPlan)
        {
            console.log('This is render in my search smart container', this.state)
            return(
                <LessonPlan 
                    viewLessonPlan={this.state.ViewLessonPLan}
                    cancelViewDocument={this.state.CancelLessonPlanView}
                />
            )
        }
        if(this.state.ViewDocument){
            console.log("!@#&*(!@#7*@!(37!*(2#&!@*(3&!@*93", this.state.ViewDocument)
            return(   
            <Document
                viewDocument={this.state.ViewDocument}
                cancelDocumentView={this.CancelDocumentView}
            />)
                
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
                beginDocumentView={this.BeginDocumentView}
                
            ></Layout>

        )
    }

}

export default PrimarySearchSmartContainer