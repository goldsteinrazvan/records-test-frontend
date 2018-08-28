import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './App';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '350px',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '22px'
    }
  };

Modal.setAppElement('#root')

class Text extends Component {
    constructor(props){
        super(props);
        this.enterAccount = this.enterAccount.bind(this); 
        this.registerAccount = this.registerAccount.bind(this); 

        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
    } 
     
    closeModal() {
        this.setState({modalIsOpen: false});
        this.content.innerHTML = "";
    }

    afterOpenModal(message) {
        if(!message){
            return;
        }
        var node = document.createElement("p");
        var textnode = document.createTextNode(message);
        node.appendChild(textnode);                       
        var elem = this.content.appendChild(node);
        return elem;
    }
    
    enterAccount() {
        var self = this;
        axios({
            method:'post',
            url: 'http://localhost:3000/api/v1/login', 
            data: { 'username' : this.lusername.value, 
                    'password' : this.lpassword.value
                  },
        })
        .then(res => {
            this.props.history.push("/AddProject");
        })
        .catch(function (error) {
            console.log(error)
            // var errArr = error.response.data.errors[0].msg;
            // self.openModal();
            // errArr.forEach(function(val, i) {
            //     self.afterOpenModal(val['msg']);
            // })
        });
    }

    loginAfterRegistering() {
        var self = this;
        axios({
            method:'post',
            url: 'http://localhost:3000/api/v1/login', 
            data: { 'username' : this.rusername.value, 
                    'password' : this.rpassword.value, 
                  },
        })
        .then(res => {
            // self.openModal();
            // self.afterOpenModal(res.data);
            console.log(res);
            console.log(res.data);
            this.props.history.push("/AddProject");
        })
        .catch(function (error) {
            console.log(error.response);
            // var errArr = error.response.data.errors[0].msg;
            // self.openModal();
            // errArr.forEach(function(val, i) {
            //     self.afterOpenModal(val['msg']);
            // })
        });
    }

    registerAccount() {
        var self = this;
        axios({
            method:'post',
            url: 'http://localhost:3000/api/v1/register', 
            data: { 'username' : this.rusername.value, 
                    'password' : this.rpassword.value, 
                    'email' : this.remail.value},
        })
        .then(res => {   
            self.openModal();
            self.afterOpenModal(res.data);                   

            // document.getElementById('close-btn').addEventListener('click' , function(){
            //     self.loginAfterRegistering();
            // }) TODO finish redirect after registering 
        })
        .catch(function (error) {
            var errArr = error.response.data.errors[0].msg;
            self.openModal();
            errArr.forEach(function(val, i) {
                self.afterOpenModal(val['msg']);
            })
        });
    }

    render() {
        return(
            
            <div className="text container" id="main">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    >
                    <div>
                        <button className="btn btn-sm btn-danger close-btn" id="close-btn" onClick={this.closeModal}><span className="glyphicon glyphicon-remove"></span></button>
                    </div>
                    <div className="content" ref={(content) => {this.content = content;}}></div>
                </Modal>

                <div className="row full-height">
                    <div className="col-sm-6 full-height">
                        <div className="with-top same-height">
                            <h4>Already have an account</h4>
                            <h3 className="with-bottom">Login</h3>
                            <input ref={(lusername) => {this.lusername = lusername;}} placeholder="Username" type="text" id="lusername" className="field form-control"/>
                            <br></br>
                            <input ref={(lpassword) => {this.lpassword = lpassword;}} placeholder="Password" type="password" id="lpassword" className="field form-control"/>
                            <br></br>
                            <br></br>
                            <button className="btn btn-info btn-md btn-block action-btn" id="login-btn" onClick={this.enterAccount}>Login</button>
                        </div>
                    </div>

                    <div className="col-sm-6 full-height">
                        <div className="with-top same-height">
                            <h4>I don't have have an account</h4>
                            <h3 className="with-bottom">Register</h3>
                            <input ref={(remail) => {this.remail = remail;}} placeholder="Mail" type="e-mail" id="remail" className="field form-control"/>
                            <br></br>
                            <input ref={(rusername) => {this.rusername = rusername;}} placeholder="Username" type="text" id="ruser" className="field form-control"/>
                            <br></br>
                            <input ref={(rpassword) => {this.rpassword = rpassword;}} placeholder="Password" type="password" id="rpassword" className="field form-control"/>
                            <br></br>
                            <br></br>
                            <button className="btn btn-primary btn-md btn-block action-btn" id="register-btn" onClick={this.registerAccount}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    
}

export default withRouter(Text);