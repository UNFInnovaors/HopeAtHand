import React, { Component } from 'react';
import axios from 'axios';
class PoemSearch extends Component{
//ANYTHING AFTER COMPONENT BUT BEFORE RENDER IS STATE AND HANDLER STUFF/ HELPER METHOD

state={
  theme: '',
  searchValue: ''

}

  SelectHandler=(event)=>{//STATE DOESN'T UPDATE UNTIL RENDER
   console.log('this is the event', event) 
   this.setState({theme: event.target.value})
  }


  searchValueHandler=(event)=>{
    console.log('this is the text event', event)
    this.setState({searchValue: event.target.value})

  }

  searchTermHandler=(event)=>{
    let poemObject= {theme: this.state.theme, tags: this.state.searchValue }

    axios.post('https://localhost:44365/api/Search/GetPoemSearchText', poemObject).then(
    res=> {
    
      console.log(res) 
    })
    
  }
  render()
  {
   //CODE LOGIC, CONSOLE.LOG STUFF

    console.log('this is the text state',this.state.searchValue)
    console.log('this is the state', this.state.theme)  


    return(
      //JSX ONLY
      <div>
      <input onChange={this.searchValueHandler} type="text"></input>
      <br/>
      <br/>
      <select onChange={this.SelectHandler}>
      <option value="FemaleEmpowerment">Female empowerment</option>
      <option value="MaleEmpowerment">Male Empowerment"</option>
      <option value="SelfAcceptance" >Self Acceptance</option>
      <option value="Connectivity">Connectivity</option>
      </select>
      <br/>
      <br/>

      <button onClick={this.searchTermHandler}> Submit </button>
      </div>
      
    )

  }

 
}

export default PoemSearch;