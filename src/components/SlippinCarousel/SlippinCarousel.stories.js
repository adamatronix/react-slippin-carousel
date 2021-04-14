import React from 'react';
import SlippinCarousel from './SlippinCarousel';

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

export const Default = () => (
  <SlippinCarousel>
    <div style={placeholder}></div>
    <div style={placeholder}></div>
    <div style={{...placeholder, ...red}}></div>
    <div style={placeholder}></div>
    <div style={placeholder}></div>
    <div style={placeholder}></div>
    <div style={placeholder}></div>
    <div style={placeholder}></div>
    <div style={placeholder}></div>
  </SlippinCarousel>
);