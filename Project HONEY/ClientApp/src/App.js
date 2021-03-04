import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import LoginPage from './components/auth/login/index';
import RegisterPage from './components/auth/register/index';
import { Home } from './components/Home';
import NavMenu from './components/NavMenu';
import PanelPage from './components/panel/index';
import './custom.css'



export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Fragment>
        <NavMenu />
        <div className="container">
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/panel' component={PanelPage} />
        </div>
      </Fragment>
    );
  }
}
