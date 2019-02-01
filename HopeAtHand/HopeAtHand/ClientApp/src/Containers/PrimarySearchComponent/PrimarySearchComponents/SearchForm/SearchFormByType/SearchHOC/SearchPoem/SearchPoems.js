import React, { Component } from 'react';
import Filler from '../../../../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import {post} from '../../../../../../../components/Axios/Instances'
import Loading from '../../../../../../../components/UI Components/Loading/Loading'
import SearchThemes from '../../../../../../../components/UI/ThemeSelect/SearchThemes'
class SearchPoems extends Component{

    state={
        name:'',
        author:'',
        Loading: false,
    }

    componentDidMount(){

    }

    handleChange = (event) => {
        console.log(event.target.dataset["input"])
        if(event.target.dataset["input"] === 'name'){
            this.setState({name: event.target.value})
        } else {
            this.setState({author: event.target.value})
        }
    }
    Search = () => {
        
        const PoemSearchDTO = {
            name:this.state.name,
            author:this.state.author
        }

        post('/search/SearchForPoems', PoemSearchDTO).then( resultsInner => {
            //console.log('This is the results in poem search',resultsInner);
            this.props.setSearchResults(resultsInner.data);
            this.setState({Loading: false})
        }).catch( err => console.log(err))
        //console.log('this is results out of the method')
        this.setState({Loading: true})
    }
    render(){
        console.log(this.state, 'the state of peom boi')
        if(this.state.Loading === true){
            return <Loading/>;
        }

        const createForm = 
            <Grid container xs={12}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Search for poems</Typography>
                    </Grid>
                </Grid>
                <Grid item container spacing={24} xs={12}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Please enter the Poem's Name" onChange={this.handleChange} inputProps={{"data-input" : "name"}}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Please enter the Author's Name" onChange={this.handleChange} inputProps={{"data-input" : "author"}}></TextField>
                    </Grid>
                    <Grid item xs={3}><Button fullWidth variant='contained' color='primary' onClick={this.Search}>Search</Button></Grid>
                    <Grid item xs={6}>
                        <SearchThemes/>
                    </Grid>
                </Grid>
            </Grid>
            
    return(
        <Filler>
            <Grid container xs={12} spacing={24}>
                    {createForm}
            </Grid>
        </Filler>)
    }
}
export default SearchPoems



/*
            <Paper  style={(props.selectedDocumentType !== null ?{padding:'16px'} : {display:'None'} )}></Paper>
<input onChange={props.selectFile}
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
        />
        <Grid container>
            <Grid item xs={2}>
                <label style={{width: '100%'}} htmlFor="raised-button-file">
                    <Button fullWidth variant="contained" color={"primary"} component="span">Upload</Button>
                </label> 
            </Grid>
            <Grid item xs={3}>
                <input value={(props.fileToUpload === null ? "" : props.fileToUpload.name)}></input>
            </Grid>
        </Grid>
        
        <Grid style={{marginTop:16}}item xs={12}>
            <Grid xs={3}>
                
            </Grid>
        </Grid>
        */
