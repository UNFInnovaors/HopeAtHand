import React, {Component} from 'react'
import Filler from '../../HOC/Filler';
import { Paper, Grid, Table, Typography, Chip, TableRow } from '@material-ui/core';

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
                <tr key={index}>
                    {themeRow.map((theme,index) => {
                        count++;
                        //console.log(theme, "this is a theme")
                        return (
                            <td key={theme}><Chip label={theme.value}></Chip></td>
                        )
                    })}
                </tr>
            )
        })
        console.log(TableToDisplay)
        return TableToDisplay
    }
    render(){
        var testArray = []
        for(let x = 0; x < 25; x++)
        {
            testArray[x] = x+1;
        }
        
        let something = this.FormatForDisplay(this.props.themes)
        let badges=<tr><td><Typography variant="body1">Please Choose One or More Theme(s) to Continue</Typography></td></tr>
        if(true)//this.props.themes.length > 0)
        return(<Filler>
                <Grid container spacing={24}>
                    <Paper style={{padding:'24px', width:'100%'}}>
                        <Grid container item spacing={24}>
                            <table>
                                <tbody>
                                    {something}
                                </tbody>
                            </table>
                        </Grid>
                    </Paper>
                </Grid>
            </Filler>)
    }
}

export default ThemeBox