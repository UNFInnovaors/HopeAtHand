import React, { Component } from 'react';
import LessonPlanSearch from './Contianers/LessonPlanSearch/LessonPlanSearch'

export default class App extends Component {
  displayName = App.name

  render() {
    return (
        <LessonPlanSearch/>
    );
  }
}
