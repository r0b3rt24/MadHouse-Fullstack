import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { CardMedia, Grid, Paper } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import placeholder from "../place-holder.jpg";
import ButtonAppBar from "./NavBar";
import Nav from "../Navigation";
import MapContainer from "./MapContainer";
import "./SideBar.css";
import TextField from "@material-ui/core/TextField";
import Geosuggest from "react-geosuggest";

// filter is a card component resides in the sidebar
// TO-DO : handle save states
class Filter extends Component {
  state = {
    isOpen: true,
    Where: '',
    Small: 0,
    Medium: 0,
    Large: 0,
    startDate: null,
    endDate: null,
  };

  onSubmit = () =>{

  }

  clearTheForm = () => {
    this.setState(
      {
        isOpen: true,
        Where: '',
        Small: 0,
        Medium: 0,
        Large: 0,
        startDate: null,
        endDate: null,
      }
    )
  }

  updateForm = () =>{
    this.setState({
      Small: this.refs.Small.value,
      Medium: this.refs.Medium.value,
      Large: this.refs.Large.value,
    })
  }

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormHide = () => {
    this.setState({ isOpen: false });
  };

  checkNumberInput = () => {
    
  }

  render() {
    if (!this.state.isOpen) {
      return (
        <Paper>
        <div className="Filter" color="primary" variant="outlined">
          <Button onClick={this.handleFormOpen} fullWidth>
            Show Filter
          </Button>
        </div>
      </Paper>
      )
    } else {
      return (
        <Paper>
          <div className="Filter">
            <form onSubmit={this.onSubmit}>
              {/* <Geosuggest /> */}
              <Grid container spacing={24}>
                <Grid item xs>
                  <TextField
                    variant="outlined"
                    label="Where"
                    margin="none"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs>
                  <TextField
                    id="startDate"
                    type="date"
                    variant="outlined"
                    label="Start Dtae"
                    margin="none"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="endDate"
                    type="date"
                    variant="outlined"
                    label="End Dtae"
                    margin="none"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs>
                  <TextField
                    id="outlined-number"
                    label="Small"
                    ref="Small"
                    type="number"
                    margin="none"
                    value={this.state.Small}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={this.updateForm}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-number"
                    label="Medium"
                    ref="Medium"
                    type="number"
                    margin="none"
                    value={this.state.Medium}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={this.updateForm}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="outlined-number"
                    label="Large"
                    ref="Large"
                    type="number"
                    margin="none"
                    value={this.state.Large}
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    onChange={this.updateForm}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item>
                  <Button
                    className="FilterButton"
                    variant="outlined"
                    color="secondary"
                    onClick={this.clearTheForm}
                  >
                    Clear
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="FilterButton"
                    variant="outlined"
                    color="primary"
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    className="FilterButton"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleFormHide}
                  >
                    Hide Filter
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      );
    }
  }
}

//The single card that shows information of a single storage place
class InfoCard extends Component {
  render() {
    // write the style for infoCard here
    const style = {
      // padding: 10,
      // maxWidth: 300,
      margin: 5
    };
    const card = {
      display: "flex"
      // alignItems: 'stretch',
    };
    const image = {
      height: 200,
      width: 200
    };
    const text = {
      // display: 'flex',
      flexDirection: "column"
    };
    const content = {
      display: "flex",
      paddingLeft: 20
    };
    const price = {
      paddingLeft: 5,
      alignItems: "flex-end",
      color: "green"
    };
    const actions = {
      paddingTop: 80,
      // paddingLeft: 80,
      justifyContent: "flex-end"
    };

    return (
      <Card style={style}>
        <CardContent style={card}>
          <CardMedia style={image} image={placeholder} title="room image" />
          <div style={text}>
            <div style={content}>
              <div>
                <Typography variant="headline">{this.props.name}</Typography>
                <Typography variant="subheading" color="textSecondary">
                  {this.props.address}
                </Typography>
              </div>
              <Typography variant="title" style={price}>
                ${this.props.price}
              </Typography>
            </div>

            <CardActions style={actions}>
              <Button variant="outlined" color="primary">
                Request
              </Button>
              <MoreInfoDialogs
                name={this.props.name}
                description="It is a long established fact that a reader will 
                be distracted by the readable content of a page when looking at its layout."
              >
                More Info
              </MoreInfoDialogs>
            </CardActions>
          </div>
        </CardContent>
      </Card>
    );
  }
}

//The list that contains all the single card
class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storages: []
    };
  }

  componentDidMount() {
    console.log("mounting");
    fetch("http://localhost:4000/storages/storages")
      .then(result => result.json())
      .then(data => this.setState({ storages: data }));
  }

  render() {
    const listStyle = {
      minWidth: 300,
      display: "flex",
      overflow: "scroll",
      maxHeight: "100vh",
      marginTop: "5px",
      backgroundColor: "#eee"
    };
    const infoCards = this.state.storages.map(storage => (
      <GridListTile style={{ height: "auto" }}>
        <InfoCard
          name={storage.name}
          address={storage.address}
          price={storage.price}
        />
      </GridListTile>
    ));
    return (
      <div>
        <Filter />
        <GridList cols={1} style={listStyle}>
          {infoCards}
        </GridList>
      </div>
    );
  }
}

//Props:
//Name, Description
class MoreInfoDialogs extends Component {
  state = {
    isOpen: false
  };
  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };
  render() {
    return (
      <div>
        <Button variant="outlined" onClick={this.handleClickOpen}>
          More...
        </Button>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.name}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Request
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

class SideBar extends Component {
  render() {
    return (
      <div>
        {/* <ButtonAppBar /> */}
        <Nav />
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <CardList />
          </Grid>
          <Grid item xs={8}>
            <MapContainer />
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default SideBar;
