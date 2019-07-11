import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Home from './pages/home'

const App = () => 
  <div>
    <Home/>
  </div>

ReactDom.render(<App/>, document.getElementById('app'));
