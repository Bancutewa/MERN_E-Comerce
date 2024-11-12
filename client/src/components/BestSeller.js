import React, { useEffect, useState } from 'react'
import { apiGetProducts } from '../apis/product'
import Slider from "react-slick";
import Product from './Product';

const tabs = [
    { id: 0, name: 'best seller' },
    { id: 1, name: 'new arrivals' },
]
const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
};
const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const [activeTab, setActiveTab] = useState(0)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const response = await Promise.all([apiGetProducts({ sort: '-sold' }), apiGetProducts({ sort: '-createdAt' })])
        if (response[0]?.success) setBestSeller(response[0].productsDatas)
        if (response[1]?.success) setNewProduct(response[1].productsDatas)
        // Mạc định lấy bestSeller
        setProducts(response[0].productsDatas)
    }

    useEffect(() => {
        fetchProducts()
    }, [])
    useEffect(() => {
        if (activeTab === 0) setProducts(bestSeller)
        if (activeTab === 1) setProducts(newProduct)
    }, [activeTab])
    return (
        <div>
            <div className='flex text-[20px] ml-[-32px]'>
                {tabs.map(el => (
                    <span
                        key={el.id}
                        className={`font-semibold uppercase px-8 pr-8 border-r cursor-pointer ${activeTab === el.id ? 'text-black' : 'text-gray-400'}`}
                        onClick={() => setActiveTab(el.id)}
                    >
                        {el.name}
                    </span>
                ))}
            </div>
            <div className='mt-4  border-t-2 pt-6 border-main'>
                <Slider {...settings}>
                    {products.map(el => (
                        <Product key={el.id} productData={el} isNew={activeTab === 0 ? false : true} />
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default BestSeller
