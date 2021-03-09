import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { connect } from 'react-redux';

class NavMenu extends Component {


  state = {
    isAuthenticated: this.props.isAuthenticated
  }

  //визивається при зміні даних у пропсах
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    console.log('Change props', nextProps);
    this.setState({
      isAuthenticated: nextProps.isAuthenticated
    });
  }

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidMount() {
    console.log(this.state.isAuthenticated)
  }

  render() {


    console.log(this.state.isAuthenticated);
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Honey Courses</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
              <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/panelStudent">Student panel</NavLink>
                </NavItem>
              <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/panelCourses">Course manager</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/panel">Student manager</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/register">Register</NavLink>
                </NavItem>
                {this.state.isAuthenticated===true && (<p>Logout</p>)}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

const mapState = (stateRedux) => {
  console.log("mapState navbar ", stateRedux.login.isAuthenticated )
  return {
    isAuthenticated: stateRedux.login.isAuthenticated
  }
}

export default connect(mapState, null)(NavMenu)

