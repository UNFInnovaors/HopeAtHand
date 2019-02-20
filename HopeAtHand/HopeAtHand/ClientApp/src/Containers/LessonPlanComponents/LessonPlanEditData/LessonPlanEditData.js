import React, {Component} from 'react'
import {Typography, Grid, Button, Paper, TextField, FormControl} from '@material-ui/core'
import Heading from '../../../components/UI Components/Heading/Heading'
import BigHeading from '../../../components/UI Components/Heading/BigHeading'
import SearchResults from '../../../Containers/PrimarySearchComponent/PrimarySearchComponents/SearchResults/SearchResults'
import Star from '@material-ui/icons/StarBorder'
import StarFilled from '@material-ui/icons/Star'
import ReadOnlyThemes from '../../../components/UI/ReusableThemeSelect/ReadOnlyThemeBox'
import ReusableThemeSelect from '../../../components/UI/ReusableThemeSelect/ReusableThemeSelect'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import DeleteIcon2 from '@material-ui/icons/Delete'
import Filler from '../../../components/HOC/Filler'
import Axios from 'axios'
class LessonPlanEditData extends Component{

    state={
        NewName : "",
        ChangeLocation:false,
        ChangeNote: false
    }

    componentDidMount(){
        let string = ""
        for(let x = 0 ;x < this.props.document.themes.length; x++){
            if((x + 1) != this.props.document.themes.length){
                string += this.props.document.themes[x].themeName + ','
            } else {
                string += this.props.document.themes[x].themeName
            }
        }
        console.log('This is the value of string', string, this.props.document.themes)
        sessionStorage.setItem("LessonPlanEdit", string)
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
                <Grid xs={12} container key={index * 2}>
                    <Grid xs={11} item>
                        <Typography align='left' variant='body1' style={{marginTop:8}}>{note}</Typography>
                    </Grid>
                    <Grid xs={1} item>
                        <DeleteIcon key={index * 2} fontSize='small' color='secondary'  onClick={() => this.RemoveNote(index)}></DeleteIcon>
                    </Grid> 
                </Grid>)
        })
        return NotesMap
      }

      RenderLocations = (Locations) => {
        if(Locations === null || Locations.length === 0 ){
            return (
                <Typography align='left' variant='body1' style={{marginTop:4}}>No locations have been added</Typography>)
        }
        let LocationsMap = Locations.map( (location, index) => {
            return (
                <Grid xs={12} container key={index}>
                    <Grid xs={11} item>
                        <Typography align='left' variant='body1' style={{marginTop:8}}>{location}</Typography>
                    </Grid>
                    <Grid xs={1} item>
                        <DeleteIcon fontSize='small' color='error' onClick={() => this.RemoveLocation(index)}></DeleteIcon>
                    </Grid> 
                </Grid>)
        })
        return LocationsMap
      }

      UpdateName = (event) => {
          this.setState({NewName:event.target.value})
      }

      SaveName = () => {
          this.props.updateLessonPlanName(this.state.NewName)
      }

      RemoveLocation = (index) => {
        this.props.removeLocation(index)
        if(this.state.ChangeLocation === false)
            this.setState({ChangeLocation : true})
      }

      RemoveNote = (index, string) => {
          this.props.removeNote(index)
          if(this.state.ChangeNote === false)
            this.setState({ChangeNote : true})
      }

      UpdateNotes =() => {
        this.setState({ChangeNote: false})
        this.props.updateNotes()
      }

      UpdateLocations = () => {
          this.setState({ChangeLocation : false})
          this.props.updateLocations()
      }

      Complete = () => {
        this.props.postData('Complete')
     }
        Outline = () => {
        this.props.postData('Outline')
        }
        Picture = () => {
        this.props.postData('Picture')
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
        let notes = this.RenderNotes(this.props.notes)
        return(
            <Filler>
                <Paper style={{padding:4, margin:8}}>
                    <Grid container>
                        <Grid item xs={5} style={{paddingTop:8}}>
                            <BigHeading>Lesson Title: {this.props.document.title}</BigHeading>
                        </Grid>
                        <Grid item xs={4} className={'test2'}><TextField variant='standard' fullWidth onChange={this.UpdateName} label="Enter New Lesson Plan Name"/></Grid>
                        <Grid item xs={2}><Button variant='contained' color='secondary' fullWidth onClick={this.SaveName} disabled={(this.state.NewName === "" ?  true : false)}>Update Name</Button></Grid>
        
                        <Grid item xs={1} style={{paddingTop:8}} style={{textAlign:'right'}}>
                            <Star color='primary' style={{textAlign:'right', marginLeft: 4}} fontSize='large'/>
                        </Grid>
                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4} item><Button variant='contained' color='primary' onClick={this.DownloadCompleteLesson} fullWidth>Download Complete Lesson Plan</Button></Grid>
                            <Grid item xs={3} item><Button variant='contained' color='primary' onClick={this.DownloadOutlineLesson} fullWidth>Download Lesson Plan Outline</Button></Grid>
                            <Grid item xs={3} item><Button variant='contained' color='primary' onClick={this.props.cancelEditing} fullWidth>Cancel Editing</Button></Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} item>
                                <label style={{width: '100%'}} htmlFor="Complete"><Button variant='contained' color='secondary' fullWidth component="span">Select New Complete Lesson Plan</Button></label></Grid>
                            <Grid item xs={4} className={'test2'}><TextField variant='standard' fullWidth disabled value={this.props.displayComplete}></TextField></Grid>
                            <Grid item xs={3}><Button disabled={(this.props.displayComplete === "Please Select A New Complete Lesson Plan" ? true:false)} variant='contained' 
                                color='secondary' fullWidth onClick={() => this.props.postData("Complete") }>Save Changes to Complete Lesson Document</Button></Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} item>
                                <label style={{width: '100%'}} htmlFor="Outline"><Button variant='contained' color='secondary' fullWidth component="span">Select New Lesson Plan Outline</Button></label></Grid>
                            <Grid item xs={4} className={'test2'}><TextField variant='standard' fullWidth disabled value={this.props.displayOutline}></TextField></Grid>
                            <Grid item xs={3}>
                                <Button disabled={(this.props.displayOutline === "Please Select A New Outline Document" ? true : false)} 
                                variant='contained' color='secondary' fullWidth onClick={() => this.props.postData("Outline") }>Save Changes to Outline Document</Button></Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid style={{paddingTop:8}} item container xs={12} spacing={8}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3} item>
                                <label style={{width: '100%'}} htmlFor="Picture"><Button variant='contained' color='secondary' fullWidth component="span">Select New Lesson Plan Picture</Button></label></Grid>
                            <Grid item xs={4} className={'test2'}><TextField variant='standard' fullWidth disabled value={this.props.displayPicture}></TextField></Grid>
                            <Grid item xs={3}>
                                <Button disabled={(this.props.displayPicture === "Please Select A New Picture" ? true : false)} 
                                    variant='contained' color='secondary' fullWidth onClick={() => this.props.postData("Picture")}>Save Changes to Picture</Button></Grid>
                            <Grid item xs={1}></Grid>
                        </Grid>
                        <Grid xs={12} item container style={{marginTop:16}}>
                            <Grid xs={12} item><BigHeading style={{padding:8}}>Themes</BigHeading></Grid>
                            <Grid xs={1} item></Grid>
                            <Grid xs={10} item style={{padding:16}}>
                                <ReusableThemeSelect always={true} destination="LessonPlanEdit" style={{padding:8}}/>
                            </Grid>
                            <Grid xs={1} item></Grid>
                        </Grid>
                        <Grid xs={12} item container spacing={8}>
                            <Grid xs={1} item></Grid>
                            <Grid xs={10} item style={{padding:16}}> 
                                <Button variant='contained' color='secondary' fullWidth style={{padding:8}} onClick={this.props.updateThemes}>Update Themes</Button>
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
                                    <Grid xs={4} item style={{margin:4, marginLeft:16}} className={'test2'}>
                                        <TextField style={{fontSize:16}} variant='standard' label='Enter a new note' fullWidth value={this.props.newNoteVal} onChange={this.props.newNote}/>
                                    </Grid>
                                    <Grid xs={4} item style={{margin:4}}>
                                        <Button variant='contained' fullWidth color='primary' onClick={this.props.addNote}>Add Note</Button>
                                    </Grid>
                                    <Grid xs={3} item><Button variant='contained' color='secondary' fullWidth style={{margin:4}} disabled={(this.state.ChangeNote === false ?  true : false)} onClick={this.UpdateNotes}>Save Changes To Notes</Button></Grid>
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
                                    <Grid xs={4} style={{margin:4, marginLeft:16}} item className={'test2'}>
                                            <TextField  InputStyles={{fontSize:16}} fullWidth variant='standard' label='Enter a new location' fullWidth value={this.props.newLocationVal} onChange={this.props.newLocation}/>
                                    </Grid>
                                   
                                    <Grid xs={4} style={{margin:4}} item>
                                        <Button variant='contained' fullWidth color='primary' onClick={this.props.addLocation}>Add Location</Button>
                                    </Grid>
                                    <Grid xs={3} style={{margin:4}} item>
                                        <Button variant='contained' color='secondary' fullWidth  disabled={(this.state.ChangeLocation === false ?  true : false)} onClick={this.UpdateLocations}>Save Changes To Locations</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <input onChange={this.props.selectComplete}
                            style={{ display: 'none' }}
                            id="Complete"
                            multiple
                            type="file"
                            />
                        <input onChange={this.props.selectOutline}
                            style={{ display: 'none' }}
                            id="Outline"
                            multiple
                            type="file"
                        />
                        <input onChange={this.props.selectPicture}
                            style={{ display: 'none' }}
                            id="Picture"
                            multiple
                            type="file"
                        />
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