import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import { withRouter , Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';


class Projects extends Component {
    constructor(props){
        super(props); 

        this.state = {
            message: '',
            updateMsg:'',
            data : []
        }
        this.deleteProject = this.deleteProject.bind(this); 
        this.modifyProject = this.modifyProject.bind(this); 
        this.updateProject = this.updateProject.bind(this); 
    }

    componentDidMount() {
        let self=this;
            axios({
                method:'get',
                url: 'http://localhost:3000/api/v1/projects', 
                withCredentials:true 
            })
            .then(res => {
                this.setState({ data: res.data});
            })
            .catch(function (error) {
                if(error.response.status === 401){
                    self.setState({ message: 'Please login to add a project' });
                    window.setTimeout(function(){
                        self.props.history.push("/");
                    }, 1500); 
                }
            });
    }

    deleteProject(id){
        let self=this;
        axios({
            method:'delete',
            url: 'http://localhost:3000/api/v1/projects/'+id, 
            withCredentials:true 
        })
        .then(res => {
            let elem = document.getElementById(id);
            elem.parentNode.removeChild(elem);
            this.setState({ message: res.data });
        })
        .catch(function (error) {
            this.setState({ message: error.response.data });
        });
    }

    modifyProject(id){
        let self=this;
        axios({
            method:'get',
            url: 'http://localhost:3000/api/v1/projects/'+id, 
            withCredentials:true 
        })
        .then(res => {
            document.getElementById('update-section').style.display = 'block';
            self.name.setAttribute('id' , id);
            self.name.value = res.data.name;
            self.description.value = res.data.description;
        })
        .catch(function (error) {
            let err = error.response.data.errors[0].msg;
            self.setState({ message: err });
        });
    }

    updateProject(id){
        let self=this;
        axios({
            method:'put',
            url: 'http://localhost:3000/api/v1/projects/'+id, 
            data: { 'name' : this.name.value, 
                    'description' : this.description.value
                  },
            withCredentials:true 
        })
        .then(res => {
            document.getElementById('update-section').style.display = 'none';
            self.setState({ updateMsg: res.data });
            window.setTimeout(function(){
                window.location.reload();
            }, 1000); 
        })
        .catch(function (error) {
            let err = error.response.data.errors[0].msg;
            self.setState({ updateMsg: err });
        });
    }


    render() {
        let projects = this.state.data.map((project) =>
            <li id={project.id} key={project.id}>
                <h3>{project.name}</h3>
                <p className="item">{project.description}</p>
                <button className="btn btn-md btn-danger" onClick={() => {this.deleteProject(project.id)}}>Delete Project</button>
                <button className="btn btn-md btn-info update" onClick={() => {this.modifyProject(project.id)}}>Update Project</button>
            </li>
        );

        return(
            <div className="container">
                <div className="row full-height">

                    <div className="col-sm-6 full-height">
                        <div className="with-top">
                            <h2>Project list :</h2>
                            <div className="with-top">
                                <h3>{ this.state.message }</h3>
                            </div>
                            <ul id="list">
                                {projects}
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-6 full-height">
                        <h3 className="with-top">{this.state.updateMsg}</h3>
                        <div className="with-top" id="update-section">
                            <input ref={(name) => {this.name = name;}} placeholder="Name" type="text" id="project" className="field form-control"/>
                            <br></br>
                            <textarea ref={(description) => {this.description = description;}} placeholder="Description" id="textarea" className="field form-control"></textarea>
                            <br></br>
                            <br></br>
                            <button className="btn btn-md btn-info" onClick={() => {this.updateProject(this.name.id)}}>Update Project</button>
                        </div>
                    </div>

                </div>
                <Link className="btn btn-md btn-info with-top-bottom bottom-btn" to={`/AddProject`}><span className="glyphicon glyphicon-chevron-left"></span>&nbsp;&nbsp;To Add Project</Link>
            </div>
        );
    }
}

export default withRouter(Projects);