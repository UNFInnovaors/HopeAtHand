import React, { Component } from 'react';
import axios from 'axios';
class PoemSearch extends Component {
  //ANYTHING AFTER COMPONENT BUT BEFORE RENDER IS STATE AND HANDLER STUFF/ HELPER METHOD

  state = {
    theme: '',
    searchValue: '',
    ShowPoem: true,
    PoemSearchResult: ''
  };

  SelectHandler = event => {
    //STATE DOESN'T UPDATE UNTIL RENDER
    console.log('this is the event', event);
    this.setState({ theme: event.target.value });
  };

  searchValueHandler = event => {
    console.log('this is the text event', event);
    this.setState({ searchValue: event.target.value });
  };

  searchTermHandler = event => {
    let poemObject = { theme: this.state.theme, tags: this.state.searchValue };
    axios
      .post('https://localhost:44365/api/Search/GetPoemSearchText', poemObject)
      .then(res => {
        console.log(res);
        this.setState({ PoemSearchResult: res.data });
      });
  };

  ShowPoemSearchHandler = event => {
    let rendering = this.state.ShowPoem;

    this.setState({ ShowPoem: !rendering });
  };
  FindThePoem = selectedPoem => {
    this.setState({ ShowPoem: true, PoemSearchResult: '' });
    this.props.FindThePoem(selectedPoem);
  };

  render() {
    //CODE LOGIC, CONSOLE.LOG STUFF

    console.log('this is the text state', this.state.searchValue);
    console.log('this is the state', this.state.theme);
    console.log('his is showPoem state', this.state.ShowPoem);
    let renderingButton = <div />;
    if (this.state.ShowPoem == true) {
      renderingButton = (
        <div>
          <button onClick={this.ShowPoemSearchHandler}>
            {' '}
            Search More Poetry
          </button>{' '}
          <br /> <br />
        </div>
      );
    } else {
      renderingButton = (
        <div>
          <div>
            <button onClick={this.ShowPoemSearchHandler}>
              {' '}
              Search More Poetry
            </button>{' '}
            <br /> <br />
          </div>
          <input onChange={this.searchValueHandler} type="text" />
          <br />
          <br />
          <select onChange={this.SelectHandler}>
            <option value="Female Empowerment">Female Empowerment</option>
            <option value="Male Empowerment">Male Empowerment</option>
            <option value="Self Acceptance">Self Acceptance</option>
            <option value="Connectivity">Connectivity</option>
          </select>
          <br />
          <br />
          <button onClick={this.searchTermHandler}> Submit </button>
        </div>
      );
    }

    let poemsearchresult = '';
    if (this.state.PoemSearchResult.length === 0) {
      poemsearchresult = <p>Sorry nothing was found</p>;
    } else {
      poemsearchresult = this.state.PoemSearchResult.map(localName => {
        console.log('this is the localname', localName);

        return (
          <div>
            {' '}
            {localName.title}
            <button onClick={() => this.FindThePoem(localName)}>
              Choose the new poem
            </button>
          </div>
        );
      });
    }

    return (
      //JSX ONLY
      <div>
        {renderingButton}

        {poemsearchresult}
      </div>
    );
  }
}

export default PoemSearch;
