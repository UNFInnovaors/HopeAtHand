import React, {Component} from 'react'
import {Typography, Grid, Button, Paper, TextField} from '@material-ui/core'
import Heading from '../../../components/UI Components/Heading/Heading'
import BigHeading from '../../../components/UI Components/Heading/BigHeading'
import SearchResults from '../../../Containers/PrimarySearchComponent/PrimarySearchComponents/SearchResults/SearchResults'
import Star from '@material-ui/icons/StarBorder'
import StarFilled from '@material-ui/icons/Star'
import ReadOnlyThemes from '../../../components/UI/ReusableThemeSelect/ReadOnlyThemeBox'
import Filler from '../../../components/HOC/Filler'
class LessonPlanEditData extends Component{

    state={

    }

    componentDidMount(){

    }
    DownloadCompleteLesson = () => {
        console.log('Download Complete Lesson Plan')
    }
    DownloadOutlineLesson = () => {
        console.log('Download outline Lesson Plan')
    }

    render(){
        console.log(this.props, this.state, 'This is in the LessonPlan Viewer Data Component')
        let themes = []
        let documents = []
        if(this.props.document != null){
            for(let x = 0 ;x < this.props.document.themes.length; x++){
                themes.push(this.props.document.themes[x].themeName)
            }
            for(let x = 0 ; x < this.props.document.artPieces.length; x++ ){
                documents.push(this.props.document.artPieces[x])
            }
            for(let x = 0 ; x < this.props.document.poems.length; x++ ){
                documents.push(this.props.document.poems[x])
            }
            for(let x = 0 ; x < this.props.document.writingAssignments.length; x++ ){
                documents.push(this.props.document.writingAssignments[x])
            }
        }
          console.log(documents)
        
        if(this.props.document === null)
            return <p>Loading</p>
        return(
            <Filler>
                <Paper style={{padding:4, margin:8}}>
                    <Grid container>
                        <Grid item xs={11} style={{paddingTop:8}}>
                            <BigHeading>Lesson : {this.props.document.title}</BigHeading>
                        </Grid>
                        <Grid item xs={1} style={{paddingTop:8}}>
                            <Star color='primary' style={{textAlign:'right'}} fontSize='large'/>
                        </Grid>
                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid xs={1}></Grid>
                            <Grid xs={4} item><Button variant='contained' color='primary' onClick={this.DownloadCompleteLesson} fullWidth>Download Complete Lesson Plan</Button></Grid>
                            <Grid xs={3} item><Button variant='contained' color='primary' onClick={this.DownloadOutline} fullWidth>Download Lesson Plan Outline</Button></Grid>
                            <Grid xs={3} item><Button variant='contained' color='primary' onClick={this.props.cancelEditing} fullWidth>Cancel Editing</Button></Grid>
                            <Grid xs={1}></Grid>
                        </Grid>
                        <Grid xs={12} item container>
                            <Grid xs={12} item><BigHeading style={{padding:8}}>Themes</BigHeading></Grid>
                            <Grid xs={1} item></Grid>
                            <Grid xs={10} item style={{padding:16}}>
                                <ReadOnlyThemes themes={themes} style={{padding:8}}/>
                            </Grid>
                            <Grid xs={1} item></Grid>
                        </Grid>
                        <Grid xs={12} item container style={{padding:4}}>
                            <Grid xs={6} item container>
                                <Grid xs={12} item style={{padding:8}}><BigHeading>Notes</BigHeading></Grid>
                                <Grid xs={12} item style={{padding:8}}>
                                    <Paper style={{width: '100%', padding:6, height:350, overflowY:'scroll'}}>

                                    </Paper>
                                </Grid>
                                <Grid item container xs={12} spacing={8}>
                                    <Grid xs={7} item style={{margin:4, marginLeft:16}}>
                                        <TextField variant='standard' label='Enter a new note' fullWidth/>
                                    </Grid>
                                    
                                    <Grid xs={4} item style={{margin:4}}>
                                        <Button variant='contained' fullWidth color='primary'>Add Note</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={6}  item container>
                                <Grid xs={12} item style={{padding:8}}><BigHeading>Locations</BigHeading></Grid>
                                <Grid xs={12} item style={{padding:8}}>
                                    <Paper style={{width: '100%', padding:6, height:350, overflowY:'scroll'}}>

                                    </Paper>
                                </Grid>
                                <Grid item container xs={12} spacing={16}>
                                    <Grid xs={7} style={{margin:4, marginLeft:16}} item>
                                        <TextField variant='standard' label='Enter a new location' fullWidth/>
                                    </Grid>
                                   
                                    <Grid xs={4} style={{margin:4}} item>
                                        <Button variant='contained' fullWidth color='primary'>Add Location</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <SearchResults searchResults={documents} isLessonPlanComponent={true}/>
                        </Grid>
                    </Grid>
                </Paper>
            </Filler>
        )
    }
}

export default LessonPlanEditData