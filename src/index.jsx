// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import AppBox from './AppBox.jsx';

ReactDOM.render(<AppBox />, document.getElementById('react-root'));
