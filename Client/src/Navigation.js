import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Toolbar, Typography, IconButton, Icon } from '@material-ui/core';

const style = {
    root: {
        height: 60
    },
    type: {
        fontFamily: 'Proxima-nova',
        fontWeight: 400,
        fontSize : 32,
        color: "#71bad3"
    }

}

function nav(props) {
    return(
        <nav>
            <span itemID='logo-caption'>STOREASE</span>

        {/* <AppBar position="static" color="white">
            <Toolbar>
                <IconButton><Icon>drafts</Icon></IconButton>
                <Typography style={style.type}>
                    STOREASE
                </Typography>
            </Toolbar>
        </AppBar> */}

        </nav>
    )
}

export default withStyles(style)(nav) ;