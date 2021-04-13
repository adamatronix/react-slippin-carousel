import React from 'react';
import { DraggableCore } from 'react-draggable';


const DraggableCoreTest = (props) => {

  const containerStyles = {
    width: '100%',
    height: '600px',
    position: 'relative',
    background: '#ddd'
  }

  return (
    <DraggableCore 
      onStart={() => console.log('hi')}
      onDrag={(e) => console.log(e)}
      onMouseDown={(e) => console.log(e)}
    >
      <div style={containerStyles}></div>
    </DraggableCore>
  )
}

export default DraggableCoreTest;