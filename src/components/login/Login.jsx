import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../userContext/UserContext';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {setLoggedInUsername, setId} = useContext(UserContext);


  const submitHandler = (e) => {
    e.preventDefault();
    const getData = async () => {

      try {

        const fetchingData = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
          username, password
        }, {
          headers: {
            "Access-Control-Allow-Origin": import.meta.env.VITE_ORIGIN_URL,
            "Access-Control-Allow-Method": "POST",
          },
          withCredentials: true,
        })
        setLoggedInUsername(fetchingData.data.username);
        setId(fetchingData.data.id);
        setUsername("");
        setPassword("");
      } catch (error) {
        
        toast(error.response.data);

      }

    }
    getData();
  }

  return (
    <form className='flex flex-col items-center space-y-2' onSubmit={submitHandler}>

      <h1 className='text-xl text-white font-medium'>Login Your Account</h1>

      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        type="text" minLength={5} placeholder='username' className='w-full p-2 rounded-md outline-1 outline-slate-600' />

      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password" minLength={8} placeholder='password' className='w-full p-2 rounded-md outline-1 outline-slate-600' />

      <button type='submit' className='w-full bg-indigo-700 p-1 active:bg-indigo-600 rounded-md text-white'>Login</button>

    </form>
  )
}

export default Login