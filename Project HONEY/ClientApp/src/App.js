import React, { Component, Fragment,Suspense } from 'react';
import { Route } from 'react-router';
import LoginPage from './components/auth/login/index';
import RegisterPage from './components/auth/register/index';
import { Home } from './components/Home';
import PanelPage from './components/panel/index';
import PanelCoursesPage from './components/panelCourses/index'
import PanelStudentPage from './components/student/index'
import {PrivateRoute} from './components/privateRouter'

import './custom.css'

const Navbar = React.lazy(() => import('./components/NavMenu'));

export default class App extends Component {
  static displayName = App.name;
  render() {
    return (
      <Fragment>
        <Suspense fallback={<p>Loading ...</p>}>
        <Navbar/>
        <div className="container">
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          {/* <Route exact path='/panel' component={PanelPage} /> */}
          {/* <Route exact path='/panelCourses' component={PanelCoursesPage} /> */}
          {/* <Route exact path='/panelStudent' component={PanelStudentPage} /> */}

          <PrivateRoute exact path="/panel" roles={"User"} component={PanelStudentPage} />  {/* Student panel with sub courses */}

          <PrivateRoute exact path="/panelCourses" roles={"Admin"} component={PanelCoursesPage} /> {/* Admin panel with courses-manager */}
          <PrivateRoute exact path="/panelStudent" roles={"Admin"} component={PanelPage} />{/* Admin panel with student-manager */}


        </div>
        </Suspense>
      </Fragment>
    );
  }
}
