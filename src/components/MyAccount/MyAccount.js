import React, {Component} from 'react';
import '../../App.css';

export default class MyAccount extends Component {

  render() {
    return (

        <div className="App">
          HELLO FROM MY ACCOUNT
          {console.log(this.props.match.params.userId)}
        </div>
    );
  }
}