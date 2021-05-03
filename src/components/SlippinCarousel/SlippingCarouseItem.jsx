import React, { forwardRef } from 'react';
import styles from './styles/slippin-carousel.module.scss';

const SlippingCarouselItem = (props, ref) => {
  const { children, itemSize, style, ...rest } = props;

  const itemStyle = {
    width: itemSize ? itemSize : 'auto'
  }

  return (
    <li style={{...itemStyle, ...style}} className={styles.item} ref={ref} {...rest}>
      { children }
    </li>
  );
};

export default forwardRef(SlippingCarouselItem);