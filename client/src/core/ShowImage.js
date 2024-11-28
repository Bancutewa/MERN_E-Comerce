import React from 'react';
import { API } from '../config';

const ShowImage = ({ photo }) => (
  <div className='product-img' style={{ height: '250px' }}>
    <img
      src={photo}
      alt={photo}
      className='mb-3'
      style={{ objectFit: 'contain', height: '100%', width: '100%', display: 'flex', marginLeft: 'auto', marginRight: 'auto' }}
    />
  </div>
);

export default ShowImage;
