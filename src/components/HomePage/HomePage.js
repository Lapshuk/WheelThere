import React, {Component} from 'react';
import { Container } from 'reactstrap';
import '../../App.css';
import ImageBox from "../../utils/ImageBox/ImageBox";
import './HomePage.css';


export default class HomePage extends Component {

  render() {

    const trips =  {
      1: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'Machu Pichu',
        'pins' : []
      },
      2: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'The Great Whistler',
        'pins' : []
      },
      3: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'Gimme Italy',
        'pins' : []
      },
      4: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'YellowStone',
        'pins' : []
      },
      5: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'YellowStone',
        'pins' : []
      },
    };

    return (

      <Container fluid='true' id='HomePage'>
        <div> NAV BAR BRIAN GIMME </div>

        <div className='category-title'> most popular </div>
        <div className='category horizontal-scroll'>
          <ImageBox trips={trips}/>
        </div>

        <div className='category-title'> local - San Francisco </div>
        <div className='category horizontal-scroll'>
          <ImageBox trips={trips}/>
        </div>

        <div className='category-title'> Some Other Category </div>
        <div className='category horizontal-scroll'>
          <ImageBox trips={trips} />
        </div>

      </Container>
    );
  }
}