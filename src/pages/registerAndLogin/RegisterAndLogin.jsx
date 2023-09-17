import React, { useState } from 'react'
import Register from '../../components/register/Register';
import Login from '../../components/login/Login';
import { FaRocketchat } from "react-icons/fa"

const RegisterAndLogin = () => {

    const [loginOrRegister, setLoginOrRegister] = useState("register");

    const clickHandler = () => {

        setLoginOrRegister(LorR => {
            if (LorR === 'register') return 'login'
            else if (LorR === 'login') return 'register'
        })

    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center bg-indigo-800'>
            <main className=' flex flex-col items-center space-y-3'>

                <div className='font-medium flex place-items-center space-x-2 justify-center'>

                    <FaRocketchat className='text-indigo-500 text-4xl' />

                    <h1 className='text-2xl text-indigo-500 font-bold'>SmartChat</h1>

                </div>

                {
                    loginOrRegister === 'register' ? <Register /> : <Login />
                }

                <div className='text-white text-sm'>

                    {
                        loginOrRegister === 'register' ? 'Already a member?' : 'Not a member'
                    }

                    {
                        loginOrRegister === 'register' ?
                            <button onClick={clickHandler} className='ml-1 cursor-pointer hover:underline font-medium'>Login Here</button> :
                            <button onClick={clickHandler} className='ml-1 cursor-pointer hover:underline font-medium'>Register Now</button>
                    }

                </div>

            </main>
        </div>
    )
}

export default RegisterAndLogin