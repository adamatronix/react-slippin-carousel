import React from 'react';
import styles from './styles/slippin-carousel.module.scss';

const SlippingCarouselItem = (props) => {
  const { children } = props;
  return (
    <li className={styles.item}>
      { children }
    </li>
  );
};

export default SlippingCarouselItem;