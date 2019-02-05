import React, { Component } from "react";
import { Row, Col, Dropdown, Icon, Menu } from "antd";
import MenuItem from "./MenuItem";
import AccountMenu from "./AccountMenu";
class MainHeader extends Component {
  render() {
    return (
      <Row>
        <Col span={24} offset={0} style={{ textAlign: "center" }}>
          <img
            alt="ACES-Logo"
            src={this.props.image}
            style={{ width: "auto", height: 100, display: "inline", zIndex: 2 }}
          />
          <MenuItem name="home" exact={true} to="/">
            Home
          </MenuItem>
          <MenuItem name="conference" to="/conference">
            Conference
          </MenuItem>
          <MenuItem name="events" to="/events">
            Events
          </MenuItem>
          <MenuItem name="about-us" to="/about">
            About
          </MenuItem>
          <AccountMenu />
        </Col>
      </Row>
    );
  }
}

export default MainHeader;
