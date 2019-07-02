import React, { Component } from 'react';
import ReactDom from 'react-dom';

const HelloWorld = () => <div>Hello World! </div>

ReactDom.render(<HelloWorld />, document.getElementById('app'));
