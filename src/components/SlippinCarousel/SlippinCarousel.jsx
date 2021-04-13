import React from 'react';
import cx from 'classnames/bind';
import SlippingCarouselItem from './SlippingCarouseItem';
import styles from './styles/slippin-carousel.module.scss';

const SlippinCarousel = (props) => {
  const { children } = props;

  return (
    <ul className={styles.container}>
      { children.map((child) => {

        return (
          <SlippingCarouselItem>{child}</SlippingCarouselItem>
        )
      })}
    </ul>
  )
}

export default SlippinCarousel;