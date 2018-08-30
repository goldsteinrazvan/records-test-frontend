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
            data: []
        }
    }

    addProject() {
        var self=this;

        let instance = axios.create();
        
          // Set the AUTH token for any request
        instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization =  token ? `${token}` : '';
            console.log(config)
            return config;
        });

        instance({
            method:'post',
            url: 'http://localhost:3000/api/v1/projects', 
            data: { 'name' : this.name.value, 
                    'description' : this.description.value
                  },
                  mode: 'no-cors',
                  credentials: 'same-origin'
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            //self.getAllProjects(); ??
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    getAllProjects(){
        axios({
            method:'get',
            url: 'http://localhost:3000/api/v1/projects', 
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
            var result = res.data;
            this.setState({ data: result});
        })
        .catch(function (error) {
            console.log(error.response)
        });
    }
    
    render() {
        var project = this.state.data.map((project) =>
            <li key={project.id}>
                <Link to={`/project/${project.id}`}>
                    <h3>{project.id}</h3>
                    <h4>{project.name}</h4>
                </Link>
            </li> //de adaptat functie de dataObj 
        );

        return(
            <div className="container">
                <div className="row full-height">

                    <div className="col-sm-6 full-height">
                        <div className="with-top same-height">
                            <h3 className="with-bottom">Add a project</h3>
                            <input ref={(name) => {this.name = name;}} placeholder="Name" type="text" id="project" className="field form-control"/>
                            <br></br>
                            <textarea ref={(description) => {this.description = description;}} placeholder="Description" id="textarea" className="field form-control"></textarea>
                            <br></br>
                            <br></br>
                            <button className="btn btn-primary btn-md btn-block action-btn" id="add-btn" onClick={this.addProject}>Add</button>
                        </div>
                    </div>

                     <div className="col-sm-6 full-height">
                        <div className="with-top same-height">
                            <ul id="projects-list">
                                {project}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddProject);