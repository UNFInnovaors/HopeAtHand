import React, { Component } from 'react'
import {get, post} from '../../components/Axios/Instances'
import AdminFunctions from './AdminComponents/AdminLayout'
import SnackbarContent from '@material-ui/core/SnackbarContent';
class Admin extends Component {

    state = {
        Facilitators:null,
        Loading:false,
        Search : '',
        SearchType: 'Name'
    }

    componentDidMount(){
    
      get('/User/GetUsers').then( res => {
            console.log('This is the results in admin', res);
            this.setState({Loading: false,
                    Facilitators: res.data})
            }).catch( err => console.log(err))
        
        this.setState({Loading: true})
    }

    update =() => {
        get('/User/GetUsers').then( res => {
            console.log('This is the results in admin', res);
            this.setState({Loading: false,
                    Facilitators: res.data})
            }).catch( err => console.log(err))
        
        this.setState({Loading: true})
    }
    Search = () => {
        console.log('this is happening')
        if(this.state.SearchType === 'Name'){
            this.SearchByName()
        } else {
            this.SearchByRole()
        }
    }
    SearchByName = () => {
        console.log('And so it this')
        const FacilitatorSearchDTO =  {
            SearchString : this.state.Search
        }
        post('/User/Search', FacilitatorSearchDTO).then(res => {
            this.setState({Facilitators : res.data})
            }
        )
    }

    SearchByRole = () => {
        console.log('And so it this Role')
        const SearchRoleDTO =  {
            role : this.state.Search
        }
        post('/User/SearchByRole', SearchRoleDTO).then(res => {
            this.setState({Facilitators : res.data})
            }
        )
    }

    handleChange = (event) => {
        this.setState({Search : event.target.value})
    }

    changeSearchType = (event) => {
        if(event.target.value === 'Role'){
            this.setState({SearchType: event.target.value,
                                  Search:'Facilitator'})
        } else {  
            this.setState({SearchType: event.target.value,
                Search:''})}
    }
    render(){
        return( <AdminFunctions loading={this.state.Loading}
                                facilitators={this.state.Facilitators}
                                update={this.update}
                                searchType={this.state.SearchType}
                                changeSearchType={this.changeSearchType}
                                search={this.state.Search}
                                handleChange={this.handleChange}
                                searchMethod={this.Search}>

            
        </AdminFunctions>)
    }
}

export default Admin