import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icon'
import { apiGetProducts } from '../apis/product'
import { formatMoney, renderStartFromNumber } from '../utils/helpers'
import { CountDown } from './'

const { AiFillStar, AiOutlineMenu } = icons

const DealDaily = () => {
    const [dealDaily, setDealDaily] = useState(null)
    const [timeRemaining, setTimeRemaining] = useState(0)

    const fetchDealDaily = async () => {
        const response = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10), totalRatings: 5 })
        if (response.success) {
            setDealDaily(response.productsDatas[0])
            const now = new Date()
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
            const timeUntilTomorrow = tomorrow.getTime() - now.getTime()

            setTimeRemaining(timeUntilTomorrow)
        } else {
            console.error(response.error)
        }
    }

    useEffect(() => {
        fetchDealDaily()
    }, [])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining((prev) => {
                const newTime = prev - 1000
                if (newTime <= 0) {
                    clearInterval(intervalId)
                    fetchDealDaily()
                    return 0
                }
                return newTime
            })
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60)
    const seconds = Math.floor((timeRemaining / 1000) % 60)

    return (
        <div className='border w-full flex-auto'>
            <div className='flex justify-between items-center p-4 w-full'>
                <span className='flex-1 flex justify-center'> <AiFillStar size={20} color='#DD1111' /></span>
                <span className='flex-8 font-semibold text-[20px] flex justify-center text-gray-700'>Daily Deals</span>
                <span className='flex-1'></span>
            </div>
            {dealDaily && (
                <div className='w-full flex flex-col items-center gap-3'>
                    <img
                        src={dealDaily?.thumb || "https://lh4.googleusercontent.com/proxy/z44RbfM9MMdI-bVIgyw9sKy1ErMYbKCe3zqwwgNxGl-pv65QEJyRx5dURuTaS_qM1V5PVz-nGHf1cmza8pjXvTD92B5rMG0WBrI"}
                        alt='thumb'
                        className='w-full object-contain'
                    />
                    <span className='flex h-4'>{renderStartFromNumber(dealDaily.totalRatings, 22)}</span>
                    <span className='line-clamp-1'>{dealDaily.title}</span>
                    <span className=''>{`${formatMoney(dealDaily.price)} `}</span>
                </div>
            )}
            <div className='px-4 mt-8'>
                <div className='flex justify-center items-center gap-2 mb-4'>
                    <CountDown unit={'Hours'} number={hours} />
                    <CountDown unit={'Minutes'} number={minutes} />
                    <CountDown unit={'Seconds'} number={seconds} />
                </div>
                <button
                    type='button'
                    className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'
                >
                    <AiOutlineMenu size={20} />
                    <span>Options</span>
                </button>
            </div>
        </div>
    )
}

export default memo(DealDaily)
