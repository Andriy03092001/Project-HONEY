import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import Login from './components/auth/login/login';
import RegisterPage from './components/auth/register/index';
import { Home } from './components/Home';
import { NavMenu } from './components/NavMenu';




import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Fragment>
        <NavMenu />
        <div className="container">
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={RegisterPage} />
        </div>
      </Fragment>
    );
  }
}
