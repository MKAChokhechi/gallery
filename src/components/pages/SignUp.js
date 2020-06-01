import React, { Component } from "react";
import validator from "validator";
import axios from "axios";

class SignUp extends Component {
    constructor(props) {
        super(props);
        if(this.props.auth) {
            this.props.history.push('/')
        }

        this.state = {
            fields : {
                username :'',
                lastname : '',
                email : '',
                password : ''
            },
            errors : {}
        }
    }

    handleValidation(callback) {
        let { fields } = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if(validator.isEmpty(fields.username)) {
            formIsValid = false;
            errors["username"] = "Please enter your UserName!!";
        }
        // else if(! validator.VALIDATION_ERR(fields.username)) {
        //     formIsValid = false;
        //     errors["username"] = "Most be string!";
        // }
        // //Last Name
        // if(validator.isEmpty(fields.lastname)) {
        //     formIsValid = false;
        //     errors["lastname"] = "Please enter your lastname!!";
        // }
        // else if(! validator.VALIDATION_ERR(fields.lastname)) {
        //     formIsValid = false;
        //     errors["lastname"] = "Most be string!";
        // }

        // Email
        if(validator.isEmpty(fields.email)) {
            formIsValid = false;
            errors["email"] = "Please enter your email!!";
        } else if(! validator.isEmail(fields.email)) {
            formIsValid = false;
            errors["email"] = "for example giti@yahoo.com";
        }

        // Password
        if(validator.isEmpty(fields.password)) {
            formIsValid = false;
            errors["password"] = "Please enter your password!!";
        } else if(! validator.isLength(fields.password , { min : 6 , max : undefined})) {
            formIsValid = false;
            errors["password"] = "Latest carector 6";
        }

        this.setState({ errors },() => {
            return callback(formIsValid)
        });

    }
    handleChange(event) {
        let fields = this.state.fields;
        let target = event.target;
        fields[target.name] = target.value;
        this.setState({fields});
    }

    handleRequest() {
        const {username, email , password } = this.state.fields;
        axios.post('http://stadiumticket.ir/register' , {username,email,password})
            .then(response => {
                localStorage.setItem('api_token' , response.data);
                this.props.login();
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleSubmit(event) {
        event.preventDefault();

        this.handleValidation((valid) => {
            if(valid) this.handleRequest()
        })
    }

    render() {
        const {username,lastname,email , password} = this.state.fields;
        const { errors } = this.state;
        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.handleSubmit.bind(this)} className="col-lg-5" style={{ marginTop : 20}}>
                    <div className="form-group">
                        <label>User Name : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["username"] ? 'is-invalid' : ''].join(' ')}
                            name="username"
                            value={username}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your User Name"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["name"] ? 'block' : 'none'}}>{errors["name"]}</span>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label>Last Name : </label>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        className={["form-control" , errors["lastname"] ? 'is-invalid' : ''].join(' ')}*/}
                    {/*        name="lastname"*/}
                    {/*        value={lastname}*/}
                    {/*        onChange={this.handleChange.bind(this)}*/}
                    {/*        placeholder="Please enter your Last name"/>*/}
                    {/*    <span className="invalid-feedback rtl" style={{ display : errors["lastname"] ? 'block' : 'none'}}>{errors["lastname"]}</span>*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <label>Email : </label>
                        <input
                            type="text"
                            className={["form-control" , errors["email"] ? 'is-invalid' : ''].join(' ')}
                            name="email"
                            value={email}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your email"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["email"] ? 'block' : 'none'}}>{errors["email"]}</span>
                    </div>
                    <div className="form-group">
                        <label>Password : </label>
                        <input
                            type="password"
                            className={["form-control" , errors["password"] ? 'is-invalid' : ''].join(' ')}
                            name="password"
                            value={password}
                            onChange={this.handleChange.bind(this)}
                            placeholder="Please enter your password"/>
                        <span className="invalid-feedback rtl" style={{ display : errors["password"] ? 'block' : 'none'}}>{errors["password"]}</span>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-danger" type="submit">Sign In</button>
                    </div>
                </form>

            </div>
            // <form>
            //     <h3>Sign Up</h3>
            //
            //     <div className="form-group">
            //         <label>First name</label>
            //         <input type="text" className="form-control" placeholder="First name" />
            //     </div>
            //
            //     <div className="form-group">
            //         <label>Last name</label>
            //         <input type="text" className="form-control" placeholder="Last name" />
            //     </div>
            //
            //     <div className="form-group">
            //         <label>Email address</label>
            //         <input type="email" className="form-control" placeholder="Enter email" />
            //     </div>
            //
            //     <div className="form-group">
            //         <label>Password</label>
            //         <input type="password" className="form-control" placeholder="Enter password" />
            //     </div>
            //
            //     <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            //     <p className="forgot-password text-right">
            //         Already registered <a href="#">sign in?</a>
            //     </p>
            // </form>
        );
    }
}
export default SignUp;