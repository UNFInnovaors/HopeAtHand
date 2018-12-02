import React , { Component } from 'react'
import AccountDrawer from './AccountComponents/AccountDrawer'
import Filler from '../../components/HOC/Filler'


class Account extends Component{
    state = {

    }
    render(){
        return(
            <Filler>
                <AccountDrawer/>
            </Filler>
        )
    }
}

export default Account