import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class MenuItem extends Component {
  state = {
    inline: this.props.mobile === "true" ? "block" : "inline"
  };

  render() {
    return (
      <NavLink
        name={this.props.name}
        className="aces-txt"
        activeStyle={{ color: "#44bd32", textDecoration: "underline" }}
        style={{
          color: "white",
          display: this.state.inline,
          margin: "1vw",
          cursor: "pointer",
          fontSize: 16
        }}
        to={this.props.to}
        exact={this.props.exact}
        onClick={this.props.click}
      >
        {this.props.children}
      </NavLink>
    );
  }
}
