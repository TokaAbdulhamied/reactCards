import React, { Component } from "react";
import client, { refreshAuthHeaders } from "./API_calls/client";
import { connect } from "react-redux";
import {setAuthState,setProfile,setRedirection, setEvent} from "./store/actions";
import store from "./store/store";
import jwt_decode from 'jwt-decode';
import image from "./images/logo.png";
import MainHeader from "./Components/MainHeader";
import MainHeaderMobile from "./Components/MainHeaderMobile";
import MainFooter from "./Components/MainFooter";
import FacebookToggle from "./Components/FacebookToggle";
import { BrowserRouter, Router, Redirect,Route,Link } from 'react-router-dom'
import Home from './Pages/Home'
import Events from './Pages/Events'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp'
import Slots from './Pages/Slots'
import Phases from './Pages/Phases'
import Preferences from './Pages/Preferences'
import SignIn from './Pages/SignIn'
import Responsive from 'react-responsive';
import ComingSoon from "./Pages/ComingSoon";
import About from "./Pages/About";
import Conference from "./Pages/Conference";
import External from "./Pages/External";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import OnlineTest from "./Pages/OnlineTest";
//import ACG from "./Pages/ACG";
//import VacancyInfo from './Pages/VacancyInfo';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={700} />;

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});
class MyApp extends Component {
  state = {
    activeItem: "home",
    username: null,
    password: null
  };

  componentDidMount() {
    //Track Redux Store Changes
    const unsubscribe = store.subscribe(() => {
      console.log(store.getState());
    });
    //Get Current User Profile (IF AVAILABLE)
    client
      .get("/registration/profile/")
      .then(response => {
        console.log(response.data);
        this.props.profileAvailableHandler(response.data)
      })
      .catch(error => {
        console.log(error);
      });
      client
      .get("/registration/events/")
      .then(response => {
        console.log(response.data);
        response.data.map(event => {
          if(event.is_open) {
            if(event.applied) {
              this.props.appliedEventHandler(event)
            }
          }
        })
      })
      .catch(error => {
        console.log(error);
      });
      if(localStorage.getItem("auth_token")) {
        var decoded = jwt_decode(localStorage.getItem('auth_token'));
        if(decoded.type == 'AP')
          localStorage.setItem("user_type", 1);
        if(decoded.type == 'C')
          localStorage.setItem("user_type", 3);
        if(decoded.type == 'FR')
          localStorage.setItem("user_type", 2);
        localStorage.setItem("user_id",decoded.user_id);
      }
  }


 

  render() {
    let redirectComponent = null
    if(this.props.redirectAvailable){
      redirectComponent = <Redirect to={this.props.redirectAvailable} />;
      this.props.redirectionHandler(null);
    }
    else {
      redirectComponent = null;
    }
    return (
      <BrowserRouter>
      <div className="App">
      <Responsive minWidth={700}>
        <MainHeader
          image={image}
          isLoggedIn={this.props.isLoggedIn}
           />
           </Responsive>
        <Mobile>
          <MainHeaderMobile 
          image={image}
          routing={this.MenuItemClick}
          activeItem={this.state.activeItem}
          isLoggedIn={this.props.isLoggedIn}
          />
          </Mobile>
        {redirectComponent}
        <Route exact path='/' component={Home} />
        <Route exact path='/events' component={Events} />
        <Route exact path='/slots' component={Slots} />
        <Route exact path='/about' component={About} />
        <Route exact path='/conference' component={Conference} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/forgetpass' component={ForgetPassword} />
        <Route exact path='/resetpassword' component={ResetPassword} />
        <Route exact path='/events/:eventName/:eventId/preferences' component={Preferences} />
        <Route exact path='/events/:eventName/:eventId/:preference/phases' component={Phases} />
        <Route exact path='/events/:eventName/:eventId/:preference/phases/:phaseName/:phaseId' component={Slots} />
        <Route exact path='/events/:eventName/:eventId/:preference/phases/online/:phaseName/:phaseId' component={OnlineTest} />
        <Route exact path='/events/:eventName/:eventId/:preference/phases/external' component={External} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/signin' component={SignIn} />
        {/* <Route exact path='/ACG/:vacancyId/' component={VacancyInfo} />
        <Route exact path='/ACG/' component={ACG} /> */}


        {/* <FacebookToggle />  */}
        <MainFooter />
      </div>
        </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isAuthenticated,
    accountProfile:state.accountProfile,
    redirectAvailable:state.redirectAvailable,
    appliedEvent:state.appliedEvent
  }
}

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
    },
    appliedEventHandler: event => {
      dispatch(setEvent(event));
    }
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(MyApp);

export default App;
