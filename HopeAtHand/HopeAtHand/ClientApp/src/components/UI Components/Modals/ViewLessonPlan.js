import React, { Component } from  'react'
import {Typography, Grid, Button, Tabs, Tab} from '@material-ui/core';
import Filler from '../../HOC/Filler'
import {get, post} from '../../Axios/Instances'
import Heading from '../Heading/Heading';
import ImageViewer from '../ImageViewerComponent/ImageViewComponent'
import LessonPlanMetaData from '../../../Containers/LessonPlanComponents/LessonPlanData/LessonPlanData'
import LessonPlanEditData from '../../../Containers/LessonPlanComponents/LessonPlanEditData/LessonPlanEditData'


  
  class LessonPlanView extends Component {
    state = {
      Document: null,
      Type:null,
      View:"Document",
      ImageIndex : 0,
      URLS: null,
      Editing : false,
      Notes:[],
      Locations:[],
      Delimiter: "@!@",
      NewNote:"",
      NewLocation:""
    };

    componentDidMount(){ //+ props.document.documentId
      console.log(this.props.viewLessonPlan.lessonPlanId)
         get('/Search/SearchForLessonsById/'+this.props.viewLessonPlan.lessonPlanId).then( res => {
            console.log(res)
            const data = res.data
            let urls = []
            urls.push({image:data.imageURL, name:data.title})
            for(let x = 0 ; x < data.artPieces.length; x++ ){
              urls.push({image:data.artPieces[x].imageURL, name:data.artPieces[x].title})
            }
            for(let x = 0 ; x < data.poems.length; x++ ){
              urls.push({image:data.poems[x].imageURL, name:data.poems[x].title})
            }
            for(let x = 0 ; x < data.writingAssignments.length; x++ ){
              urls.push({image:data.writingAssignments[x].imageURL, name: data.writingAssignments[x].title})
            }
            console.log(urls)
            this.SplitNotes(data.notes)
            this.SplitLocations(data.locations)
            this.setState({Document: data,
                           URLS:urls
                          })
        }).catch( err => console.log(err))
      this.setState({ open: true });
    };

    AddNewNote = () => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update: this.state.NewNote
      }
      post('/LessonPlan/UpdateNotes', updateDTO).then( res => {
        console.log(res)
        this.SplitNotes(res.data)
      }).catch( err => {
        console.log(err)
      })
    }

    
    AddNewLocation = () => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update: this.state.NewLocation
      }
      post('/LessonPlan/UpdateLocations', updateDTO).then( res => {
        console.log(res)
        this.SplitLocations(res.data)
      }).catch( err => {
        console.log(err)
      })
    }

    NewNote = (event) => {
      this.setState({NewNote:event.target.value})
    }

    NewLocation = (event) => {
      this.setState({NewLocation:event.target.value})
    }

    SplitNotes = (Notes) => {
      console.log('this is notes in split', Notes)
      if(Notes === null){
        return
      }
      let noteArray = Notes.split(this.state.Delimiter)
      console.log(noteArray, 'this is note array')
      if(noteArray !== null || noteArray.length > 0)
        this.setState({Notes: noteArray})
    }

    SplitLocations = (Locations) => {
      console.log('this is locations in split', Locations)
      if(Locations === null){
        return
      }
      let locationArray = Locations.split(this.state.Delimiter)
      console.log('This is location array', locationArray)
      if(locationArray !== null || locationArray.length > 0)
        this.setState({Locations: locationArray})
    }

    Next = () => {
        if(this.state.ImageIndex + 1 > this.props.components.length)
        {
            this.setState({ImageIndex:0})
        }
        else{
            let newIndex = this.state.ImageIndex
            this.setState({ImageIndex: newIndex + 1 })
        }
    }
  
    handleOpen = () => {
        get('/Document/GetDocument/'+this.props.viewLessonPlan.lessonPLanId).then( res => {
            console.log(res)
            this.setState({Document: res.data.document,
                           Type: res.data.type,
                           Id: res.data.id})
            
        }).catch( err => console.log(err))
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };

    ChangeView = () => {
      if(this.state.View === 'Document'){
        this.setState({View : "Image"})
      } else {
        this.setState({View: "Document"})
      }
    }

    EnableEditing = () => {
      this.setState({Editing: true})
    }

    CancelEditing = () => {
      this.setState({Editing:false})
    }
  
    render() {
      console.log(this.state, this.props, "state and props in new LessonPLanView")
      const metaDataViewer = this.state.Editing === false ? 
          <LessonPlanMetaData enableEditing={this.EnableEditing} style={{marginTop:16}} document={this.state.Document}
           notes={this.state.Notes} locations={this.state.Locations} addNote={this.AddNewNote} addLocation={this.AddNewLocation}
           newNote={this.NewNote} newLocation={this.NewLocation} newNoteVal={this.state.NewNote} newLocationVal={this.state.NewLocation}/>          : 
          <LessonPlanEditData cancelEditing={this.CancelEditing} style={{marginTop:16}} document={this.state.Document}
           notes={this.state.Notes} locations={this.state.Locations} addNote={this.AddNewNote} addLocation={this.AddNewLocation}
           newNote={this.NewNote} newLocation={this.NewLocation} newNoteVal={this.state.NewNote} newLocationVal={this.state.NewLocation}/>

      let document = ""
      /*if(this.state.Document !== null)
        document = this.state.View === 'Document'  ? this.state.Document.documentBlobURL : this.state.Document.imageURL

      const fileType = this.state.Document === null ? null : this.determineFileEnding(document)
      const downloadFileType = this.state.Document === null ? null : this.determineFileEnding(this.state.Document.documentBlobURL)
      const titleForView =  this.state.Document === null ? null :  this.state.Document.title*/
      
        return(
            <Filler>
                <ImageViewer urls={this.state.URLS}/>
                {metaDataViewer}
            </Filler>
      );
    }
}
  
  // We need an intermediary variable for handling the recursive nesting.
  
  export default LessonPlanView;
