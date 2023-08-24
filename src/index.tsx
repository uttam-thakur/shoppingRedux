import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const container = document.getElementById('root');

if (container) {
    ReactDOM.render(<App />, container);
} else {
    console.error("Could not find root container element");
}

// reportWebVitals(null); // Uncomment this line if you want to disable web vitals reporting

