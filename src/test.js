import React, { Component } from 'react';
import { connect } from 'react-redux'

class MyTest extends Component {

	render() {
		console.log(this.props.isLoggedIn)
		if(this.props.isLoggedIn)
			return <h1>You're logged in</h1>;
		else
			return <h1>You're NOT logged in</h1>;
	}
}


const mapStateToProps = state => {
	console.log(state)
  return {
    isLoggedIn: state.isAuthenticated
  }
}


const Test = connect(
  mapStateToProps,
  null
)(MyTest)


export default Test;