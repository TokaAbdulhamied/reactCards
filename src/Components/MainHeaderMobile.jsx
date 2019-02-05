import React, { Component } from "react";
import { slide as Menu } from "react-burger-menu";
import MenuItem from "./MenuItem";
import AccountMenu from "./AccountMenu";
import Switch from "react-router-dom/Switch";

const style = {
  bmBurgerButton: {
    position: "fixed",
    width: "30px",
    height: "30px",
    left: "5%",
    top: "3%"
  },
  bmBurgerBars: {
    background: "#008F47"
  },
  bmCrossButton: {
    height: "40px",
    width: "40px"
  },
  bmCross: {
    background: "white"
  },
  bmMenu: {
    background: "#008F47",
    padding: "2em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#008F47"
  },
  bmItemList: {
    color: "#008F47",
    padding: "0.8em"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};
class MainHeaderMobile extends Component {
  render() {
    return (
      <div>
        <Menu pageWrapId={"page-wrap"} noOverlay styles={style}>
          <MenuItem name="home" exact={true} to="/" mobile="true">
            Home
          </MenuItem>
          <MenuItem name="conferences" to="/conference" mobile="true">
            Conference
          </MenuItem>
          <MenuItem name="events" to="/events" mobile="true">
            Events
          </MenuItem>
          <MenuItem name="about-us" to="/about" mobile="true">
            About
          </MenuItem>
          <hr />
          <AccountMenu />
        </Menu>
        <div id="page-wrap" style={{ textAlign: "center" }}>
          <img
            alt="ACES-Logo"
            src={this.props.image}
            style={{ width: "auto", height: 60, zIndex: 2 }}
          />
        </div>
      </div>
    );
  }
}

export default MainHeaderMobile;
