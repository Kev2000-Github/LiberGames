import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from '../components/Home/home.jsx';
import Login from '../components/Login/login.jsx';
import NotFound from '../components/NotFound/notFound.jsx';
import Library from '../components/Library/library.jsx';
import Upload from '../components/Upload/upload.jsx';

const App=()=>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/library" component={Library}/>
            <Route exact path="/upload" component={Upload}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
)

export default App;