import React, { Component } from 'react';
import Filler from '../../components/HOC/Filler';
import CreateDumbComponent from './CreateDumbComponent';
import Axios from 'axios';
import { get } from '../../components/Axios/Instances'

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
    OutlineDocument : null,
    OutlinePicture : null,

  };
  AddLessonPlanComponent = ( id, metaData, type, image) => {
    console.log(
      'This is from db, ', id
      , 'This is the metaData', metaData
      ,'This is the type', type )
      const imageView = URL.createObjectURL(image)
      const component = {id : id, name : metaData["name"], type: type , image : imageView}
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
        component = {id : documentToAdd.poemId, name :documentToAdd.title, type: "Art Piece", image : res.data.document.imageURL}
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
  AddThemes = (ATheme) => {
    //console.log("asdfasf",ATheme, "This is a selected Themes")
    let newList = new Array();
    newList=[1]
    if(this.state.SelectedThemes.length === 0){
      //console.log('This is here')
      newList.push(ATheme)
    }
    else{
      //console.log('This is ow here')
      newList = [1,2,3, ATheme];
    }
    
    //console.log('This is the new list ',  newList)
    this.setState({SelectedThemes : newList})
  }

  ChangeAction = (action) => {
    this.setState({Action:action})
  }

  RemoveDocumentFromPlan = (index) => {
    let current = [...this.state.LessonPlanComponents]  
    current.splice(index,1)
    console.log(current, 'this is current')
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
      documentIds.push(document.id)
    })
    const uploadLessonDTO ={
      LessonPLanName: this.state.LessonPLanName,
      Themes: themesForTransfer,
      DocumentIds: documentIds
    }
    const LessonPlanCreationDTO = {
      name: this.state.LessonPLanName,
      themes: themesForTransfer,
      documents: documentIds,
      imageUrl: this.state.ImageUrl
    }
    console.log(LessonPlanCreationDTO)
    console.log(uploadLessonDTO)
    Axios.post("/API/LessonPlan/SaveLesson", LessonPlanCreationDTO).then(response => console.log(response)).catch(err => console.log(err)) 
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
  
  RemoveThemes = () => {
    console.log("hmmm")
  }

  LessonPlanNameChangeHandler = (event) => {
    this.setState({LessonPLanName : event.target.value})
  }
  render() {
    console.log('This is the state of the lesson plan smart container',this.state, this.props)
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
      </Filler>
    );
  }
}

export default CreateSmartContainer;