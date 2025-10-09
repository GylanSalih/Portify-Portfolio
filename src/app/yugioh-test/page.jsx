'use client';

import React from 'react';
import Kartenversuch from '../components/Kartenversuch/Kartenversuch';

const YugiohTestPage = () => {
  return (
    <div style={{
      margin: 0,
      background: '#000',
      minHeight: '100svh',
      display: 'grid',
      placeItems: 'center',
      lineHeight: 1,
      fontFamily: '"Roboto Condensed", sans-serif'
    }}>
      <Kartenversuch />
    </div>
  );
};

export default YugiohTestPage;
