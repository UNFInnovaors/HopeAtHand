import React, { Component } from 'react';
import Filler from '../../components/HOC/Filler';
import CreateDumbComponent from './CreateDumbComponent';

class CreateSmartContainer extends Component {
  state = {
    IsNew: true,
    LessonPLanName: '',
    DocumentTypes: ['Poem', 'Writing Template', 'Art Piece'],
    SelectedThemes: []
  };

  AlterThemes = (SelectedThemes) => {
    console.log(SelectedThemes, 'These are the selected themes');
    this.setState({ SelectedThemes: SelectedTheme });
  }
  render() {
    return (
      <Filler>
        <CreateDumbComponent
          isNew={this.state.IsNew}
          documentTypes={this.state.DocumentTypes}
          AlterThemes={this.AlterThemes}
        ></CreateDumbComponent>
      </Filler>
    );
  }
}

export default CreateSmartContainer;