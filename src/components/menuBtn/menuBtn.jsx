// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button } from '@tarojs/components';
import './menuBtn.scss';

const MenuButton = ({ title, show = true, style, onClick }) => {
  return (
    <Button
      className={`zealot-button__add ${!show ? 'zealot-button__add-hidden' : ''}`}
      style={style}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default MenuButton;
