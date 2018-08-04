import React, {Component} from 'react';

import HomePage from "./components/HomePage/HomePage.js"
import MapView from "./components/MapView/MapView.js"
import MyAccount from "./components/MyAccount/MyAccount.js"
import TripDetails from "./components/TripDetails/TripDetails.js"
import LoginForm from "./components/auth/Login.js"
import SignOutButton from "./components/auth/SignOut.js"
import SignUpForm from "./components/auth/SignUp.js"

import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom';


import './App.css';


const Home = () => (
    <div>
      <div className="App">
        <HomePage/>
      </div>
    </div>
);

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Route exact={true} path="/" component={Home}/>
            <Route path="/mapview/:tripId" component={MapView}/>
            <Route path="/myaccount/:userId" component={MyAccount}/>
            <Route path="/tripdetails/:tripId" component={TripDetails}/>
            <Route path="/login/" component={LoginForm} />
            <Route path="/signup/" component={SignUpForm} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
