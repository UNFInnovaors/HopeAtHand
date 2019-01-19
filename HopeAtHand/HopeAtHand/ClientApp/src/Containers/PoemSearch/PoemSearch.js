import React, { Component } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
    this.setState({ theme: event.target.value });
  };

  searchValueHandler = event => {
    this.setState({ searchValue: event.target.value });
  };

  searchTermHandler = event => {
    let poemObject = { theme: this.state.theme, tags: this.state.searchValue };
    axios
      .post('https://localhost:44365/api/Search/GetPoemSearchText', poemObject)
      .then(res => {
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
    let renderingButton = <div />;
    if (this.state.ShowPoem == true) {
      renderingButton = (
        <div>
          <Button onClick={this.ShowPoemSearchHandler}>
            <Typography> Search More Poetry </Typography>
          </Button>
          <br />
          <br />
        </div>
      );
    } else {
      renderingButton = (
        <div>
          <div>
            <Button onClick={this.ShowPoemSearchHandler}>
              Search More Poetry
            </Button>
            <br />
            <br />
          </div>
          <input onChange={this.searchValueHandler} type="text" />
          <br />
          <br />
          <FormControl variant="filled">
            <Select
              native
              onChange={this.SelectHandler}
              inputProps={{
                name: 'age',
                id: 'age-native-simple'
              }}
            >
              <option value={'Female Empowerment'}>Female Empowerment</option>
              <option value={'Male Empowerment'}>Male Empowerment</option>
              <option value={'Self Acceptance'}>Self Acceptance</option>
              <option value={'Connectivity'}>Connectivity</option>
            </Select>
          </FormControl>
          <br />
          <br />
          <Button onClick={this.searchTermHandler} color="primary"> Submit </Button>
        </div>
      );
    }

    let poemsearchresult = '';
    if (this.state.PoemSearchResult.length === 0) {
      poemsearchresult = (
        <Typography variant="h6">Sorry nothing was found</Typography>
      );
    } else {
      poemsearchresult = this.state.PoemSearchResult.map(localName => {
        return (
          <div>
            {localName.title}
            <Button onClick={() => this.FindThePoem(localName)}>
              Choose the new poem
            </Button>
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
