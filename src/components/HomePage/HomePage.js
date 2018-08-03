import React, {Component} from 'react';
import '../../App.css';
import ImageBox from "../../utils/ImageBox/ImageBox";

export default class HomePage extends Component {

  render() {

    const trips =  {
      1: {
        'image' : 'sample-img.jpg',
        'name' : 'Machu Pichu',
        'pins' : []
      },
      2: {
        'image' : 'sample-img.jpg',
        'name' : 'The Great Whistler',
        'pins' : []
      },
      3: {
        'image' : 'sample-img.jpg',
        'name' : 'Gimme Italy',
        'pins' : []
      },
      4: {
        'image' : 'sample-img.jpg',
        'name' : 'YellowStone',
        'pins' : []
      },
    };

    return (

        <div className="App">
          <ImageBox trips={trips} />
        </div>
    );
  }
}