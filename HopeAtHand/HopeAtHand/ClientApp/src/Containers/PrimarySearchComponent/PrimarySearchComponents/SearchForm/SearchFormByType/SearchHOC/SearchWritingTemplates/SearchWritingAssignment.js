import React, { Component } from 'react';
import Filler from '../../../../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import {post} from '../../../../../../../components/Axios/Instances'
import SearchSelect from '../../../../../../../components/UI/ThemeSelect/ThemeSelect'
import Loading from '../../../../../../../components/UI Components/Loading/Loading'
import SearchThemes from '../../../../../../../components/UI/ThemeSelect/SearchThemes'
class SearchWriting extends Component{
    state = {
        name: '',
        writingType: '',
        
    }

    componentDidMount(){

    }

    handleChange = (event) => {
        console.log(event.target.dataset["input"])
        if(event.target.dataset["input"] === 'name'){
            this.setState({name: event.target.value})
        } else {
            this.setState({writingType: event.target.value})
        }
    }
    Search = () => {
        
        const WritingAssignmentSearchDTO = {
            name:this.state.name,
            ageGroups:this.state.writingType
        }

        post('/search/SearchForWritingAssignments', WritingAssignmentSearchDTO).then( resultsInner => {
            //console.log('This is the results in poem search',resultsInner);
            this.props.setSearchResults(resultsInner.data);
            this.setState({Loading: false})
        }).catch( err => console.log(err))
        //console.log('this is results out of the method')
        this.setState({Loading: true})
    }

    render(){
        if(this.state.Loading === true){
            <Loading/>;
        }
    let createForm = <div></div>
        createForm=
        <Filler>
            <Grid container xs={12}>
                <Grid container item xs={12}>
                    <Grid item xs={12}>
                        <Typography variant='h4'>Search for writing templates</Typography>
                    </Grid>
                </Grid>
                <Grid item container spacing={24} xs={12} className={'test1'}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Please Name the Writing Assignment" onChange={this.handleChange}  inputProps={{"data-input":"name"}}></TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Please Describe the age group of the piece" onChange={this.handleChange} inputProps={{"data-input" : "writingType"}}></TextField>
                    </Grid>
                </Grid>
                <Grid item container style={{marginTop:16}} xs={12}>
                        <Grid xs={3}><Button fullWidth color='primary' variant='contained' onClick={this.Search}>Search</Button></Grid>
                        <Grid item xs={6} style={{marginLeft:16}}>
                            <SearchThemes/>
                        </Grid>
                </Grid>
            </Grid>
        </Filler>
    
    return(
    <Filler>
            {createForm}
    </Filler>)
    }
}

export default SearchWriting