import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Page1 from './components/page1';
import Page2 from './components/page2';
import Page3 from './components/page3';
// import Login from './Components/Login/login'


export default (
    <Switch>
        <Route exact path="/" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
        



    </Switch>
)