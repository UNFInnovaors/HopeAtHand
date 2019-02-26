import React, { Component } from  'react'
import Filler from '../../HOC/Filler'
import {get, post} from '../../Axios/Instances'
import ImageViewer from '../ImageViewerComponent/ImageViewComponent'
import LessonPlanMetaData from '../../../Containers/LessonPlanComponents/LessonPlanData/LessonPlanData'
import LessonPlanEditData from '../../../Containers/LessonPlanComponents/LessonPlanEditData/LessonPlanEditData'
import Snackbar from '../../UI/SnackBar/Snackbar';
import axios from 'axios'
import Heading from '../Heading/Heading';
  
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
      NewLocation:"",
      DisplayComplete: "Please Select A New Complete Lesson Plan",
      DisplayOutline: "Please Select A New Outline Document",
      DisplayPicture: "Please Select A New Picture"
    };

    componentDidMount(){ //+ props.document.documentId
      console.log(this.props, this.state, 'This is component did mount')
      //console.log(this.props.ViewLessonPlan.lessonPlanId)
      if(!this.props.ViewLessonPlan)
      {
        return
      }   
      this.onLoad()
      }

      shouldComponentUpdate(nextProps, nextState){
        if(nextProps.ViewLessonPlan && !this.props.ViewLessonPlan){
          console.log('causafjkafnasdjkofnasjkflas')
          this.onLoad()
          return true
        }
        return true
      }

    onLoad = () => {
      get('/Search/SearchForLessonsById/'+this.props.ViewLessonPlan.lessonPlanId).then( res => {
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
        if(this.state.ImageIndex + 1 > this.props.components.length){
            this.setState({ImageIndex:0})
        }
        else{
            let newIndex = this.state.ImageIndex
            this.setState({ImageIndex: newIndex + 1 })
        }
    }

    EnableEditing = () => {
      this.setState({Editing: true})
    }

    CancelEditing = () => {
      this.setState({Editing:false})
    }

    /*These method control the editing of componenets*/
    UpdateLessonPlanName = (newName) => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update: newName
      }
      post('/LessonPlan/UpdateName', updateDTO).then(res => {
        console.log(res)
        let document = JSON.parse(JSON.stringify(this.state.Document))
        document.title = res.data
        this.setState({Document: document})
      })
    }

    RemoveNotes = (indexToRemove) => {
      let NotesAsArray = [...this.state.Notes]
      NotesAsArray.splice(indexToRemove, 1)
      console.log(NotesAsArray)
      this.setState({Notes:NotesAsArray})
    }

    RemoveLocations = (indexToRemove) => {
      let LocationsArray = [...this.state.Locations]
      LocationsArray.splice(indexToRemove, 1)
      console.log(LocationsArray)
      this.setState({Locations:LocationsArray})
    } 
    UpdateNotes = () => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update: this.state.Notes.join(this.state.Delimiter)
      }
      post('/LessonPlan/UpdateNotesFromEdit', updateDTO).then(res => {
        let newArray = res.data.split(this.state.Delimiter)
        this.setState({Notes:newArray, Open:true, Message:'Notes Have Been Successfully Updated'})
      })
    }

    UpdateLocations = () => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update: this.state.Locations.join(this.state.Delimiter)
      }
      post('/LessonPlan/UpdateLocationsFromEdit', updateDTO).then(res => {
        let newArray = res.data.split(this.state.Delimiter)
        this.setState({Locations: newArray, Open:true, Message:'Locations Have Been Successfully Updated'})

      })
    }

    UpdateThemes = () => {
      const updateDTO = {
        lessonPlanId : this.state.Document.lessonPlanId,
        update : sessionStorage.getItem("LessonPlanEdit")
      }
      console.log('THis is the updateDTO', updateDTO)
      post('LessonPlan/UpdateThemesFromEdit', updateDTO).then( res => {
        this.setState({Open: true, Message:'Themes Have Been Successfully Updated'})
      })
    }
    Close = () => {
      this.setState({Open:false})
    }

    SelectComplete = (event) => {
      this.setState({Complete: event.target.files[0], DisplayComplete: event.target.files[0].name && "Ready To Upload"})
    }

    SelectOutline = (event) => {
      this.setState({Outline: event.target.files[0],  DisplayOutline: event.target.files[0].name && "Ready To Upload"})
    }

    SelectPicture = (event) => {
      this.setState({Picture: event.target.files[0],  DisplayPicture: event.target.files[0].name && "Ready To Upload"})
    }

    PostData = (location) => {
      /*if(!this.validatePostData())
         return*/
      
       var file=null
       switch(location){
         case 'Complete':
          file=this.state.Complete
          break;
         case 'Outline':
          file=this.state.Outline
          break;
         case 'Picture':
          file=this.state.Picture
          break;
       }
       var bodyFormData = new FormData();
       bodyFormData.set('file', file)
       bodyFormData.set('Id', this.state.Document.lessonPlanId)
       
       console.log(bodyFormData)
       axios.post('/api/LessonPlan/'+location,bodyFormData,{
         headers:{
                       'Content-Type': 'multipart/form-data; boundary=absdfabs',
                       'Content-Disposition': 'form-data'
        }}).then(res => {
           console.log(res)
           if(res.data === null){
             this.setState({Loading: false, Error: true})
           }
           this.setState({Loading:false,       
           DisplayComplete: "Please Select A New Complete Lesson Plan",
           DisplayOutline: "Please Select A New Outline Document",
           DisplayPicture: "Please Select A New Picture", 
           Open:true, 
           Message:"File Upload Successful"})
           this.onLoad();
       })
       this.setState({Loading: true})
     }


  
    render() {
      if(!this.props.ViewDocument && !this.state.Document){
        return <Heading>Loading</Heading>
      }
      const metaDataViewer = this.state.Editing === false ? 
          <LessonPlanMetaData enableEditing={this.EnableEditing} style={{marginTop:16}} document={this.state.Document}
           notes={this.state.Notes} locations={this.state.Locations} addNote={this.AddNewNote} addLocation={this.AddNewLocation}
           newNote={this.NewNote} newLocation={this.NewLocation} newNoteVal={this.state.NewNote} newLocationVal={this.state.NewLocation}
           beginDocumentView={this.props.beginDocumentView} cancelDocumentView={this.props.cancelDocumentView} cancelViewDocument={this.props.cancelViewDocument}/>          : 

          <LessonPlanEditData cancelEditing={this.CancelEditing} style={{marginTop:16}} document={this.state.Document}
           notes={this.state.Notes} locations={this.state.Locations} addNote={this.AddNewNote} addLocation={this.AddNewLocation}
           newNote={this.NewNote} newLocation={this.NewLocation} newNoteVal={this.state.NewNote} newLocationVal={this.state.NewLocation}
           updateLessonPlanName={this.UpdateLessonPlanName} removeLocation={this.RemoveLocations} removeNote={this.RemoveNotes}
           updateNotes={this.UpdateNotes} updateLocations={this.UpdateLocations} updateThemes={this.UpdateThemes}
           postData = {this.PostData} displayComplete={this.state.DisplayComplete} displayOutline={this.state.DisplayOutline} displayPicture={this.state.DisplayPicture}
           selectComplete={this.SelectComplete} selectOutline={this.SelectOutline} selectPicture={this.SelectPicture} beginDocumentView={this.props.beginDocumentView}
           cancelDocumentView={this.props.cancelDocumentView} cancelViewDocument={this.props.cancelViewDocument}/>

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
                <Snackbar open={this.state.Open} message={this.state.Message} close={this.Close}/>
            </Filler>
      );
    }
}
  
  // We need an intermediary variable for handling the recursive nesting.
  
  export default LessonPlanView;
