import React, { Component } from 'react';
import LessonPlanSearch from './Contianers/LessonPlanSearch/LessonPlanSearch'
import UploadFiles from './Contianers/UploadFileSmartContainer/UploadFileSmartContainer'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <UploadFiles/>
    );
  }
}
