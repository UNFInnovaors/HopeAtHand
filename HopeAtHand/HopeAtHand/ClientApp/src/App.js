import React, { Component } from 'react';
import LessonPlanSearch from './Contianers/LessonPlanSearch/LessonPlanSearch'
import UploadFiles from './Contianers/UploadFileSmartContainer/UploadFileSmartContainer'
import DumbContainer from './Containers/Test/Test'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Test/>  
    );
  }
}
//<UploadFiles/>