import React, { useRef } from 'react';
import SlippinCarousel from './SlippinCarousel';
import { generatePhotoPlaceholderURL } from 'react-placeholder-image';


export default {
  title: 'SlippinCarousel',
  component: SlippinCarousel
};

const placeholder = {
  width: '300px',
  height: '300px',
  background: '#ccc',
  marginLeft: '10px'
}

const red = {
  background: 'red'
}


const imageArray = new Array(10).fill();

export const Default = () => {
  
  const nextRef = useRef();
  const prevRef = useRef();
  
  return (
    <>
      <div>
        <button ref={prevRef}>Prev</button>
        <button ref={nextRef}>Next</button>
      </div>
      <SlippinCarousel prevEl={prevRef} nextEl={nextRef}>
      { imageArray.map((item, index) => {
        const image = generatePhotoPlaceholderURL(300, 300);
          return (
            <div style={placeholder}>
              <img src={image}  style={{pointerEvents: 'none'}} />
            </div>
          )
      })}
    </SlippinCarousel>
    </>
  );

}