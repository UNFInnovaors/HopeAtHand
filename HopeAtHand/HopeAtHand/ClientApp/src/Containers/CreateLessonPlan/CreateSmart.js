import React, { Component } from 'react';
import Filler from '../../components/HOC/Filler';
import CreateDumbComponent from './CreateDumbComponent';
import Axios from 'axios';

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
    ImageUrl:""
  };
  AddLessonPlanComponent = ( id, metaData, type) => {
    console.log(
      'This is from db, ', id
      , 'This is the metaData', metaData
      ,'This is the type', type )
      const component = {id : id, name : metaData["name"], type: type}
    this.setState({LessonPlanComponents : [...this.state.LessonPlanComponents, component]})
  }
  AddLessonFromSearch = (documentToAdd) => {  
    console.log(documentToAdd, 'this is in create Lesson Smart')
    let id = null
    let component = {id : "Error", name :"Error", type: "Error"}
    if(documentToAdd.poemId)
    {
      component = {id : documentToAdd.poemId, name :documentToAdd.title, type: "Poem"}
    }
    else if(documentToAdd.artPieceId)
    {
      component = {id : documentToAdd.poemId, name :documentToAdd.title, type: "Art Piece"}
    }
    else if(documentToAdd.writingAssignmentId)
    {
      component = {id : documentToAdd.poemId, name :documentToAdd.title, type: "Writing Assignment"}
    }
    this.setState({LessonPlanComponents : [...this.state.LessonPlanComponents, component]})
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
  
 /* RemoveThemes = (RemoveTheme, index) => {
    console.log(indexOf(RemoveTheme));
    let newList = [...this.state.SelectedThemes]
    newList.splice(newList.findIndex((el => { 
      return el.value === RemoveTheme.value
    })))
    this.setState({SelectedThemes : newList})
  } */
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

        ></CreateDumbComponent>
      </Filler>
    );
  }
}

export default CreateSmartContainer;