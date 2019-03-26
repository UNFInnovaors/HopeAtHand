import React, {Component} from 'react'
import Filler from '../../HOC/Filler';
import { Paper, Grid, Table, Typography, Chip, TableRow } from '@material-ui/core';
/*in order to use this component you need to following properties this.props.themes ...
    Eventually this component should also take in an onclick handler for removing themes once they have been created*/
class ThemeBox extends  Component{

    state = {
        NumberPerRow : 5,
    }
    /*School of Computing Speach Requirement UNF school of computing speach requirement*/
    FormatForDisplay = (themes) =>{
        if(themes.length === 0)
        {
            return <tr><td><Typography variant="body1">Please Choose One or More Theme(s) to Continue</Typography></td></tr>
        }
        //console.log(themes)
        let formattedThemes = []
        const numberOfChipsPerRow = this.state.NumberPerRow
        const numberOfRows = Math.ceil(themes.length/numberOfChipsPerRow)
        //(this.props.numberPerRow !== null ? this.props.numberPerRow : this.state.NumberPerRow );
        //console.log(numberOfChipsPerRow, Math.ceil(themes.length/numberOfChipsPerRow))

        for(let x = 0; x < numberOfRows; x++)
        {
            //console.log('The X Value Is ', x)
            formattedThemes[x] = [...themes.splice(0,numberOfChipsPerRow)]
            //console.log(formattedThemes[x], "these are formatted themes", themes)
        }
        //console.log(formattedThemes);
        let count = 0;
        let TableToDisplay = formattedThemes.map((themeRow,index) => {
           // console.log(themeRow, 'This is a themeRow')
            
            return(
                    themeRow.map((theme,index) => {
                        count++;
                        //console.log(theme, "this is a theme")
                        return (
                            <Grid key={index} style={{marginBottom:6, marginRight:3}}><Chip style={{textAlign:'center', margin:'auto', minWidth:150, fontSize:15}}  onClick={() => this.remove(theme)} label={theme}></Chip></Grid>
                        )
                    })
                
            )
        })
        return TableToDisplay
    }

    remove = (valueToRemove) => {
        console.log(this.props.destination)
        let themes = sessionStorage.getItem(this.props.destination).split(',')
        console.log(themes, valueToRemove)
        for(let x = 0 ; x < themes.length; x++){
            if(themes[x] === valueToRemove){
                themes.splice(x,1)
                break
            }
        }
        console.log(themes.join(','), 'is themes.join')
        if(themes.length < 1){
            sessionStorage.removeItem(this.props.destination)
        } else {
            sessionStorage.setItem(this.props.destination, themes.join(','))
        }
        this.forceUpdate()
        this.props.reset();
    }
    
    render(){
        console.log('this is', this.props.themes, this.props)
        var testArray = []
        for(let x = 0; x < 25; x++){
            testArray[x] = x+1;
        }
        let something = this.FormatForDisplay(this.props.themes)
        
        let badges=<tr><td><Typography variant="body1">Please Choose One or More Theme(s) to Continue</Typography></td></tr>
        if(true)//this.props.themes.length > 0)
        return(<Filler>
                <Grid container spacing={24}>
                    <Paper style={{padding:'24px', width:'100%'}}>
                        <Grid container item spacing={24}>
                            {something}
                        </Grid>
                    </Paper>
                </Grid>
            </Filler>)
    }
}

export default ThemeBox