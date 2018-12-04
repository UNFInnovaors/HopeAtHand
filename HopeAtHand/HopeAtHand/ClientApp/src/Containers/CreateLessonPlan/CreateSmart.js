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
  };
  AddLessonPlanComponent = (Component) => {
    console.log("1234143214123421",Component, "This is the AddLessonPlanComponent Result", this.state.LessonPLanComponents)
    this.setState({LessonPLanComponents : [...this.state.LessonPLanComponents, Component]})
  }
  AddThemes = (ATheme) => {
    console.log("asdfasf",ATheme, "This is a selected Themes")
    let newList = new Array();
    newList=[1]
    if(this.state.SelectedThemes.length === 0){
      console.log('This is here')
      newList.push(ATheme)
    }
    else{
      console.log('This is ow here')
      newList = [1,2,3, ATheme];
    }
    
    console.log('This is the new list ',  newList)
    this.setState({SelectedThemes : newList})
  }

  ChangeAction = (action) => {
    this.setState({Action:action})
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
  render() {
    console.log(this.state.SelectedThemes, "Hello")
    return (
      <Filler>
        <CreateDumbComponent
          isNew={this.state.IsNew}
          documentTypes={this.state.DocumentTypes}
          alterThemes={this.AddThemes}
          deleteTheme={this.RemoveThemes}
          themes={this.state.SelectedThemes}
          components={this.state.LessonPLanComponents}
          action={this.state.Action}
          changeAction={this.ChangeAction}
          addComponent={this.AddLessonPlanComponent}
        ></CreateDumbComponent>
      </Filler>
    );
  }
}

export default CreateSmartContainer;