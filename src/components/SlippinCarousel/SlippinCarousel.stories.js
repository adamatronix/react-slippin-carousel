import React, { useRef } from 'react';
import SlippinCarousel from './SlippinCarousel';
import { generatePhotoPlaceholderURL } from 'react-placeholder-image';


export default {
  title: 'SlippinCarousel',
  component: SlippinCarousel
};

const placeholder = {
  width: '100%',
  background: '#ccc',
  marginLeft: '10px'
}

const red = {
  background: 'red'
}

const Section = {

}


const imageArray = new Array(10).fill();

export const Default = () => {
  
  const nextRef = useRef();
  const prevRef = useRef();
  
  return (
    <>
      <div style={{margin: '100px 0'}}>
        <button ref={prevRef}>Prev</button>
        <button ref={nextRef}>Next</button>
      </div>
      <div style={Section}>
        <SlippinCarousel prevEl={prevRef} nextEl={nextRef} itemSize="55%">
          { imageArray.map((item, index) => {
            const image = generatePhotoPlaceholderURL(600, 600);
              return (
                <div style={placeholder}>
                  <img src={image}  style={{pointerEvents: 'none', display: 'block', width: '100%'}} />
                </div>
              )
          })}
        </SlippinCarousel>
      </div>
    </>
  );

}