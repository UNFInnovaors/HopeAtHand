import React, { Component } from 'react';
import LessonPlanSearch from './Containers/LessonPlanSearch/LessonPlanSearch'
import UploadFiles from './Containers/UploadFileSmartContainer/UploadFileSmartContainer'
import DumbContainer from './Containers/Test/Test'
import Create from './Containers/CreateLessonPlan/CreateSmartContainer'

import Filler from './components/HOC/Filler';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Filler>
        <Create/>
      </Filler>
    );
  }
}
//<UploadFiles/>