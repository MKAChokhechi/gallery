import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import Form from "./Form";

render(
    <BrowserRouter>
        <App />
        <Form/>

    </BrowserRouter>,
    document.getElementById('root'));

