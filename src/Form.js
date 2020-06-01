import React, { Component } from 'react';
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import {Link} from "react-router-dom";

class Form extends Component {
    render() {
        return (
            <div>
                <Login/>
                <SignUp/>
                <Link className="btn btn-secondary "  to="/signup">SignUp</Link>

            </div>
        );
    }
}

export default Form;