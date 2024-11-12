import React from 'react'
import { formatMoney } from '../utils/helpers'
import label from '../assets/red-label.png'
import labelBlue from '../assets/blue-label.png'

const Product = ({ productData, isNew }) => {
    console.log(isNew);

    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'>
                <div className='w-full relative'>
                    <img
                        src={productData?.thumb || "https://lh4.googleusercontent.com/proxy/z44RbfM9MMdI-bVIgyw9sKy1ErMYbKCe3zqwwgNxGl-pv65QEJyRx5dURuTaS_qM1V5PVz-nGHf1cmza8pjXvTD92B5rMG0WBrI"}
                        alt='image'
                        className='w-[243px] h-[243px] object-cover'
                    />
                    <img src={isNew ? label : labelBlue} alt="tag"
                        className='absolute top-[-15px] left-[-41px] w-[120px] h-[35px] object-cover'
                    />
                    <span
                        className={`font-bold absolute text-sm  text-white ${isNew ? ' top-[-12px] left-[-2px] ' : 'left-[-14px] top-[-12px]'}`}>
                        {`${isNew ? "New" : "Trending"}`}
                    </span>
                </div>
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full '>
                    <span className='line-clamp-1'>{productData.title}</span>
                    <span className=''>{`${formatMoney(productData.price)} `}</span>
                </div>
            </div>
        </div>
    )
}

export default Product
