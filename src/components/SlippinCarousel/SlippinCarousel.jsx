import React from 'react';
import cx from 'classnames/bind';
import styles from './styles/slippin-carousel.module.scss';

const SlippinCarousel = (props) => {
  const { children } = props;

  return (
    <ul className={styles.container}>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
      <li className={styles.listitem}><div className={styles.placeholder}></div></li>
    </ul>
  )
}

export default SlippinCarousel;