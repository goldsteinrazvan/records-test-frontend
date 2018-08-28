import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class AddProject extends Component {
    constructor(props){
        super(props); 
    }
    

    render() {
        return(
            <div className="container">
                <div className="row full-height">

                    <div className="col-sm-6 full-height">
                        <div className="with-top same-height">
                            <h3 className="with-bottom">Add a project</h3>
                            <input placeholder="Name" type="text" id="project" className="field form-control"/>
                            <br></br>
                            <textarea placeholder="Description" type="password" id="textarea" className="field form-control"></textarea>
                            <br></br>
                            <br></br>
                            <button className="btn btn-primary btn-md btn-block action-btn" id="add-btn" onClick={this.registerAccount}>Add</button>
                        </div>
                    </div>

                     <div className="col-sm-6 full-height">
                        <div className="with-top same-height">
                            <ul id="projects-list">
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AddProject);