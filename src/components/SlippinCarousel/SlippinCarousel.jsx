import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames/bind';
import { TweenMax } from "gsap/all";
import SlippingCarouselItem from './SlippingCarouseItem';
import styles from './styles/slippin-carousel.module.scss';

const SlippinCarousel = (props) => {
  const { children } = props;
  const activeIndex = useRef(0);
  const itemEl = useRef(new Array);
  const Active = useRef(0);
  const AnimationPositions = useRef([]);

  useEffect(() => {
    getAnimationPositions(Active.current);
  }, []);

  const getPositionByIndex = (active, index, width) => {
    const shiftNumber = active * -1;
    return index >= active ? (shiftNumber) * width : (index*-1) * width;
  }


  const getAnimationPositions = (active) => {
    //console.log(items);
    itemEl.current.forEach((child,index) => {  
      const width = child.offsetWidth;
      const position = getPositionByIndex(active, index, width);
      console.log()

      TweenMax.to(child, 
        .2, 
        { x: position, 
          y: 0,
        }
      );

    });
  }

  const getItems = ( positions, items ) => {
    
    return items.map((child,index) => {

      const position = positions ? positions[index] : 0;

      const style = {
        transform: `translate3d(${position}px, 0px, 0px)`,
        zIndex: index
      }
      return (
        <SlippingCarouselItem style={style} ref={(ref) => itemEl.current[index] = ref}>{child}</SlippingCarouselItem>
      )
    })
  }

  const prevClick = () => {
    if(Active.current > 0) {
      Active.current--;
    } else {
      Active.current = 0;
    }
    getAnimationPositions(Active.current);
  }

  const nextClick = () => {
    if(Active.current < children.length) {
      Active.current++;
    } else {
      Active.current = children.length -1;
    }
    getAnimationPositions(Active.current);
  }

  const allItems = getItems(null,children);

  return (
    <>
    <div>
      <button onClick={prevClick}>Prev</button>
      <button onClick={nextClick}>Next</button>
    </div>
    <ul className={styles.container}>
      { allItems ? allItems : '' }
    </ul>
    </>
  )
}

export default SlippinCarousel;