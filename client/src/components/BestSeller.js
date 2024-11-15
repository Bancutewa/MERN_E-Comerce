import React, { useEffect, useState, useMemo } from 'react';
import { apiGetProducts } from '../apis/product';
import { useDispatch, useSelector } from 'react-redux';
import { getNewProducts } from '../store/products/asynsActions';
import CustomSlider from './CustomSlider';

const tabs = ['best seller', 'new arrivals'];

const BestSeller = () => {
    const [bestSeller, setBestSeller] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const { newProducts } = useSelector((state) => state.product);

    const fetchProducts = async () => {
        setIsLoading(true);
        const response = await apiGetProducts({ sort: '-sold' });
        if (response.success) setBestSeller(response.productsDatas);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProducts();
        dispatch(getNewProducts());
    }, [dispatch]);
    const products = useMemo(() => (activeTab === 0 ? bestSeller : newProducts), [activeTab, bestSeller, newProducts]);

    return (
        <div>
            {/* Tabs */}
            <div className="flex text-[20px] ml-[-32px]">
                {tabs.map((name, index) => (
                    <span
                        key={index}
                        className={`font-semibold uppercase px-8 pr-8 border-r cursor-pointer ${activeTab === index ? 'text-black' : 'text-gray-400'
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {name}
                    </span>
                ))}
            </div>

            {/* Product List */}
            <div className="mt-4 mx-[-10] border-t-2 pt-4 border-main">
                {isLoading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <CustomSlider products={products} activeTab={activeTab} />
                )}
            </div>

            {/* Banner Images */}
            <div className="w-full flex gap-2 mt-8 px-[10px]">
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner1"
                    className="flex-1 object-contain"
                />
                <img
                    src="https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657"
                    alt="banner2"
                    className="flex-1 object-contain"
                />
            </div>
        </div>
    );
};

export default (BestSeller);
