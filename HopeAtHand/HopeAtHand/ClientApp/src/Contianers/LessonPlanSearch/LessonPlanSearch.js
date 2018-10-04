import React, { Component } from 'react';
import { displayLessonPlan, showFoundLessons } from './LessonPlanMethods'
import Classes from './LessonPlan.css';
import axios from 'axios';

class LessonPlanSearch extends Component{


state = {
    Theme:0,
    Tags:'',
    Lessons:[],
    ChosenLesson:''
}
/** Changes the state of tags to */
ChangeTags=(event) => {
    this.setState({Tags: event.target.value})
}
/** Changes the state of theme to the selected option */
ChangeTheme=(event) => {
    this.setState({Theme:event.target.value})
}
Search = () => {
    console.log(this.state.Theme)
    console.log(this.state.Tags)
    let lessie = {
        theme : this.state.Theme,
        tags : this.state.Tags
    }
    console.log(lessie)
    axios.post('https://localhost:44365/api/search/findlessonplan', lessie).then(res => {
        console.log(res)
        this.setState({Lessons:res.data})
    })  
}
SelectLesson = (event) => {
    this.setState({ChosenLesson: this.state.Lessons[Number(event.target.dataset.lesson)]})
}
render(){
    console.log('this is state', this.state)
    let displayLessonPlans = this.state.Lessons.map((lesson,index) => {
        console.log(lesson)
        return(
            <div>
                <h2>{lesson.name}</h2>
                <p>Poem : {lesson.poem.title} Writing Assignment: {lesson.writing.title} Art Piece : {lesson.artPiece.title} </p>
                <button onClick={this.SelectLesson} data-lesson={index}>View Lesson</button>
            </div>)})

    let lessonPlanForRender = displayLessonPlan(this.state.ChosenLesson)
        return(
            <div>
                <div>
                    <h1>Search For Lesson Plans</h1>
                    <label>Choose a theme</label>
                    <select onChange={(event) => this.ChangeTheme(event)} value={this.state.Theme}>
                        <option value={0} disabled>Select A Theme</option>
                        <option value='Female Empowerment'>Female Empowerment</option>
                        <option value={'Male Empowerment'}>Male Empowerment</option>
                        <option value={'Self Acceptance'}>Self Acceptance</option>
                        <option value={'Connectivity'}>Connectivity</option>
                    </select>
                    <label>Search for tags : </label><input onChange={this.ChangeTags} type="text"/>
                    <button onClick={this.Search}>Submit</button>
                </div>
                <div>
                    {displayLessonPlans}
                </div>
                <div>
                    {lessonPlanForRender} 
                </div>
            </div>
        )
    }
}
export default LessonPlanSearch