import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="root-container">
                <div className="box-controller">
                    <div className="controller">
                        Login
                    </div>

                    <div className="controller">
                        Register
                    </div>
                </div>

                <div className="box-container">

                </div>
            </div>
        );
            
    }
}

class LoginBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        
    }
}