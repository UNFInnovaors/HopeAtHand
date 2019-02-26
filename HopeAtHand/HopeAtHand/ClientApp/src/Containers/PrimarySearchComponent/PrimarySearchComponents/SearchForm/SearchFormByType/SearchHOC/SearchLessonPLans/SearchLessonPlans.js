import React, { Component } from 'react';
import Filler from '../../../../../../../components/HOC/Filler'
import { Button, TextField, Grid, Typography, Paper } from '@material-ui/core'
import {post} from '../../../../../../../components/Axios/Instances'
import Loading from '../../../../../../../components/UI Components/Loading/Loading'
import SearchThemes from '../../../../../../../components/UI/ReusableThemeSelect/ReusableThemeSelect'
import {withStyles} from '@material-ui/core/styles'
import './Search.css'
class SearchLessonPlan extends Component{

    state={
        name:'',
        Loading: false,
        WithThemes : false
    }

    componentDidMount(){

    }

    handleChange = (event) => {
        this.setState({name:event.target.value})
    }
    Search = () => {
        
        let themes = sessionStorage.getItem("LessonSearchTheme") === null ? '' : sessionStorage.getItem("LessonSearchTheme").split(',')
        console.log(themes, this.state.WithThemes)
        let PoemSearchDTO = {
            name:this.state.name,
        }
        if(!this.state.WithThemes || themes == ''){
            post('/search/SearchForLessonsByName', PoemSearchDTO).then( resultsInner => {
                //console.log('This is the results in poem search',resultsInner);
                this.props.setSearchResults(resultsInner.data);
                this.setState({Loading: false})
            }).catch( err => console.log(err))
            //console.log('this is results out of the method')
            this.setState({Loading: true})
        } else {
         PoemSearchDTO = {
            name:this.state.name,
            Themes:themes
         }
         post('/search/SearchForLessons', PoemSearchDTO).then( resultsInner => {
            //console.log('This is the results in poem search',resultsInner);
            this.props.setSearchResults(resultsInner.data);
            this.setState({Loading: false})
        }).catch( err => console.log(err))
        //console.log('this is results out of the method')
        this.setState({Loading: true})
        }
    }
    
    SearchWithThemes = () => {
        console.log('This is search', this.state.WithThemes)
        let withThemes = !this.state.WithThemes
        this.setState({WithThemes : withThemes})
    }

    
    render(){
        const {classes} = this.props
        console.log(classes)
        console.log(this.state, 'the state of peom boi')
        if(this.state.Loading === true){
            return <Loading/>;
        }

        const createForm = 
            <Grid container xs={12}>
                <Grid xs={1}></Grid>
                <Grid container item xs={11}>
                    <Grid style={{marginTop:12}} item xs={12}>
                        <Typography variant='h4'>Search for Lesson PLan</Typography>
                    </Grid>
                </Grid>
                <Grid xs={1}></Grid>
                <Grid item container spacing={24} xs={11}>
                    <Grid item xs={6} style={{marginTop:12}} className='test1'>
                        <TextField fullWidth label="Please enter the name of the Lesson Plan" onChange={this.handleChange} 
                        inputStyles={{fontSize:"50px"}}
                        InputProps={{"data-input" : "name", 
                            classes:{
                                input:classes.resize
                            }}}/>
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid item xs={4} style={{marginTop:12}}><Button fullWidth variant='contained' color='primary' onClick={this.Search}>Search</Button></Grid>
                    <Grid item xs={12}>
                        <SearchThemes destination={'LessonSearchTheme'} withThemes={true} themeSearch={this.SearchWithThemes}/>
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
export default withStyles(styles)(SearchLessonPlan)

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        width: 300,
        margin: 100,
    },
    //style for font size
    resize:{
      fontSize:50
    },
    }