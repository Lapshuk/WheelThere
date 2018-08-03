import React, {Component} from 'react';
import Draggable from 'react-draggable';
 
export default class DragIcon extends Component {
 
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
 
  render() {
    return (
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <img style = {{width: '30px', height: '50px'}} src = "https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png"/>
        </div>
      </Draggable>
    );
  }
}
 