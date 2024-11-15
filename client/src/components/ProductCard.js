import React from 'react'
import { formatMoney, renderStartFromNumber } from '../utils/helpers'

const ProductCard = ({ price, title, totalRatings, image }) => {
    return (
        <div className='w-1/3 flex-auto px-[10px] mb-[20px]'>
            <div className='flex w-full border'>
                <img src={image} alt='thumb' className='w-[120px] object-contain p-4 cursor-pointer' />
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full  text-xs'>
                    <span className='line-clamp-1 capitalize text-sm hover:text-main cursor-pointer'>{title.toLowerCase()}</span>
                    <span className='flex h-4'>{renderStartFromNumber(totalRatings)}</span>
                    <span className=''>{`${formatMoney(price)} `}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
