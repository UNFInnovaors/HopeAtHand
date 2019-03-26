import React, { Component } from 'react';
import Filler from '../../components/HOC/Filler';
import CreateDumbComponent from './CreateDumbComponent';
import Axios from 'axios';
import { get, post } from '../../components/Axios/Instances'
import Heading from '../../components/UI Components/Heading/Heading';
import Snackbar from '../../components/UI/SnackBar/Snackbar'

class CreateSmartContainer extends Component {
  state = {
    IsNew: true,
    LessonPLanName: '',
    DocumentTypes: ['Poem', 'Writing Template', 'Art Piece'],
    SelectedThemes: [],
    LessonPlanComponents : [],
    Action : null,
    NameError: false,
    ThemeError: false,
    ImageUrl:"",
    Complete_Lesson : null,
    CompleteLessonUploaded : false,
    OutlineDocument : null,
    OutlineDocumentUploaded: false,
    OutlinePicture : null,
    OutlinePictureUploaded: false,
    Loading:false
  };

  InitialState = {
    IsNew: true,
    LessonPLanName: '',
    DocumentTypes: ['Poem', 'Writing Template', 'Art Piece'],
    SelectedThemes: [],
    LessonPlanComponents : [],
    Action : null,
    NameError: false,
    ThemeError: false,
    ImageUrl:"",
    Complete_Lesson : null,
    CompleteLessonUploaded : false,
    OutlineDocument : null,
    OutlineDocumentUploaded: false,
    OutlinePicture : null,
    OutlinePictureUploaded: false,
    Loading:false
  };

  componentDidMount(){

  }

  AddLessonPlanComponent = ( id, metaData, type, image) => {
    console.log(
      'This is from db, ', id.id
      , 'This is the metaData', metaData
      ,'This is the type', type,
      'this is image' , image )
      let imageView =""
      try{
        imageView = URL.createObjectURL(image[0])
      } catch(err){
        imageView = ""
      }
      const component = {id : id.id, name : metaData["name"], type: type , image : imageView}
    this.setState({LessonPlanComponents : [...this.state.LessonPlanComponents, component]})
  }

  AddLessonFromSearch = (documentToAdd) => {  
    console.log(documentToAdd, 'this is in create Lesson Smart')
    let id = null
    let component = {id : "Error", name :"Error", type: "Error"}
    if(documentToAdd.poemId)
    {
        get('/Document/GetDocument/'+documentToAdd.poemId).then( res => {
              console.log(res)
              component = {id : documentToAdd.poemId, name :documentToAdd.title, type: "Poem", image : res.data.document.imageURL}
              this.setState({LessonPlanComponents : [...this.state.LessonPlanComponents, component], Loading:false})
            })
    }
    else if(documentToAdd.artPieceId)
    {
      get('/Document/GetDocument/' + documentToAdd.artPieceId).then( res => {
        console.log(res)
        component = {id : documentToAdd.artPieceId, name :documentToAdd.title, type: "Art Piece", image : res.data.document.imageURL}
        this.setState({LessonPlanComponents : [...this.state.LessonPlanComponents, component], Loading:false})
      })
    }
    else if(documentToAdd.writingAssignmentId)
    {
      get('/Document/GetDocument/' + documentToAdd.writingAssignmentId).then( res => {
        console.log(res)
        component = {id : documentToAdd.writingAssignmentId , name :documentToAdd.title, type: "Writing Template", image : res.data.document.imageURL}
        this.setState({LessonPlanComponents : [...this.state.LessonPlanComponents, component], Loading:false})
      })
    }
    this.setState({Loading:true})
  }

  ChangeAction = (action) => {
    this.setState({Action:action})
  }

  RemoveDocumentFromPlan = (index) => {
    let current = [...this.state.LessonPlanComponents]  
    current.splice(index,1)
    this.setState({LessonPlanComponents: current})
  }

  UploadLessonPLan = () => {
    let valid = true
    const themesForTransfer = sessionStorage.getItem("LessonThemes").split(',')

    if(this.state.LessonPLanName === null){
      this.setState({NameError: true})
      valid = false
    }
    if(themesForTransfer === null || themesForTransfer.length < 1 ){
      this.setState({ThemeError:true})
      valid = false
    }
    if(valid === false){
      return
    }

    let documentIds = []
    this.state.LessonPlanComponents.forEach((document) => {
      console.log('This is a document in in foreach', document)
      documentIds.push(document.id)
    })
    
    var bodyFormData = new FormData();
    bodyFormData.set('Complete_Lesson', this.state.Complete_Lesson)
    bodyFormData.set('CompUploaded', this.state.CompleteLessonUploaded)
    bodyFormData.set('LessonOutline', this.state.OutlineDocument)
    bodyFormData.set('OutlineDocUploaded', this.state.OutlineDocumentUploaded)
    bodyFormData.set('OutlinePicture', this.state.OutlinePicture)
    bodyFormData.set('OutlinePicUploaded', this.state.OutlinePictureUploaded)
    
    console.log(bodyFormData)
    Axios.post("/api/BlobCreator/UploadLessonPlanBlobs",bodyFormData,{
      headers:{
                    'Content-Type': 'multipart/form-data; boundary=absdfabs',
                    'Content-Disposition': 'form-data'
     }}).then( res => {
      console.log(res, 'This is the response from the server')
      const LessonPlanCreationDTO = {
        name: this.state.LessonPLanName,
        themes: themesForTransfer,
        documentIds: documentIds,
        completeDocumentURL: res.data.completeDocumentURL,
        documentOutlinePicture : res.data.documentOutlinePicture,
        documentOutlineURL : res.data.documentOutlineURL,
      }
      console.log(LessonPlanCreationDTO, 'this is the lesson plan creation DTO')
      Axios.post("/API/LessonPlan/SaveLesson", LessonPlanCreationDTO).then(response => {
        console.log(response)
        this.setState({...this.InitialState, Message:"The Lesson Was Successfully Uploaded", Open:true,})
      }).catch(err => {
        console.log(err)
        this.setState({Loading:false,  Message:"The Lesson Could Not Be Uploaded", Open:true})
      })
    
    }).catch(err => {
      console.log(err)
      this.setState({Loading: false,  Message:"The Lesson Could Not Be Uploaded", Open:true})
    })  
    this.setState({Loading:true})
  }

  SelectFile = (event) => {
    
    console.log(event.target.id, 'this is the event that is targeted')
    switch(event.target.id){
      case "Complete_Lesson":
        this.setState({Complete_Lesson: event.target.files[0]})
        break;
      case "OutlineDocument":
        this.setState({OutlineDocument: event.target.files[0]})
        break;
      case "OutlinePicture":
        this.setState({OutlinePicture: event.target.files[0]})
        break
      default:
        console.log("error")
    }
  }
  
  Close = () => {
    this.setState({Open:false})
  }

  LessonPlanNameChangeHandler = (event) => {
    this.setState({LessonPLanName : event.target.value})
  }
  render() {
    console.log('This is the state of the lesson plan smart container',this.state, this.props)
    if(this.state.Loading === true){
      return <Heading>Loading</Heading>
    }

    return (
      <Filler>
        <CreateDumbComponent
          //properties
          isNew={this.state.IsNew}
          documentTypes={this.state.DocumentTypes}
          themes={this.state.SelectedThemes}
          components={this.state.LessonPlanComponents}
          action={this.state.Action}
          lessonPLanName={this.state.LessonPLanName}
          //Methods

          lessonPlanNameChangeHandler={this.LessonPlanNameChangeHandler}
          uploadLessonPLan={this.UploadLessonPLan}
          changeAction={this.ChangeAction}
          addComponent={this.AddLessonPlanComponent}
          alterThemes={this.AddThemes}
          deleteTheme={this.RemoveThemes}
          addToLesson={this.AddLessonFromSearch}
          removeFromLesson={this.RemoveDocumentFromPlan}
          addFavorites={this.props.addFavorites}
          selectFile={this.SelectFile}

        //documents
          complete_Lesson={this.state.Complete_Lesson} 
          outlineDocument={this.state.OutlineDocument} 
          lessonPlanImage={this.state. OutlinePicture} 

        ></CreateDumbComponent>
        <Snackbar message={this.state.Message} open={this.state.Open} close={this.Close}/>
      </Filler>
    );
  }
}

export default CreateSmartContainer;