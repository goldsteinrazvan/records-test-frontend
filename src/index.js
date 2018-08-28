import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Text from './Text';
import Page from './Page';
import App from './App';
import AddProject from './AddProject';
import { BrowserRouter, Router, Route} from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <div id="router-parent">
            <Route exact path="/" component={App}/>
            <Route path="/Page" component={Page}/>
            <Route path="/AddProject" component={AddProject}/>
        </div>
    </BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();

