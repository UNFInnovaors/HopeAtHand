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
    sessionStorage.removeItem("LessonThemes")
  }

  AddLessonPlanComponent = ( id, metaData, type, image) => {
    try{
        let imageView =""
        try{
          imageView = URL.createObjectURL(image[0])
        } catch(err){
          imageView = ""
        }
        const component = {id : id.id, name : metaData["name"], type: type , image : imageView}
      this.setState({LessonPlanComponents : [...this.state.LessonPlanComponents, component]})
    } catch(err){
      console.log("You Choose To Not Upload That File Great Job")
    }
    
  }

  AddLessonFromSearch = (documentToAdd) => {  
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
      //console.log('This is a document in in foreach', document)
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
      //console.log(LessonPlanCreationDTO, 'this is the lesson plan creation DTO')
      post("/LessonPlan/SaveLesson", LessonPlanCreationDTO).then(response => {
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
    try{
      const ending = this.determineFileEnding(event.target.files[0].name)
      switch(event.target.id){
        case "Complete_Lesson":
        if(ending === "pdf" ||  ending === "docx" || ending === "PDF" ||  ending === "DOCX"){
          this.setState({Complete_Lesson: event.target.files[0]})
        } else {
          this.setState({Message:"You must choose a .pdf or .docx file", Open:true})
        }
          break;
        case "OutlineDocument":
        if(ending === "pdf" ||  ending === "docx" || ending === "PDF" ||  ending === "DOCX"){
          this.setState({OutlineDocument: event.target.files[0]})
        } else {
          this.setState({Message:"You must choose a .pdf or .docx file", Open:true})
        }
          break;
        case "OutlinePicture":
          if(ending === "jpg" ||  ending === "JPG" || ending === "PNG" ||  ending === "png"){
            this.setState({OutlinePicture: event.target.files[0]})
          } else {
            this.setState({Message:"You must choose a .jpg or .png file", Open:true})
          }
          break
        default:
          this.setState({Message:"There was an issue uploading the file please try again", Open:true})
      }
    }catch(err){
      console.log("You just choose to not upload a lesson.")
    }
  }
  
  Close = () => {
    this.setState({Open:false})
  }

  LessonPlanNameChangeHandler = (event) => {
    this.setState({LessonPLanName : event.target.value})
  }

  determineFileEnding = (document) => {
    if(document === "")
      return ""
    return(document.substring(document.length -7).split('.')[1].toLowerCase())
  }

  render() {
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