import React, { Component } from 'react';
import LessonPLanDumbComponent from './Layout/LessonPLanSearchDumbComponent'
import axios from 'axios'

class LessonPLanSmartContainer extends Component{

    state = {
        Theme: 0,
        Tags: '',
        Lessons: null,
        ChosenLesson: '' /** Stores Displayed Lesson */,
        ChosenOption : null,
      };

    componentDidMount(){

    }
    /** Changes the state of tags to */
    ChangeTags = event => {
        this.setState({ Tags: event.target.value });
    };
    /** Changes the state of theme to the selected option */
    ChangeTheme = event => {
        this.setState({ Theme: event.target.value });
    };
    Search = () => {
        let lessie = {
            theme: this.state.Theme,
            tags: this.state.Tags
        };
        axios
            .post('/api/search/findlessonplan', lessie)
            .then(res => {
            this.setState({ Lessons: res.data });
            });
    };
    SelectLesson = (event,index) => {
        this.setState({
            ChosenLesson: this.state.Lessons[Number(index)]
        });
    };

    ChangePoemHandler = selectedPoem => {
    let chosenLesson = JSON.parse(JSON.stringify(this.state.ChosenLesson));
    chosenLesson.poemId = selectedPoem.poemId;
    chosenLesson.poem = selectedPoem;
    this.setState({ ChosenLesson: chosenLesson });
    };

    ChangeOption = (option) => {
        this.setState({ChosenOption : option})
    }
    render(){
        console.log('This is state in the smart component', this.state)
        return(<div>
                <LessonPLanDumbComponent
                    theme = {this.state.Theme} 
                    tags = {this.state.Tags} 
                    lessons = {this.state.Lessons}
                    chosenLesson = {this.state.ChosenLesson}
                    selectedOption={this.state.ChosenOption}
                    //State is above, handlers are below
                    changeTags = {this.ChangeTags}
                    changeTheme = {this.ChangeTheme}
                    search = {this.Search}
                    selectLesson = {this.SelectLesson}
                    changePoemHandler = {this.ChangePoemHandler}
                    changeSecondary = {this.props.changeSecondary}
                    changePrimary = {this.props.changePrimary}
                    changeOption = {this.ChangeOption}
                    //Props
                    isUpload={this.props.isUpload}
                    addComponent={this.props.addComponent}
                    

                />
            </div>)
    }
}

export default LessonPLanSmartContainer