import React, {Component} from 'react'
import {Typography, Grid, Button, Paper, TextField, FormControl} from '@material-ui/core'
import Heading from '../../../components/UI Components/Heading/Heading'
import BigHeading from '../../../components/UI Components/Heading/BigHeading'
import SearchResults from '../../../Containers/PrimarySearchComponent/PrimarySearchComponents/SearchResults/SearchResults'
import Star from '@material-ui/icons/StarBorder'
import StarFilled from '@material-ui/icons/Star'
import ReadOnlyThemes from '../../../components/UI/ReusableThemeSelect/ReadOnlyThemeBox'
import Filler from '../../../components/HOC/Filler'
import Axios from 'axios'
class LessonPlanData extends Component{

    state={

    }

    componentDidMount(){

    }

    DownloadCompleteLesson = () => {
      
            console.log(this.props.document.completeLessonPlanURL, "is being downloaded")
            Axios({
                url: this.props.document.completeLessonPlanURL,
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.setAttribute('download', this.props.document.title+'Complete.'+this.determineFileEnding(this.props.document.completeLessonPlanURL));
                document.body.appendChild(link);
                link.click();
              });
    }

    DownloadOutlineLesson = () => {
       
            console.log(this.props.document.outlineURl, "is being downloaded")
            Axios({
                url: this.props.document.completeLessonPlanURL,
                method: 'GET',
                responseType: 'blob', // important
              }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.setAttribute('download', this.props.document.title+'Outline.'+this.determineFileEnding(this.props.document.outlineURl));
                document.body.appendChild(link);
                link.click();
              });
    }

    determineFileEnding = (document) => {
        if(document === "" | document === null)
          return ""
        //console.log(document.substring(document.length -5).split('.')[1])
        return(document.substring(document.length -7).split('.')[1].toLowerCase())
      }

      RenderNotes = (Notes) => {
        if(Notes === null || Notes.length === 0 ){
            return <Typography align='left' variant='body1' style={{marginTop:4}}>No notes have been added</Typography>
        }
        let NotesMap = Notes.map( (note, index) => {
            return(
                <Typography align='left' key={index} variant='body1' style={{marginTop:4}}>{note}</Typography>
            )
        })
        return NotesMap
      }

      RenderLocations = (Locations) => {
        if(Locations === null || Locations.length === 0 ){
            return <Typography align='left' variant='body1' style={{marginTop:4}}>No locations have been added</Typography>
        }
        let LocationsMap = Locations.map( (location, index) => {
            return(
                <Typography align='left'  key={index} variant='body1' style={{marginTop:4}}>{location}</Typography>
            )
        })
        return LocationsMap
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
        let locations = this.RenderLocations(this.props.locations)
        let notes = this.RenderLocations(this.props.notes)
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
                            <Grid xs={3} item><Button variant='contained' color='primary' onClick={this.DownloadOutlineLesson} fullWidth>Download Lesson Plan Outline</Button></Grid>
                            <Grid xs={3} item><Button variant='contained' color='primary' onClick={this.props.enableEditing} fullWidth>Enable Editing</Button></Grid>
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
                                        {notes}
                                    </Paper>
                                </Grid>
                                <Grid item container xs={12} spacing={8}>
                                    <Grid xs={7} item style={{margin:4, marginLeft:16}}>
                                        <TextField style={{fontSize:16}} variant='standard' label='Enter a new note' fullWidth value={this.props.newNoteVal} onChange={this.props.newNote}/>
                                    </Grid>
                                    
                                    <Grid xs={4} item style={{margin:4}}>
                                        <Button variant='contained' fullWidth color='primary' onClick={this.props.addNote}>Add Note</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid xs={6}  item container>
                                <Grid xs={12} item style={{padding:8}}><BigHeading>Locations</BigHeading></Grid>
                                <Grid xs={12} item style={{padding:8}}>
                                    <Paper style={{width: '100%', padding:6, height:350, overflowY:'scroll'}}>
                                        {locations}
                                    </Paper>
                                </Grid>
                                <Grid item container xs={12} spacing={16}>
                                    <Grid xs={7} style={{margin:4, marginLeft:16}} item>
                                            <TextField  InputStyles={{fontSize:16}} fullWidth variant='standard' label='Enter a new location' fullWidth value={this.props.newLocationVal} onChange={this.props.newLocation}/>
                                    </Grid>
                                   
                                    <Grid xs={4} style={{margin:4}} item>
                                        <Button variant='contained' fullWidth color='primary' onClick={this.props.addLocation}>Add Location</Button>
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

export default LessonPlanData