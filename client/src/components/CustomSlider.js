import React from 'react'
import { Product } from './';
import Slider from 'react-slick';
const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const CustomSlider = ({ products, activeTab }) => {
    return (
        <Slider {...settings}>
            {products.map(el => (
                <Product key={el._id} productData={el} isNew={activeTab === 0 ? false : true} />
            ))}
        </Slider>
    )
}

export default CustomSlider
