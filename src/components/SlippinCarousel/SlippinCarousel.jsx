import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames/bind';
import SlippingCarouselItem from './SlippingCarouseItem';
import styles from './styles/slippin-carousel.module.scss';

const SlippinCarousel = (props) => {
  const { children } = props;
  const activeIndex = useRef(0);
  const itemEl = useRef();
  const [ itemWidth, SetItemWidth ] = useState(null);
  const [ Active, setActive ] = useState(0);

  useEffect(() => {
    console.log(itemEl);
    SetItemWidth(itemEl.current.offsetWidth);
  }, []);


  const getPositionByIndex = (active, index, width) => {
    const shiftNumber = active * -1;
    return index >= active ? (shiftNumber) * width : (index*-1) * width;
  }

  const getItems = ( active, items, width ) => {
    
    return items.map((child,index) => {

      const position = width ? getPositionByIndex(active, index, width) : 0;

      const style = {
        transform: `translate3d(${position}px, 0px, 0px)`,
        zIndex: index
      }
      return (
        <SlippingCarouselItem style={style} ref={itemEl}>{child}</SlippingCarouselItem>
      )
    })
  }

  let allItems = getItems(Active, children, itemWidth);

  return (
    <>
    <div>
      <button onClick={() => { Active > 0 ? setActive(Active - 1) : setActive(0) }}>Prev</button>
      <button onClick={() => { Active < children.length ? setActive(Active + 1) : setActive(children.length-1) }}>Next</button>
    </div>
    <ul className={styles.container}>
      { allItems ? allItems : '' }
    </ul>
    </>
  )
}

export default SlippinCarousel;