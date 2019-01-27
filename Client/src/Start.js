import React, { Component } from 'react';
import Nav from './Navigation'
import './style.css'
import wallpaper from './bg.jpg'


// Material UI Components
import { TextField } from '@material-ui/core';


class Start extends Component{
    render(){
        const type = {
                                  
        }

        return(
            <div>
                <link rel="stylesheet" href="https://use.typekit.net/emc6bqr.css"></link>
                <Nav className='navi' />
                <img className='wallpaper' src={wallpaper} />
                <div className='text'>
                    Welcome to the world of tomorrow.
                    
                </div>
                
                
            </div>
            
        )
    }

    
}





export default Start;