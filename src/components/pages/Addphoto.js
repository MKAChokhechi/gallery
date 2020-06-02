import React, { Component } from 'react';
import axios from "axios";

class Addphoto extends Component {
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

            <div className="container">
                <h2>ADD PICTURE</h2>
                <div className="jumbotron "  style={{width:"50%"}}>
                   <div style={{marginBottom:10}}>
                       <select className="form-control form-control-sm" >
                           <option>Large select</option>
                       </select>
                   </div>
                    <div className="input-group mb-2">
                        <input
                            className="btn btn alert-danger"
                            type='file'
                            style={{marginRight:10}}
                            onChange={this.fileSelectedHandler.bind(this)}
                        />
                        <button className="btn btn-success" onClick={this.fileUploadHandler.bind(this)}>Upload</button>
                    </div>
                </div>
            </div>


        );
    }
}

export default Addphoto;
