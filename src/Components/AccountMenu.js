import React, { Component } from "react";
import { Dropdown, Icon, Menu } from "antd";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import client, { refreshAuthHeaders } from "../API_calls/client";
import { setAuthState, setRedirection, setProfile } from "../store/actions";
import Responsive from "react-responsive";
import ReactHtmlParser from 'react-html-parser';

class AccountMenuPres extends Component {
  handleClick = e => {
    switch (e.key) {
      case "2":
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_type");
        localStorage.removeItem("user_id");

        console.log(localStorage.getItem('user_id'));
        this.props.authenticationChangedHandler(null);
        refreshAuthHeaders();
        this.props.profileAvailableHandler(false)
        this.props.history.push('/');
    }
  };
  handleSignOut = e => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_type");
    localStorage.removeItem("user_id");

    console.log(localStorage.getItem('user_id'));
    this.props.authenticationChangedHandler(null);
    refreshAuthHeaders();
    this.props.profileAvailableHandler(false)
    this.props.history.push('/');

  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <div style={{ display: "inline" }}>
        <Responsive minWidth={700}>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    fontSize: 16
                  }}
                  onClick={this.handleClick}
                >
                  <Menu.Item key="1" style={{ color: "white", fontSize: 16 }}>
                    <Link style={{ color: "white"}} to='/profile'>Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="2" style={{ color: "white", fontSize: 16 }}>
                    Sign Out
                  </Menu.Item>
                </Menu>
              }
            >
              <p
                style={{
                  color: "white",
                  display: "inline",
                  margin: "1vw",
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                {ReactHtmlParser(this.props.accountProfile.name)} <Icon type="down" />
              </p>
            </Dropdown>
            </Responsive>
          <Responsive maxWidth={700}>
            <p
              style={{
                color: "white",
                display: "block",
                cursor: "pointer",
                margin: "1vw",
                fontSize: 16
              }}
            >
              <Link style={{ color: "white"}} to='/profile'>{ReactHtmlParser(this.props.accountProfile.name)}</Link>
            </p>
            <p
              style={{
                color: "white",
                display: "block",
                cursor: "pointer",
                margin: "1vw",
                fontSize: 16
              }}
              onClick={this.handleSignOut}
            >
              Sign Out
            </p>
          </Responsive>
        </div>
      );
    } else {
      return (
        <div style={{ display: "inline" }}>
          <Responsive minWidth={768}>
            <Dropdown
              trigger={["click"]}
              overlay={
                <Menu
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    fontSize: 16
                  }}
                  onClick={this.handleClick}
                >
                  <Menu.Item key="3" style={{ color: "white", fontSize: 16 }}>
                    <Link to="/signin" style={{ color: "white" }}>
                      Sign In
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="4" style={{ color: "white", fontSize: 16 }}>
                  <Link style={{ color: "white"}} to='/signup'>Sign Up</Link>
                  </Menu.Item>
                </Menu>
              }
            >
              <p
                className="aces-txt"
                style={{
                  color: "white",
                  display: "inline",
                  margin: "1vw",
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Account <Icon type="down" />
              </p>
            </Dropdown>
          </Responsive>
          <Responsive maxWidth={700}>
            <Link
              to="/signin"
              style={{
                color: "white",
                display: "block",
                cursor: "pointer",
                margin: "1vw",
                fontSize: 16
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              style={{
                color: "white",
                display: "block",
                cursor: "pointer",
                margin: "1vw",
                fontSize: 16
              }}
            >
              <Link style={{ color: "white"}} to='/signup'>Sign Up</Link>
            </Link>
          </Responsive>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isAuthenticated,
    accountProfile: state.accountProfile,
    redirectAvailable: state.redirectAvailable
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authenticationChangedHandler: isLoggedIn => {
      dispatch(setAuthState(isLoggedIn));
    },
    profileAvailableHandler: profile => {
      dispatch(setProfile(profile));
    },
    redirectionHandler: redirect => {
      dispatch(setRedirection(redirect));
    }
  };
};
const AccountMenu = connect(mapStateToProps, mapDispatchToProps)(
  AccountMenuPres
);

export default withRouter(AccountMenu);
