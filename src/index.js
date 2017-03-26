import React from 'react';
import ReactDOM from 'react-dom';
import Container from './components/appContainer';
import './style.scss';

document.addEventListener("DOMContentLoaded", function(event) {      
    ReactDOM.render(<Container/>, document.getElementById('root'));
}); 
