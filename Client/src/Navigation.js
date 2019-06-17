import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@material-ui/core';
import './Navigation.css';
import Post from './components/PostStepper';
import LoginButton from './components/LoginButton';
import RegisterButton from './components/RegisterButton';

class Navigation extends React.Component{
    render(){
        return(
            <nav>        
                    <Icon className='nav-items' id='icon'>drafts</Icon> 
                    <span className='nav-items' id='caption'>STOREASE</span>
                    <div  id='spacer' />
                    {/* <Button className='nav-items' id='login'>Login/Register</Button> */}
                    <RegisterButton className='nav-items' id='post' />
                    <LoginButton className='nav-items' id='post' />
                    <Post className='nav-items'id='post' />  
            </nav>
        )
    }
}

export default Navigation;