import React, { Component } from 'react';
import axios from 'axios';
class PoemSearch extends Component{
//ANYTHING AFTER COMPONENT BUT BEFORE RENDER IS STATE AND HANDLER STUFF/ HELPER METHOD

state={
  theme: '',
  searchValue: '',
  ShowPoem: true

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
    res=> {console.log(res) }
  )}

  ShowPoemSearchHandler=(event)=>{
    let rendering= this.state.ShowPoem

    this.setState({ShowPoem: !rendering})
  }

  render()
  {
   //CODE LOGIC, CONSOLE.LOG STUFF

    console.log('this is the text state',this.state.searchValue)
    console.log('this is the state', this.state.theme)  
    console.log('his is showPoem state', this.state.ShowPoem)
    let renderingButton= <div></div>
    if (this.state.ShowPoem==true)
    {
      renderingButton=<div><button  onClick={this.ShowPoemSearchHandler}> Search More </button> <br/> <br/></div>
    }
    else
    { renderingButton=
      <div> 
      <div><button  onClick={this.ShowPoemSearchHandler}> Search More </button> <br/> <br/></div> 
      <input onChange={this.searchValueHandler} type="text"></input>
      <br/>
      <br/>
      <select onChange={this.SelectHandler}>
      <option value="Female Empowerment">Female Empowerment</option>
      <option value="Male Empowerment">Male Empowerment</option>
      <option value="Self Acceptance" >Self Acceptance</option>
      <option value="Connectivity">Connectivity</option>
      </select>
      <br/>
      <br/>
      <button onClick={this.searchTermHandler}> Submit </button>
      </div>

    }



    return(
      //JSX ONLY
     renderingButton
     
      
    )

  }

 
}

export default PoemSearch;