import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@material-ui/core';
import './Navigation.css';
import Post from './components/PostStepper';

class Navigation extends React.Component{
    render(){
        return(
            <nav>        
                    <Icon className='nav-items' id='icon'>drafts</Icon> 
                    <span className='nav-items' id='caption'>STOREASE</span>
                    <div  id='spacer' />
                    <Button className='nav-items' id='login'>Login/Register</Button>
                    <Post className='nav-items'id='post'/>           
            </nav>
        )
    }
}

export default Navigation;