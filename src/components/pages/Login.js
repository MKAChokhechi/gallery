import React, { Component } from 'react';
import validator from 'validator';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        if(this.props.auth) {
            this.props.history.push('/home')
        }

        this.state = {
            fields : {
                username : '',
                password : ''
            },
            errors : {}
        }
    }

    handleValidation(callback) {
        let { fields } = this.state;
        let errors = {};
        let formIsValid = true;

        // Email
        if(validator.isEmpty(fields.username)) {
            formIsValid = false;
            errors["email"] = "فیلد ایمیل نمیتواند خالی بماند";
        }
        // else if(! validator.isEmail(fields.username)) {
        //     formIsValid = false;
        //     errors["username"] = "فرمت ایمیل اشتباه است";
        // }

        // Email
        if(validator.isEmpty(fields.password)) {
            formIsValid = false;
            errors["password"] = "فیلد پسورد نمیتواند خالی بماند";
        } else if(! validator.isLength(fields.password , { min : 6 , max : undefined})) {
            formIsValid = false;
            errors["password"] = "حداقل کاراکتر6 عدد می باشد";
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
        const { username , password } = this.state.fields;

        axios.post('http://stadiumticket.ir/login' , {username,password})
            .then(response => {
                localStorage.setItem('api_token' , response.data);
                this.props.login();
                this.props.history.push('/home')

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
        const {username , password} = this.state.fields;
        const { errors } = this.state;
        return (
            <div>
                <h2>Login Form</h2>
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
                        <span className="invalid-feedback rtl" style={{ display : errors["username"] ? 'block' : 'none'}}>{errors["email"]}</span>
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
                        <button className="btn btn-danger" type="submit">Log In</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default Login;
