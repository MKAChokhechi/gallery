import React, { Component } from 'react';
import axios from 'axios';
class About extends Component {
    constructor(props) {
        super(props);
            this.state={
                selectedFile : null
        }
    }
    fileSelectedHandler(){
        // console.log(selectedFile)

        this.setState({
            selectedFile: this.target
                // .files[0]
        })
    }
    fileUploadHandler(){
    const fd = new FormData();
    fd.append('image',this.selectedFile);
    axios.post('http://stadiumticket.ir/albums/<str:name>',fd,{
        onUploadProgress: progressEvent => {
            console.log('Upload Progress ' + Math.round(progressEvent.added / progressEvent.total *100) + '%')
        }

    })
        .then(response =>{
            console.log(response)
        })
        .catch(error=> {
            console.log(error)
    });

    }
    render() {
        return (

            <div>
                <h2>Add Photo</h2>
                <div className="input-group mb-2">
                     <input className="btn btn alert-danger" type='file' onChange={this.fileSelectedHandler.bind(this)}/>
                     <button className="btn btn-sm" onClick={this.fileUploadHandler.bind(this)}>Upload</button>
                </div>
            </div>


        );
    }
}

export default About;
