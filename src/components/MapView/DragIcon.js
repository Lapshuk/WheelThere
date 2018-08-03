import React, {Component} from 'react';
import Draggable from 'react-draggable';
 
export default class DragIcon extends Component {
  constructor(props){
    super(props);
    this.handleStop = this.handleStop.bind(this);
  }
  handleDrag(e){
    e.preventDefault();
    e.stopPropagation();
  }
  handleStop(e){
    console.log('hello');
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  }
  handleStart(e){
    e.stopPropagation();
  }
  render() {
    return (
      <Draggable
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}
        >
        <div>
          <img style = {{position: 'absolute', 'z-index': '99999', width: '30px', height: '50px'}} src = "https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png"/>
        </div>
      </Draggable>
    );
  }
}
 