import React, { Component } from 'react';
import axios from 'axios';

class LessonPlanSearch extends Component{


state = {
    Theme:0,
    Tags:'',
    Lessons:[]
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
render(){
        return(
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
                <label>Search for tags<input onChange={(event) => this.ChangeTags(event)} type="text"/></label>
                <button onClick={this.Search}>Submit</button>
            </div>
        )
    }
}
export default LessonPlanSearch