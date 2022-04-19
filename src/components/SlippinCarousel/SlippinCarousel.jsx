import React, { useEffect, useState, useCallback, useRef } from 'react';
import cx from 'classnames/bind';
import { gsap, TweenMax } from "gsap/all";
import { DraggableCore } from 'react-draggable';
import SlippingCarouselItem from './SlippingCarouseItem';
import * as styles from './styles/slippin-carousel.module.scss';

const SlippinCarousel = (props) => {
  const { children, prevEl, nextEl, clickable, clickableNextLabel, clickablePrevLabel, itemSize, itemBackground } = props;
  const activeIndex = useRef(0);
  const [ containerEl, setContainerEl ] = useState();
  const [ itemsReady, setItemsReady ] = useState(false);
  const [ cursorEl, setCursorEl ] = useState();
  const [ cursorDirection, setCursorDirection ] = useState();
  const [ cursorShow, setCursorShow ] = useState(0);
  const [ cursorTheme, setCursorTheme ] = useState(null);
  const thresholdStop = useRef();
  const thresholdActive = useRef(false);
  const itemEl = useRef(new Array);
  const Active = useRef(0);
  const dragStart = useRef();
  const dragInitialPositions = useRef(new Array);
  const pinnedItems = useRef(new Array);
  const AnimationPositions = useRef([]);
  const itemWidth = useRef();

  useEffect(() => {
    
    if(containerEl && itemsReady) {
      pinnedItems.current[0] = true;
      thresholdStop.current = calculateThresholdStopper();
    
      if(prevEl && nextEl)
        initUIButtons();

      getAnimationPositions(Active.current);
    }

  }, [containerEl, itemsReady]);

  const containerReference = useCallback((node)=> {
    if(node !== null) {
      setContainerEl(node);
    }
  },[])

  const cursorReference = useCallback((node)=> {
    if(node !== null) {
      setCursorEl(node);
    }
  },[])

  const getPositionByIndex = (active, index, width) => {
    const shiftNumber = active * -1;
    return index >= active ? (shiftNumber) * width : (index*-1) * width;
  }

  const initUIButtons = () => {
    prevEl.current.addEventListener('click', prevClick);
    nextEl.current.addEventListener('click', nextClick);
  }

  const getAnimationPositions = (active) => {
    itemEl.current.forEach((child,index) => {  
      const width = child.offsetWidth;
      itemWidth.current = width;
      const pinPoint = width * (index*-1);
      const position = getPositionByIndex(active, index, width);

      if(!pinnedItems.current[index] && position <= pinPoint) {
          pinnedItems.current[index] = pinPoint;
          const nextIndex = index + 1;
          if(!pinnedItems.current[nextIndex] && nextIndex < itemEl.current.length) {
            Active.current = index;
          }
      } else if(pinnedItems.current[index] && position > pinPoint){
        pinnedItems.current[index] = false;
      }

      TweenMax.to(child, 
        .2, 
        { x: position, 
          y: 0,
        }
      );

    });
  }

  const setAnimationExplicitly = (pos) => {
    itemEl.current.forEach((child,index) => { 
      if(!pinnedItems.current[index]) {
        TweenMax.to(child, 
          .2, 
          { x: pos, 
            y: 0,
          }
        );
      }
    });
  }

  const calculateThresholdStopper = () => {
    const containerWidth = containerEl.offsetWidth;
    const containerX = containerEl.getBoundingClientRect().x;
    const totalItems = itemEl.current.length;
    const lastItem = itemEl.current[totalItems-1];
    const lastItemWidth = lastItem.offsetWidth;
    let lastX = 0;
    itemEl.current.forEach((item,index)=>{
      if(index !== itemEl.current.length-1){
        lastX += item.getBoundingClientRect().width;
      }
    })

    return (containerWidth - lastX) - lastItemWidth + containerX;
  }

  const setAnimationByDrag = (diff) => {
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

          if(newX <= thresholdStop.current) {
            thresholdActive.current = true;
            if(pinnedItems.current[index-1])
              Active.current = index;

            TweenMax.to(child, 
              0,
              { x: thresholdStop.current, 
                y: 0,
              }
            );

          } else {
            TweenMax.to(child, 
              0, 
              { x: newX, 
                y: 0,
              }
            );
  
            if(newX <= pinPoint + (width/1.1) && pinPoint >= thresholdStop.current) {
              Active.current = index;
            }
          }

          
  
        } else if(!pinnedItems.current[index] && newX <= pinPoint && pinPoint >= thresholdStop.current) {
          TweenMax.to(child, 
            0, 
            { x: pinPoint, 
              y: 0,
            }
          );
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
      thresholdActive.current = false;

      for(let i = 0; i < reversedItems.length; i++) {

        const width = itemWidth.current;
        const normalIndex = (reversedItems.length - 1) - i;
        const child = itemEl.current[normalIndex];
        const originalXPosition = dragInitialPositions.current[normalIndex];
        let newX =  originalXPosition + diff;
        const pinPoint = width * (normalIndex*-1);

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

          if(pinnedItems.current[nextIndex] && newX > pinPoint + (width/4)) {
            if(nextIndex >= 0) {
              Active.current = nextIndex;
            }
          } else if(pinnedItems.current[nextIndex] && pinPoint < thresholdStop.current) { 
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

  const readyCheck = () => {
    if(itemEl.current.length === children.length) {
      setItemsReady(true);
    }
  }

  const getItems = ( positions, items ) => {

    return React.Children.map(items, (child, index) => {
      const position = positions ? positions[index] : 0;

      const style = {
        transform: `translate3d(${position}px, 0px, 0px)`,
        zIndex: index,
        background: itemBackground || 'transparent'
      }

      if(React.isValidElement(child)) {
        return React.cloneElement(child,
        { style: style, 
          itemSize: itemSize, 
          onMouseMove: onItemMove, 
          onMouseEnter: ()=>onItemEnter(index,child.props.theme || 'light'), 
          onMouseLeave: ()=>setCursorShow(false),
          onClick:()=>onItemClick(index),
          registerRef: itemEl.current,
          readyCheck: readyCheck
        });
      }
      return child;
    });
  }

  const onItemClick = (index) => {
    if(clickable) {
      if(Active.current === index || Active.current === itemEl.current.length - 1) { 
        prevClick();
      } else { 
        nextClick();
      }
    }
    
  }

  const onItemMove = (e) => {
    const containerBounding = containerEl.getBoundingClientRect();
    const x = e.clientX - containerBounding.x;
    const y = e.clientY - containerBounding.y;

    gsap.to(cursorEl, {
      x: x,
      y: y,
      duration: 2,
      ease: 'elastic.out(.8, .5)',
    })
  }

  const onItemEnter = (index, theme) => {
    if(clickable) {
      setCursorShow(true);
      setCursorTheme(theme);
      if(Active.current === index || Active.current === itemEl.current.length - 1) { 
        setCursorDirection('prev');
      } else { 
        setCursorDirection('next');
      }
    }
  }

  const onDragStart = (e) => {
    if(!clickable) {
      const x = e.clientX || e.touches[0].clientX;
      setReferencePositions(x);
    } 
  }

  const onDragEnd = (e) => {
    if(!thresholdActive.current && !clickable) {
      getAnimationPositions(Active.current);
    }
  }

  const setReferencePositions = (x) => {
    dragStart.current = x;
    itemEl.current.forEach((child,index) => {  
      dragInitialPositions.current[index] = gsap.getProperty(child, "x");
    });
  }

  const onDrag = (e) => { 
    if(!clickable) {
      const x = e.clientX !== undefined ? e.clientX : e.touches ? e.touches[0].clientX : null;
      if(x) {
        let currentPos = x;
        let diff = currentPos - dragStart.current;
        setReferencePositions(currentPos);
        setAnimationByDrag(diff);
      }
    }
  }

  const prevClick = () => {
    thresholdActive.current = false;
    if(Active.current > 0) {
      Active.current--;
    } else {
      Active.current = 0;
    }
    getAnimationPositions(Active.current);
  }

  const nextClick = () => {
    if(thresholdActive.current)
      return;
    const width = itemWidth.current;
    const newIndex = Active.current + 1;
    const pinPoint = width * (newIndex*-1);

    if(Active.current < children.length) {
      if(pinPoint >= thresholdStop.current) {
        Active.current++;
      } else {
        Active.current++;
        thresholdActive.current = true;
        setAnimationExplicitly(thresholdStop.current);
        return;
      }
        
    } else {
      Active.current = children.length -1;
    }
    getAnimationPositions(Active.current);
  }

  const allItems = getItems(null,children);

  return (
    <>
    <div className={cx(styles.wrapper, {
      [styles['clickable']]: clickable
    })} ref={containerReference}>
      {clickable ? <div ref={cursorReference} className={cx(styles.cursor,
      { 
        [styles['cursorLight']]: cursorTheme === 'light' ? true : null,
        [styles['cursorDark']]: cursorTheme === 'dark' ? true : null,
        [styles['cursorShow']]: cursorShow })}>
      { cursorDirection === 'next' ? clickableNextLabel : clickablePrevLabel}
      </div> : null}
      <DraggableCore 
        onStart={onDragStart}
        onDrag={onDrag}
        onStop={onDragEnd}>
        <ul className={styles.container}>
          { allItems ? allItems : '' }
        </ul>
      </DraggableCore>
    </div>
    </>
  )
}

export default SlippinCarousel;