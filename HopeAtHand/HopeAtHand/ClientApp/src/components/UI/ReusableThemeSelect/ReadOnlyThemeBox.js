import React, {Component} from 'react'
import Filler from '../../HOC/Filler';
import { Paper, Grid, Table, Typography, Chip, TableRow } from '@material-ui/core';
/*in order to use this component you need to following properties this.props.themes ...
    Eventually this component should also take in an onclick handler for removing themes once they have been created*/
class ReadonlyThemeBox extends  Component{

    state = {
        NumberPerRow : 5,
    }
    /*School of Computing Speach Requirement UNF school of computing speach requirement*/
    FormatForDisplay = (themes) =>{
        console.log(themes, 'in the readonly')
        if(themes.length === 0){
            return <Typography variant="body1">Please Choose One or More Theme(s) to Continue</Typography>
        }
        //console.log(themes)
        let formattedThemes = []
        const numberOfChipsPerRow = this.state.NumberPerRow
        const numberOfRows = Math.ceil(themes.length/numberOfChipsPerRow)

        for(let x = 0; x < numberOfRows; x++)
        {
            formattedThemes[x] = [...themes.splice(0,numberOfChipsPerRow)]
        }
        //console.log(formattedThemes);
        let TableToDisplay = formattedThemes.map((themeRow,index) => {
            
            return(
                    themeRow.map((theme,index) => {
                        return (
                            <Grid key={index} style={{marginBottom:6, marginRight:3}}><Chip color={'secondary'} style={{textAlign:'center', margin:'auto',  minWidth:150, fontSize:15}} label={theme}></Chip></Grid>
                        )
                    })
                
            )
        })
        return TableToDisplay
    }

    
    render(){
        //console.log('this is', this.props.themes, this.props)
        let something = this.FormatForDisplay(this.props.themes)
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

export default ReadonlyThemeBox