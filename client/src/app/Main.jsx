/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React            from 'react';
import {Component}      from 'react';
import {Router, Route, Link}
                        from 'react-router';

import RaisedButton     from 'material-ui/RaisedButton';
import Dialog           from 'material-ui/Dialog';
import {deepOrange500}  from 'material-ui/styles/colors';
import FlatButton       from 'material-ui/FlatButton';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar           from 'material-ui/AppBar';
import TextField        from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Login            from './login/login.jsx';
import * as loginCtrl   from './login/loginCtrl';

// Redux
import { connect }      from 'react-redux';


const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoggedIn: !!loginCtrl.getJwt(),
      open: false
    };
  }

  handleLogout() {
    loginCtrl.logout();
    this.setState({
      isLoggedIn: false
    });
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {

    // Styling
    const linkStyle = {
      color:'gray',
      textDecoration:'none',
      fontSize: '11px',
    };

    const logOutButton = this.state.isLoggedIn ?
      (<FlatButton label="Logout"
        onTouchTap={this.handleLogout.bind(this)}
       />
      ) :
      null;
    const LoginModal = !this.state.isLoggedIn ?
      (<Login main={this} />) :
      null;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title={this.props.title}
            iconElementRight={logOutButton}
            onLeftIconButtonTouchTap={this.handleToggle}
          />
          <Drawer
            docked={false}
            width={150}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
            >

            { this.props.ambit === null ?
              <div></div> :
              <MenuItem onTouchTap={this.handleClose}>
                <Link to='/ambit' style={linkStyle} >
                  Ambit
                </Link>
              </MenuItem> }

            <MenuItem onTouchTap={this.handleClose}>
              <Link to='/' style={linkStyle} >
                Day View
              </Link>
            </MenuItem>

            <MenuItem onTouchTap={this.handleClose}>
              <Link to='/week' style={linkStyle} >
                Week View
              </Link>
            </MenuItem>
          </Drawer>


          {LoginModal}
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}


const mapStateToProps = (state) => ({
  title: state.title,
  ambit: state.ambit
});

Main = connect(mapStateToProps)(Main);


export default Main;
