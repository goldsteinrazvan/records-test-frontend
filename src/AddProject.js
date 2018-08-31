import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import { withRouter , Link } from 'react-router-dom';
import axios from 'axios';

class AddProject extends Component {
    constructor(props){
        super(props); 

        this.addProject = this.addProject.bind(this); 

        this.state = {
            message: ''
        }
    }

    addProject() {
        let self = this;
        axios({
            method:'post',
            url: 'http://localhost:3000/api/v1/projects', 
            data: { 'name' : this.name.value, 
                    'description' : this.description.value
                  },
            withCredentials:true 
        })
        .then(res => {
            this.setState({ message: res.data });
            window.setTimeout(function(){
                self.props.history.push("/Projects");
            }, 1500); 
        })
        .catch(function (error) {
            if(error.response.status === 401){
                self.setState({ message: 'Please login to add a project' });
                window.setTimeout(function(){
                    self.props.history.push("/");
                }, 1000); 
            }
        });
    }

    render() {
        return(
            <div className="container">
                <div className="row full-height">

                    <div className="col-sm-4 col-sm-offset-4 full-height">
                        <div className="with-top same-height">
                            <h3 className="with-bottom">Add a project</h3>
                            <input ref={(name) => {this.name = name;}} placeholder="Name" type="text" id="project" className="field form-control"/>
                            <br></br>
                            <textarea ref={(description) => {this.description = description;}} placeholder="Description" id="textarea" className="field form-control"></textarea>
                            <br></br>
                            <br></br>
                            <button className="btn btn-primary btn-md btn-block action-btn" id="add-btn" onClick={this.addProject}>Add</button>
                        </div>
                        <div className="with-top">
                            <h3>{ this.state.message }</h3>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(AddProject);