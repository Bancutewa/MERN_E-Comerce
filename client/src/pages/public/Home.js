import React from 'react'
import { Banner, BestSeller, CustomSlider, DealDaily, FeatureProduct, Sidebar } from '../../components'
import { useSelector } from 'react-redux'
import icons from '../../utils/icon'

const { IoIosArrowForward } = icons
const Home = () => {
    const { newProducts } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);
    return (
        <>
            <div className='w-main flex'>
                <div className=' flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebar />
                    {/* <DealDaily /> */}
                </div>
                <div className=' flex flex-col gap-5 pl-5 w-[75%] flex-auto'>
                    <Banner />
                    <BestSeller />
                </div>
            </div>
            <div className='my-8'>
                <FeatureProduct />
            </div>
            <div className='my-8 w-full'>
                <h3 className='uppercase text-[20px] font-semibold py-[10px] border-b-2 border-main'> new arrivals </h3 >
                <div className=' mt-2 mx-[-10]  pt-4'>
                    <CustomSlider products={newProducts} />
                </div>
            </div>
            <div className='my-8 w-full'>
                <h3 className='uppercase text-[20px] font-semibold py-[10px] border-b-2 border-main'> hot collections </h3 >
                <div className='flex flex-wrap gap-4 mt-4'>
                    {categories?.filter(el => el.brand.length > 0)?.map(el => (
                        <div key={el._id}
                            className='w-[396px]'
                        >
                            <div className='border flex p-4 gap-4 min-h-[220px]'>
                                <img
                                    src={el.image}
                                    alt={el.slug}
                                    className=' w-[144px] h-[129px] object-cover'
                                />
                                <div className='flex-1 text-gray-700'>
                                    <h4 className='font-semibold uppercase'>{el.title}</h4>
                                    <ul className='text-sm'>
                                        {el.brand.map(item => (
                                            <span className='flex gap-1 items-center text-gray-500'>
                                                <IoIosArrowForward size={14} />
                                                <li>{item}</li>

                                            </span>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full h-[500px]'></div>
        </>
    )
}

export default Home
