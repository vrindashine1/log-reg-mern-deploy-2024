
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils';


const Login = () => {
    const [loginInfo,setLoginInfo]=useState({
        
        email:'',
        password:''
    })

    const navigate=useNavigate();

    const handleChange=(e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);

    }
    console.log('logininfo->',loginInfo)

    const handleLogin= async (e)=>{
        e.preventDefault();
        const {email,password} =loginInfo;
        if(!email || !password){
           return handleError('email and password is required') 
        }
        try {
            const url="https://log-reg-mern-deploy-2024-api.vercel.app/auth/login"
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(loginInfo)
            });
            const result=await response.json();
            const {success,message,jwtToken,name,error}=result;

            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken)
                localStorage.setItem('loggedInUser',name)
                setTimeout(()=>{
                    navigate('/home')
                },8000)
            }else if(error){
                const details=error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError(error);
        }
    }
  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
            
            <div>
                <label htmlFor='email'>Email</label>
                <input
                    onChange={handleChange}
                    type='email'
                    name='email'
                    autoFocus
                    placeholder='Enter ur email....' 
                    value={loginInfo.email}
                    />
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input
                    onChange={handleChange}
                    type='password'
                    name='password'
                    autoFocus
                    placeholder='Enter ur password....'
                    value={loginInfo.password} />
            </div>
            <button type='submit'>Login</button>
            <span>Does't have an account?
               <Link to='/signup'>Signup</Link> 
            </span>
        </form>
        <ToastContainer />
    </div>
  )
}



export default Login
