import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class LoginButton extends React.Component {
    state = {
        isOpen: false,
    }

    postData() {
        // TODO: implement POST to the server
    }

    handleClickOpen = () => {
        this.setState({isOpen: true});
    }

    handleClose = () => {
        this.setState({isOpen: false});
    }

    render() {

        return (
            <div>
                <Button variant="contained" component="span" onClick={this.handleClickOpen}>Login</Button>
                <Dialog
                 open={this.state.isOpen}
                 onClose={this.handleClose}
                 aria-labelledbdy="alert-dialog-title"
                 aria-describedby="alert-dialog-description">
                     <DialogTitle id="alert-dialog-title">{this.props.name}</DialogTitle>
                     <DialogContent>
                        <React.Fragment>
                            <span variat="h6" gutterBottom>Login to an existing account</span>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <TextField
                                     required
                                     id="email"
                                     name="email"
                                     label="Email"
                                     fullWidth />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField 
                                     required
                                     id="password"
                                     name="password"
                                     label="Password"
                                     type="password"
                                     fullWidth />
                                </Grid>      
                            </Grid>
                        </React.Fragment>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.postData} color="primary" autoFocus>Login</Button>
                    </DialogActions>
                 </Dialog>
            </div>
        )

    }

}

export default LoginButton;