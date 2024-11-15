import React, { memo } from 'react'

const CountDown = ({ unit, number }) => {
    return (
        <div className='w-[30%] h-[60px]  items-center justify-center bg-[#f4f4f4] rounded-md flex flex-col'>
            <span className='text-[18x] text-gray-800'>{number}</span>
            <span className='text-xs text-gray-700'>{unit}</span>
        </div>
    )
}

export default memo(CountDown)
