import React, {Component} from 'react';
import { Container, Row, Collapse } from 'reactstrap';
import '../../App.css';
// import ImageBox from "../../utils/ImageBox/ImageBox";
// import NavHeader from '../../utils/NavHeader/NavHeader';
// import './HomePage.css';
import * as firebase from "firebase";


export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      targetId: null
    };
  }

  render() {
    return (
      <div>

        <p>Login</p>
      </div>
    );
  }
}
