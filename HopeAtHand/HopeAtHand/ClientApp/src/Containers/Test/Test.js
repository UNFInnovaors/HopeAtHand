
import React, {Component} from 'react'
import DumbTest from './DumbTest/DumbTest';

class SmartTest extends Component
{
    state = 
    {
        Initial:'This is an initial statement',
        Statements:[]
    }
    AddStatementsHandler = (event) => {
        let Statements = [...this.state.Statements,event.target.value]
        this.setState({Statements})
    }

    render(){
        return(
        <DumbTest initial={this.state.Initial}
                  statements={this.state.Statements}
                  onStatementAdded={this.AddStatementsHandler}/>
                  );
    }
}

export default SmartTest