import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Sidebar = () => {
    const { categories } = useSelector(state => state.category)
    return (
        <div className='flex flex-col border'>
            {categories.map(el => (
                <NavLink
                    key={el.slug}
                    to={el.slug}
                    className={({ isActive }) => isActive
                        ? 'bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                        : 'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                    }
                >
                    {el.title}
                </NavLink>
            ))}
        </div>
    )
}

export default Sidebar
