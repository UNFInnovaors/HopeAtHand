import React, {Component} from 'react'
import {createInstance} from '../../components/Axios/Instances'
import CreateThemeInterface from './CreateThemeComponents/CreateThemeLayout'
import {get,post} from '../../components/Axios/Instances'
import Filler from '../../components/HOC/Filler';

import { Grid } from '@material-ui/core'

import './CreateTheme.css';



class CreateThemeSmartContainer extends Component{

    state= {
        Theme : 'InitialCreate'
    }

    componentDidMount(){
        //this.CreateTheme();
    }
    CreateTheme = () => {
        const CreateThemeDTO = {
            ThemeName : this.state.ThemeName
        }

        post("/Theme/CreateTheme", CreateThemeDTO).then( response => {
        }).catch(err =>{
        })

        get("/Theme/GetThemes").then( response => {
        }).catch(err => {
        })
    }

    ChangeThemeName = (event) => {
        this.setState({ ThemeName: event.target.value })
    }
    render(){
        return(<Filler><CreateThemeInterface CreateTheme = {this.CreateTheme} ThemeName={this.state.ThemeName} ChangeThemeName={this.ChangeThemeName}/></Filler>)
    }
}

export default CreateThemeSmartContainer