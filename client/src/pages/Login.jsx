import React, { useEffect, useState } from 'react';
import './style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// import TextTransition, { presets } from 'react-text-transition';
import Lottie from "lottie-react";
import loginAnime from '../assets/login.json';
import { useApi } from "../Helpers/helpers";




const Login = () => {
    const { apiPost ,apiGet} = useApi();
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');




    // const [index, setIndex] = useState(0);
    // const TEXTS = ["Welcome Back", "Let's Get Started", "Glad to See You!"];

    // useEffect(() => {
    //         const intervalId = setInterval(() => {
    //         setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
    //     }, 2000);
    //     return () => clearInterval(intervalId);
    // }, []);





    useEffect(()=>{

        const tokenCheck=async()=>{
            const token = localStorage.getItem("accessTokenFlowKart") || null;

            if(token!==null)
            {
                // try{
                //     const response = await fetch("http://localhost:8000/api/currentUser",{
                //         method:"GET",
                //         headers:{
                //             "Content-Type":"application/json",
                //             Authorization:`Bearer ${token}`
                //         },
                //         credentials:"include"
                //     })
                    
                //     if(response.status===200)
                //     {
                //         navigate("/")
                //     }
                //     else if(response.status===401)
                //     {
                //         await localStorage.setItem("accessTokenFlowKart",null);
                //     }
                //     else
                //     {
                //         await localStorage.setItem("accessTokenFlowKart",null);
                //         throw new Error("Something went wrong");
                        
                //     }
                // }
                // catch(error){
                //     toast.error(error.message);
                // }

                const response = await apiGet("/currentUser");

                if(response)
                {
                    console.log("Please logout to return login page");
                    navigate("/");
                }

            }
            
        }

        tokenCheck();

    },[]);


    const handleSubmit =async () => {
        
        if(!phone || !code) 
        {
            toast.error('Please fill in all fields.');
            return;
        }

        // try{

        //     const response = await fetch('http://localhost:8000/api/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({phone, code})
        //     })

        //     if(response.ok)
        //     {
        //         const data = await response.json();
        //         localStorage.setItem("accessTokenFlowKart",data.token);
        //         toast.success("Login Successful !!");
        //         navigate('/',{replace:true});
        //     }
        //     else
        //     {
        //         const error = await response.json();
        //         throw new Error(error.message);
        //     }

        // }
        // catch(e)
        // {
        //     toast.error(e.message);
        // }

        const response =await apiPost("/login",{phone, code});

        if(response)
        {
            localStorage.setItem("accessTokenFlowKart",response.token);
            toast.success("Login Successful !!");
            navigate('/',{replace:true});
        }
        
    }

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhone(value);
        }
    }

    const handleCodeChange = (e) => {
        const value = e.target.value;
        if (value.length <= 4) {
            setCode(value);
        }
    }

    return (
        <>
        <div className="overall">
            <div className="anime">
                <Lottie animationData={loginAnime} loop={true} />
            </div>


        <div className="login">

            {/* <div className='TextTransition'>
                <h1>
                    <TextTransition springConfig={presets.wobbly}>
                        {TEXTS[index]}
                    </TextTransition>
                </h1>
            </div> */}
            <div className="login-cont">
                <div className="login-head">
                <h1>
                        Flow <span className="kart">Kart</span>
                        
                </h1>
                <p>Login to your account</p>
                </div>
                
                
                <TextField 
                    id="filled-basic" 
                    label="Phone"
                    className="custom-textfield"  
                    variant="filled" 
                    type='text' // Keep as text for validation
                    value={phone}
                    onChange={handlePhoneChange}
                    autoComplete="off"
                />

                <TextField 
                    id="filled-basic" 
                    label="Code" 
                    variant="filled" 
                    className="custom-textfield"   //  classname added to add new css to the textfield
                    type='text' // Keep as text for validation
                    value={code}
                    onChange={handleCodeChange}
                    autoComplete="off"
                />


                <Button variant="outlined" className='logout-btn' onClick={handleSubmit}>Log In</Button>
            </div>



        </div>

        </div>
            
            <Toaster />
        </>
    )
}

export default Login;




