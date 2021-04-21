import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames/bind';
import { gsap, TweenMax } from "gsap/all";
import { DraggableCore } from 'react-draggable';
import SlippingCarouselItem from './SlippingCarouseItem';
import styles from './styles/slippin-carousel.module.scss';

const SlippinCarousel = (props) => {
  const { children } = props;
  const activeIndex = useRef(0);
  const itemEl = useRef(new Array);
  const Active = useRef(0);
  const dragStart = useRef();
  const dragInitialPositions = useRef(new Array);
  const pinnedItems = useRef(new Array);
  const AnimationPositions = useRef([]);
  const itemWidth = useRef();

  useEffect(() => {
    pinnedItems.current[0] = true;
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
      itemWidth.current = width;
      const position = getPositionByIndex(active, index, width);

      TweenMax.to(child, 
        .2, 
        { x: position, 
          y: 0,
        }
      );

    });
  }

  const setAnimationByDrag = (diff) => {
    //console.log(items);
    
     if(diff < 0) {

      let cachedPos = null;

      itemEl.current.forEach((child,index) => {  
        const width = itemWidth.current;
        const originalXPosition = dragInitialPositions.current[index];
        let newX =  originalXPosition + diff;
        //infer position if index is Active
       
        const pinPoint = width * (index*-1);

        if(!pinnedItems.current[index] && newX >= pinPoint) {
          if(!cachedPos) {
            cachedPos = newX;
          } else {
            newX = cachedPos;
          }
          TweenMax.to(child, 
            0, 
            { x: newX, 
              y: 0,
            }
          );
  
        } else if(!pinnedItems.current[index] && newX <= pinPoint) {
          TweenMax.to(child, 
            0, 
            { x: pinPoint, 
              y: 0,
            }
          );
            console.log('pinned at: ' + pinPoint);
            pinnedItems.current[index] = pinPoint;
            const nextIndex = index + 1;
            if(!pinnedItems.current[nextIndex] && nextIndex < itemEl.current.length) {
              Active.current = index;
            }
        }

      });
        
     } else if( diff > 0){

      const reversedItems = itemEl.current.slice().reverse();

      let cachedPos = null;

      for(let i = 0; i < reversedItems.length; i++) {

        const width = itemWidth.current;
        const normalIndex = (reversedItems.length - 1) - i;
        const child = itemEl.current[normalIndex];
        const originalXPosition = dragInitialPositions.current[normalIndex];
        let newX =  originalXPosition + diff;
        const pinPoint = width * (normalIndex*-1);
        //console.log(pinnedItems.current);
        if(newX <= 0 && !pinnedItems.current[normalIndex]) {

          if(!cachedPos) {
            cachedPos = newX;
          } else {
            newX = cachedPos;
          }
       
          TweenMax.to(child, 
            0, 
            { x: newX, 
              y: 0,
            }
          );
          const nextIndex = normalIndex - 1;

          if(pinnedItems.current[nextIndex]) {
            if(nextIndex >= 0) {
              Active.current = nextIndex;
            }
          }
          if((newX >= pinPoint + width) && pinnedItems.current[nextIndex]) {
            pinnedItems.current[nextIndex] = false;
          }
        } else if(!pinnedItems.current[normalIndex] && newX > 0){
          TweenMax.to(child, 
            0, 
            { x: 0, 
              y: 0,
            }
          );
        } 
      }
     }
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

  const onDragStart = (e) => {
    setReferencePositions(e.clientX);
  }

  const setReferencePositions = (x) => {
    dragStart.current = x;
    itemEl.current.forEach((child,index) => {  
      dragInitialPositions.current[index] = gsap.getProperty(child, "x");
    });
  }

  const onDrag = (e) => { 

    let currentPos = e.clientX;
    let diff = currentPos - dragStart.current;
    setReferencePositions(currentPos);
    setAnimationByDrag(diff);
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
    <DraggableCore 
      onStart={onDragStart}
      onDrag={onDrag}
    >
      <ul className={styles.container}>
        { allItems ? allItems : '' }
      </ul>
    </DraggableCore>
    </>
  )
}

export default SlippinCarousel;