// eslint-disable-next-line no-unused-vars
import React from 'react';
import {Button, Image} from '@tarojs/components';
import './navigaBtn.scss';

const NavigateButton = ({ title, show = true, style, onClick, imgSrc }) => {
  return (
    <Button
      className={`zealot-button__1add ${!show ? 'zealot-button__1add-hidden' : ''}`}
      style={style}
      onClick={onClick}
    >
      <Image src={imgSrc} className='navigateImg' />
      {title}
    </Button>
  );
};

export default NavigateButton;
