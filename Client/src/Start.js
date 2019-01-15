import React, { Component } from 'react';
import Nav from './Navigation'
import './style.css'


// Material UI Components
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';


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



class Filter extends Component{
    render(){
        return(
            <div className='Filter'>
                <form>
                    <span>WHERE</span>
                    <input></input>
                    <span>FROM</span>
                    <input></input>
                    <span>TO</span>
                    <input></input>
                    <span>LENGTH</span>
                    <input></input>
                    <span>WIDTH</span>
                    <input></input>
                    <span>HEIGHT</span>
                    <input></input>
                </form>
            </div>
        )
    }
}

export default Filter;