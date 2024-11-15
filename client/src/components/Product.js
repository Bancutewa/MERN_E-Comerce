import React, { useState } from 'react'
import { formatMoney, renderStartFromNumber } from '../utils/helpers'
import trending from '../assets/trending.png';
import newLabel from '../assets/new.png'
import { SelectOption } from './'
import icons from '../utils/icon'


const { AiFillEye, AiOutlineMenu, AiFillHeart } = icons
const Product = ({ productData, isNew, pid }) => {
    const [isShowOption, setIsShowOption] = useState(false)
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] flex flex-col items-center'
                onMouseEnter={e => {
                    e.stopPropagation();
                    setIsShowOption(true)
                }}
                onMouseLeave={e => {
                    e.stopPropagation();
                    setIsShowOption(false)
                }}
            >
                <div className='w-full relative'>
                    {isShowOption &&
                        <div
                            className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
                            <SelectOption icon={< AiFillHeart />} />
                            <SelectOption icon={< AiOutlineMenu />} />
                            <SelectOption icon={< AiFillEye />} />
                        </div>}
                    <img
                        src={productData?.thumb || "https://lh4.googleusercontent.com/proxy/z44RbfM9MMdI-bVIgyw9sKy1ErMYbKCe3zqwwgNxGl-pv65QEJyRx5dURuTaS_qM1V5PVz-nGHf1cmza8pjXvTD92B5rMG0WBrI"}
                        alt='thumb'
                        className='w-[274px] h-[274px] object-cover'
                    />
                    <img src={isNew ? newLabel : trending} alt="tag"
                        className='absolute top-[-15px] right-[-16px] w-[100px] h-[35px] object-contain'
                    />
                </div>
                <div className='flex flex-col gap-1 mt-[15px] items-start w-full '>
                    <span className='flex h-4'>{renderStartFromNumber(productData.totalRatings)}</span>
                    <span className='line-clamp-1'>{productData.title}</span>
                    <span className=''>{`${formatMoney(productData.price)} `}</span>
                </div>
            </div>
        </div>
    )
}

export default Product
