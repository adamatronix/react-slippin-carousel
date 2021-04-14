import React, { forwardRef } from 'react';
import styles from './styles/slippin-carousel.module.scss';

const SlippingCarouselItem = (props, ref) => {
  const { children, ...rest } = props;
  return (
    <li className={styles.item} ref={ref} {...rest}>
      { children }
    </li>
  );
};

export default forwardRef(SlippingCarouselItem);