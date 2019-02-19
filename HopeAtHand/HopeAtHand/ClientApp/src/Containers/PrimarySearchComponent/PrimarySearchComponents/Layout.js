import React from 'react'
import SearchForm from './SearchForm/SearchForm'
import SearchResults from './SearchResults/SearchResults'
import {Grid, Paper} from '@material-ui/core'

import Filler from '../../../components/HOC/Filler'

const Layout = (props) => {

    return(
        <Filler>
            <Grid container>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <SearchForm
                     selectSearchDomain={props.selectSearchDomain} 
                     searchDomain={props.selectedSearchDomain} 
                     searchOptions={props.searchOptions}
                     setSearchResults={props.setSearchResults}
                     isUpload={props.isUpload}
                     addFavorites={props.addFavorites}/>
                </Grid>
                <Grid item xs={1}></Grid>
                
                <Grid item xs={1}></Grid>
                <Grid style={{marginTop:24}} item xs={10}>
                    <SearchResults searchResults={props.searchResults}
                                    isUpload={props.isUpload}
                                    addToLesson={props.addToLesson}
                                    addFavorites={props.addFavorites}
                                    beginLessonPlanView={props.beginLessonPlanView}/>
                </Grid>
                <Grid item xs={1}></Grid>
            
            
            
            </Grid>
        </Filler>
    )
}

export default Layout