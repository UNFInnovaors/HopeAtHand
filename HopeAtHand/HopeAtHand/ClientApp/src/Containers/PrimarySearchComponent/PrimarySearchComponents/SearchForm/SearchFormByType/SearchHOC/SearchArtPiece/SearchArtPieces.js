import React, { Component } from 'react';

import {post} from '../../../../../../../components/Axios/Instances'

import Loading from '../../../../../../../components/UI Components/Loading/Loading'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import Filler from '../../../../../../../components/HOC/Filler'
import ReUsableThemes from '../../../../../../../components/UI/ReusableThemeSelect/ReusableThemeSelect'
class SearchArtPieces extends Component{
    
    state = {
        name:"",
        SuppliesNeeded:"",
        Loading: false,
        WithThemes: false
    }

    componentDidMount(){
        
    }

    Search = () => {
        const themes = sessionStorage.getItem("ArtSearchThemes") === null ? '' : sessionStorage.getItem("ArtSearchThemes").split(',')
        if(this.state.WithThemes === true && themes != ''){
           
            const ArtPieceSearchThemesDTO = {
                name:this.state.name,
                suppliesNeeded:this.state.SuppliesNeeded,
                Themes:themes
            }
    
            post('/search/SearchForArtPiecesWithThemes', ArtPieceSearchThemesDTO).then( resultsInner => {
                console.log(resultsInner, 'Helllllpp')
                this.props.setSearchResults(resultsInner.data);
                this.setState({Loading: false, WithThemes: false})
            }).catch( err => console.log(err))
            
            this.setState({Loading: true})
        } else {

            const ArtSearchDTO = {
                name:this.state.name,
                suppliesNeeded:this.state.SuppliesNeeded
            }
    
            post('/search/SearchForArtPieces', ArtSearchDTO).then( resultsInner => {
                console.log(resultsInner, 'Helllllpp')
                this.props.setSearchResults(resultsInner.data);
                this.setState({Loading: false})
            }).catch( err => console.log(err))
            
            this.setState({Loading: true})
        }
    }

    ChangeName = (event) => {
        this.setState({name: event.target.value})
    }

    ChangeSupplies = (event) => {
        this.setState({SuppliesNeeded: event.target.value})
    }
    SearchWithThemes = () => {
        let withThemes = !this.state.WithThemes
        this.setState({WithThemes : withThemes})
    }


    render(){
        if(this.state.Loading === true){
            return <Loading/>
        }
        const createForm=  
            <Grid container xs={12}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Search for Art Pieces</Typography>
                    </Grid>
                </Grid>
                <Grid item container spacing={24} xs={12} className='test1'>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Please enter the art assignment's name" onChange={this.ChangeName} inputProps={{"data-input" : "name"}} data-input="name"></TextField>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                </Grid>
                <Grid xs={3} style={{marginTop:12}}><Button fullWidth color='primary' variant='contained' onClick={this.Search}>Search</Button></Grid>
                <Grid  item xs={7} style={{marginTop:12, marginLeft:12}}>
                    <ReUsableThemes destination={'ArtSearchThemes'} withThemes={true} themeSearch={this.SearchWithThemes}/>
                </Grid>
            </Grid>
            
        
    return(
    <Filler>
        <Grid container xs={12} spacing={24}>
            {createForm}
        </Grid>
    </Filler>
    )}
}
export default SearchArtPieces