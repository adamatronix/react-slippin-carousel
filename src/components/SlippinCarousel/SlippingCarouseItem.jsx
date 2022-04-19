import React, { forwardRef, useCallback } from 'react';
import * as styles from './styles/slippin-carousel.module.scss';

const SlippingCarouselItem = (props, ref) => {
  const { children, itemSize, style, registerRef, readyCheck, ...rest } = props;

  const itemStyle = {
    width: itemSize ? itemSize : 'auto'
  }

  const elementReference = useCallback((node) => {
    if(node !== null) {
      registerRef.push(node);
      if(readyCheck) {
        readyCheck();
      }
      
    }
  },[])

  return (
    <li style={{...itemStyle, ...style}} className={styles.item} ref={elementReference} {...rest}>
      { children }
    </li>
  );
};

export default forwardRef(SlippingCarouselItem);