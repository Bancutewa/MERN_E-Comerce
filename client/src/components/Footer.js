import React, { memo } from 'react'
import icons from '../utils/icon'

const { MdEmail } = icons
const Footer = () => {
    return (
        <div className='w-full'>
            <div className='h-[103px] bg-main flex items-center justify-center'>
                <div className='w-main flex items-center justify-between'>
                    <div className='flex flex-col flex-1'>
                        <span className='text-[70] text-gray-100'>Sign up to Newsletter</span>
                        <small className='text-[13] text-gray-300'>Subscribe now and receive weekly newsletter</small>
                    </div>
                    <input
                        className='p-4 pr-0 rounded-l-full  flex-1 bg-[#EF4444] outline-none text-gray-100 
                        placeholder:text-sm placeholder:text-gray-100   placeholder:italic placeholder:opacity-50'
                        type='text'
                        placeholder='Email address'
                    ></input>
                    <div className='h-[55px] w-[56px] bg-[#EF4444] rounded-r-full flex items-center justify-center text-white'>
                        <MdEmail size={18} />
                    </div>
                </div>
            </div>
            <div className='h-[407px] bg-gray-900 flex items-center justify-center text-white text-[13px]'>
                <div className='w-main flex '>
                    <div className='flex-2 flex flex-col gap-2'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>ABOUT US</h3>
                        <span>
                            <span>Address: </span>
                            <span className='opacity-70'>474 Ontario St Toronto, ON M4X 1M7 Canada</span>
                        </span>
                        <span>
                            <span>Phone: </span>
                            <span className='opacity-70'>(+1234)56789xxx</span>
                        </span>
                        <span>
                            <span>Mail: </span>
                            <span className='opacity-70'>tadathemes@gmail.com
                            </span>
                        </span>
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Information</h3>
                        <span> Contact</span>
                        <span>Typography</span>
                        <span>Gallery</span>
                        <span>Store Location</span>
                        <span> Today's Deals</span>
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>Who we are</h3>
                        <span>Help </span>
                        <span>Free Shipping</span>
                        <span>FAQs</span>
                        <span>Return & Exchange</span>
                        <span>Testimonials</span>
                    </div>
                    <div className='flex-1 flex flex-col'>
                        <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]'>#DigitalWorldStore</h3>
                        {/* <span> Contact</span>
                        <span>Typography</span>
                        <span>Gallery</span>
                        <span>Store Location</span>
                        <span> Today's Deals</span> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default memo(Footer) 
