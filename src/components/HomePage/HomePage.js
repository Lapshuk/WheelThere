import React, {Component} from 'react';
import '../../App.css';
import NavHeader from '../../navheader';

export default class HomePage extends Component {

  render() {
    return (
        <div className="App">
           <NavHeader/>
          HELLO THERE FROM HOME
        </div>
    );
  }
}