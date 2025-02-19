import React, { useState, useCallback } from 'react'
import { InputField, Button } from '../../components'
import { apiLogin, apiRegister } from '../../apis/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { register } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        mobile: ''
    })
    const [isRegister, setIsRegister] = useState(false)
    const resetPayload = () => {
        setPayload({
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            mobile: ''
        })
    }
    const handleSubmit = useCallback(async () => {
        const { firstName, lastName, mobile, ...data } = payload
        if (isRegister) {
            const response = await apiRegister(payload)
            if (response.success) {
                Swal.fire('Congratulations! Please login', response.message, 'success')
                    .then(() => {
                        setIsRegister(false)
                        resetPayload()
                    })
            } else Swal.fire('Oops! Something went wrong', response.message, 'error')
        } else {
            const response = await apiLogin(data)

            if (response.success) {
                Swal.fire(`Welcome ${response.userData.lastName}!`, response.message, 'success')
                    .then(() => {
                        dispatch(register({
                            isLoggedIn: true,
                            token: response.accessToken,
                            userData: response.userData,
                        }))
                    })
                    .then(() => navigate(`/${path.HOME}`))
            } else Swal.fire('Oops! Something went wrong', response.message, 'error')
        }
    }, [payload, isRegister])
    return (
        <div className='w-screen h-screen relative'>
            <img
                src='https://static.vecteezy.com/system/resources/previews/011/220/317/non_2x/e-commerce-banner-design-on-light-blue-background-the-icons-are-collected-in-a-honeycomb-like-module-illustration-vector.jpg'
                className='w-full h-full object-cover'
                alt='background'
            />
            <div className='absolute top-0 bottom-0 left-[70px]  flex items-center justify-center'>
                <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px] '>
                    <h1 className='text-[28px] font-semibold text-main mb-8'> {isRegister ? 'Register' : 'Login'}</h1>
                    {isRegister && <div className='flex items-center gap-2'>

                        <InputField
                            value={payload.firstName}
                            setValue={setPayload}
                            nameKey='firstName'
                        />
                        <InputField
                            value={payload.lastName}
                            setValue={setPayload}
                            nameKey='lastName'
                        />
                    </div>}
                    {isRegister &&
                        <InputField
                            value={payload.mobile}
                            setValue={setPayload}
                            nameKey='mobile'
                        />

                    }

                    <InputField

                        value={payload.email}
                        setValue={setPayload}
                        nameKey='email'
                    />
                    <InputField
                        value={payload.password}
                        setValue={setPayload}
                        nameKey='password'
                        type='password'
                    />
                    <Button
                        name={isRegister ? 'Register' : 'Login'}
                        handleOnClick={handleSubmit}
                        fw
                    />
                    <div className='flex items-center justify-between my-2 w-full text-sm'>
                        {!isRegister && <span className='text-blue-500 hover:underline cursor-pointer'>Forgot your account?</span>}
                        {!isRegister ?
                            <span className='text-blue-500 hover:underline cursor-pointer'
                                onClick={() => setIsRegister(true)}
                            >Create account</span>
                            :
                            <span className='text-blue-500 hover:underline cursor-pointer w-full  text-center'
                                onClick={() => setIsRegister(false)}
                            >Go login</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
