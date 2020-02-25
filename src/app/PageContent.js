import React from 'react';
import Home from '../General/Home';
import DashBoard from '../dashboard/Dashboard';
import Incidentlog from '../form/incidentlog';
import Incident from '../General/incident';
import Updatelog from '../form/updatelog';
import User from '../Userlogin/User';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
const PageContent = () => {
  return (
    <div>
      <Router>
        {/* page content */}
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <Route path='/Dashboard' exact component={DashBoard}></Route>
          <Route path='/incidentlog' exact component={Incidentlog}></Route>
          <Route path='/incident' exact component={Incident}></Route>
          <Route path='/updatelog' exact component={Updatelog}></Route>
          <Route path='/user' exact component={User}></Route>
          <Redirect to='/'></Redirect>
        </Switch>
        {/* /page content */}
      </Router>
    </div>
  );
};

export default PageContent;
