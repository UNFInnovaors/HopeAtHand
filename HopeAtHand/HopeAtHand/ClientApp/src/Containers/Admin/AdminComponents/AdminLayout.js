import React from 'react'
import { Button, Grid } from '@material-ui/core'

const AdminLayout = (props) => {
    return(
    <Grid container spacing={24}>
        <Grid item xs={1}></Grid>
        <Grid item xs={3}>
            <Button variant="contained" fullWidth color="secondary">
                Add Account
            </Button>
        </Grid>
        <Grid item xs={4}>
            <Button variant="contained" fullWidth color="primary">
                Edit Accounts
            </Button>
        </Grid>
        <Grid item xs={3}>
            <Button variant="contained" fullWidth color="secondary">
                Delete Accounts
            </Button>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={1}></Grid>
    </Grid>)
}

export default AdminLayout