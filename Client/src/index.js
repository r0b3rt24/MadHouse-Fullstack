import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Start from './Start'
import NavBar from './NavBar'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Start />, document.getElementById('root'));
registerServiceWorker();
