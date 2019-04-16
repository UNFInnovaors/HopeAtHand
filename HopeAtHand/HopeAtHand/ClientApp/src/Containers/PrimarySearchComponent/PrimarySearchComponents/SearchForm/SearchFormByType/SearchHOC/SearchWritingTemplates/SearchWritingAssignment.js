import React, { Component } from 'react';
import Filler from '../../../../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import {post} from '../../../../../../../components/Axios/Instances'
import Loading from '../../../../../../../components/UI Components/Loading/Loading'
import ReUsableThemes from '../../../../../../../components/UI/ReusableThemeSelect/ReusableThemeSelect'
import TemplateSearch from '../../../../../../UploadFileSmartContainer/UploadDumbContainer/UploadWritingTemplate/Select'
class SearchWriting extends Component{
   
    state = {
        name: '',
        writingType: '',
        Loading: false,
        WithThemes : false,
    }

    componentDidMount(){

    }

    handleChange = (event) => {
        //console.log(event.target.dataset["input"])
        if(event.target.dataset["input"] === 'name'){
            this.setState({name: event.target.value})
        } else {
            this.setState({whatHappened: event.target.value})
        }
    }

    updateTemplateInSearch = writingType => {
        this.setState({ writingType })
    }
    Search = () => {
        

        let themes = sessionStorage.getItem("WritingAssignmentSearchThemes") === null ? '' : sessionStorage.getItem("WritingAssignmentSearchThemes").split(',')
        
        const WritingAssignmentSearchDTO = {
            name:this.state.name,
            TemplateID:this.state.writingType,
            themes: themes
        }

        if(this.state.WithThemes === true && themes != ''){
           
            post('/search/SearchForWritingAssignmentsWithThemes', WritingAssignmentSearchDTO).then( resultsInner => {
                this.props.setSearchResults(resultsInner.data);
                this.setState({Loading: false})
            }).catch( err => console.log(err))

            this.setState({Loading: true})

            } else {

            post('/search/SearchForWritingAssignments', WritingAssignmentSearchDTO).then( resultsInner => {
                this.props.setSearchResults(resultsInner.data);
                this.setState({Loading: false})
            }).catch( err => console.log(err))

            this.setState({Loading: true})
        }
    }

    SearchWithThemes = () => {
        let withThemes = !this.state.WithThemes
        this.setState({WithThemes : withThemes})
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
                        <TemplateSearch updateTemplate={this.updateTemplateInSearch}></TemplateSearch>
                    </Grid>
                </Grid>
                <Grid item container style={{marginTop:16}} xs={12}>
                        <Grid xs={3}><Button fullWidth color='primary' variant='contained' onClick={this.Search}>Search</Button></Grid>
                        <Grid item xs={6} style={{marginLeft:16}}>
                            <ReUsableThemes destination={'WritingAssignmentSearchThemes'} withThemes={true} themeSearch={this.SearchWithThemes}/>
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