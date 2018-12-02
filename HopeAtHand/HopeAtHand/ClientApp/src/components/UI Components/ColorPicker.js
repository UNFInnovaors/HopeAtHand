import React, { Component } from 'react'
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

class ColorPicker extends Component{

    showChange = (event) => {
        console.log(event.target.value)
        this.props.changeSecondary(event)
    }
    showChangePrim = (event) => {
        this.props.changePrimary(event);
    }
    render(){

        return(
            <Grid container spacing={24}>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <label htmlFor='primChange'>
                        <input style={{ display: 'none' }} id='primChange' type='color' onChange={this.showChangePrim}/>
                        <Button fullWidth variant='contained' color='primary' component="span">Change Primary Color</Button>
                    </label>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5}>
                    <label htmlFor='secChange'>
                        <input style={{ display: 'none' }} id='secChange' type='color' onChange={this.showChange}/>
                        <Button fullWidth variant='contained' color='secondary' component="span">Change Secondary Color</Button>
                    </label>
                </Grid>
            </Grid>
        )
    }
}

export default ColorPicker