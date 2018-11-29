import React, { Component } from 'react'
import Filler from '../../components/HOC/Filler';
import CreateDumbComponent from './CreateDumbComponent'

class CreateSmartContainer extends Component{

    state = {
        IsNew : true,
        LessonPLanName: "",
        DocumentTypes:['Poem', 'Writing Template', 'Art Piece'],
    }

    componentDidMount(){

    }
    changeName = (event) => {   

    }
    render(){

    return(
        <Filler>
            <CreateDumbComponent isNew={this.state.IsNew} documentTypes={this.state.DocumentTypes}/>
        </Filler>
        )
    }
}

export default CreateSmartContainer