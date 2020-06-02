import React, { Component } from 'react';
import axios from 'axios';
import validator from "validator";
class Addalbum extends Component {
    constructor(props) {
        super(props);
        if(this.props.auth) {
            this.props.history.push('/')
        }
        this.state = {
            fields : {
                albumname : ''
            },
            errors : {}
        }
    }

    handleValidation(callback) {
        let { fields } = this.state;
        let errors = {};
        let formIsValid = true;

        // albumname
        if(validator.isEmpty(fields.albumname)) {
            formIsValid = false;
            errors["albumname"] = "Field is Empty!";
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
        const { albumname } = this.state.fields;
        axios.post('http://stadiumticket.ir/albums' , {albumname})
            .then(response => {
                localStorage.setItem('api_token' , response.data.name);
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
        const {albumname} = this.state.fields;
        const { errors } = this.state;
        return (
            <div className="container ">
                <h2>ADD YOUR ALBUM</h2>
                <div className="jumbotron  " style={{width:"50%"}}>
                    <label >Album Name : </label>
                    <div className="form-control-feedback row" onSubmit={this.handleSubmit.bind(this)}  style={{width:"170%"}}>
                       <input
                           type="text"
                           className={["form-control col" , errors["albumname"] ? 'is-invalid' : ''].join(' ')}
                           name="albumname"
                           value={albumname}
                           onChange={this.handleChange.bind(this)}
                           placeholder="Please enter your Album Name"/>
                       <span className="invalid-feedback col" style={{ display : errors["albumname"] ? 'block' : 'none'}}>{errors["albumname"]}</span>

                       <div className="col">
                           <button className="btn btn-success" type="submit">+</button>
                       </div>
                   </div>
               </div>
            </div>
        );
    }
}

export default Addalbum;
