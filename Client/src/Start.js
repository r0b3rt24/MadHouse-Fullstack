import React, { Component } from 'react';
import Nav from './Navigation'
import './style.css'


// Material UI Components
import Typography from '@material-ui/core/Typography';


class Start extends Component{
    render(){
        const type = {
                                  
        }

        return(
            <div>
                <link rel="stylesheet" href="https://use.typekit.net/emc6bqr.css"></link>
                <Nav></Nav>
                <div className='text'>
                    Welcome to the world of tomorrow.
                </div>
                
                
            </div>
            
        )
    }

    
}

export default Start;