import React, { Component } from 'react';
import Filler from '../../components/HOC/Filler';
import CreateDumbComponent from './CreateDumbComponent';

class CreateSmartContainer extends Component {
  state = {
    IsNew: true,
    LessonPLanName: '',
    DocumentTypes: ['Poem', 'Writing Template', 'Art Piece'],
    SelectedThemes: [],
    LessonPLanComponents : [],
    Action : null,
    NameError: false,
    ThemeError: false,
  };
  AddLessonPlanComponent = ( id, metaData, type) => {
    console.log(
      'This is from db, ', id
      , 'This is the metaData', metaData
      ,'This is the type', type )
      const component = {id : id, name : metaData["name"], type: type}
    this.setState({LessonPLanComponents : [...this.state.LessonPLanComponents, component]})
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

  UploadLessonPLan = () => {
    let valid = true
    const themes = sessionStorage.getItem("LessonThemes").split(',')

    if(this.state.LessonPLanName === null){
      this.setState({NameError: true})
      valid = false
    }
    if(themes === null || themes.length < 1 ){
      this.setState({ThemeError:true})
      valid = false
    }
    if(valid === false){
      return
    }
    let documentIds = []
    this.state.LessonPLanComponents.forEach((document) => {
      documentIds.push(document.id)
    })
    const uploadLessonDTO ={
      LessonPLanName: this.state.LessonPLanName,
      Themes: themes,
      DocumentIds: documentIds
    }
    console.log(uploadLessonDTO)
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
          components={this.state.LessonPLanComponents}
          action={this.state.Action}
          lessonPLanName={this.state.LessonPLanName}
          //Methods
          lessonPlanNameChangeHandler={this.LessonPlanNameChangeHandler}
          uploadLessonPLan={this.UploadLessonPLan}
          changeAction={this.ChangeAction}
          addComponent={this.AddLessonPlanComponent}
          alterThemes={this.AddThemes}
          deleteTheme={this.RemoveThemes}

        ></CreateDumbComponent>
      </Filler>
    );
  }
}

export default CreateSmartContainer;