import React, { Component } from 'react';
import LessonPlanSearch from './Containers/LessonPlanSearch/LessonPlanSearch'
import UploadFiles from './Containers/UploadFileSmartContainer/UploadFileSmartContainer'
import DumbContainer from './Containers/Test/Test'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <UploadFiles/>
    );
  }
}
//<UploadFiles/>