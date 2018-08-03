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
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      targetId: null
    };
  }

  // toggle(e) {
  //   let target =  e.target.parentElement.parentElement.attributes["data-id"].value;
  //   this.setState({ collapse: !this.state.collapse, targetId: target });
  // }



    return (
      <div id='HomePage'>

        // <NavHeader/>

        // <Container fluid={true}>
        //   <div className='category-title'> most popular </div>
        //   <div className='category horizontal-scroll' onClick={ (e) => this.toggle(e)} style={{ marginBottom: '1rem' }}>
        //     <ImageBox trips={trips}/>
        //   </div>
        //   <Collapse className='map-collapse' isOpen={this.state.collapse}>
        //     <Row className='map-collapse-content shadow'>
        //       <div>{this.state.targetId ? trips[this.state.targetId].name : ""}</div>
        //     </Row>
        //   </Collapse>
        //
        //   <div className='category-title'> local - San Francisco </div>
        //   <div className='category horizontal-scroll'>
        //     <ImageBox trips={trips}/>
        //   </div>
        //
        //   <div className='category-title'> Some Other Category </div>
        //   <div className='category horizontal-scroll'>
        //     <ImageBox trips={trips} />
        //   </div>
        //
        // </Container>
      </div>
    );
  }
}
