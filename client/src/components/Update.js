import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const [userName, setUserName]= useState("");
    const [password, setPassword]=useState("");
    const [email, setEmail]= useState("");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [userNameError, setUserNameError]= useState("");
    const [passwordError, setPasswordError]=useState("");
    const [emailError, setEmailError]= useState("");
    const [phoneNumberError, setPhoneNumberError]=useState("");

    const id=location.pathname.split("/")[2];
    console.log(`The Update ID = ${id}`);
    

    const formHandle = async (e) =>{
        e.preventDefault();
        console.log("Sucesse")
        let hasError=false;
        if(userName === ""){
            setUserNameError("Insert user name");
            hasError =true;
            console.log("data",hasError)
        }
        // if(password === ""){
        //     setPasswordError("Insert password");
        //     hasError =true;
        //     console.log("received",hasError)
        // }
        if(email === ""){
            setEmailError("Insert email");
            hasError =true;
            console.log("dat",hasError)
        }
        if(phoneNumber === ""){
            setPhoneNumberError("Insert phone number");
            hasError =true;
            console.log("da received",hasError)
    
        }
        console.log("data received",hasError)
        if(!hasError){
            const data = {userName,email, phoneNumber};
            console.log( data)
        try {
            await axios.put(`http://localhost:6060/update/${id}`,data)
            .then((response)=>{
                console.log(response.data);
                navigate("/homepage");
            });
        } catch (err) {
            console.log(err);
        }
    }
};

useEffect(()=>{
    axios.get(`http://localhost:6060/${id}`)
    .then((response)=>{
        setUserName(response.data.userName);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        console.log(response.data);
    });
}, []);

const cancelHandle =() =>{
    navigate("/homepage");
};

  return (
<div className='App p-5 d-flex justify-content-center align-items-center flex-column'>
    <h1 className='pb-3'>Update Data</h1>
    <form className='d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-center align-items-center flex-column gap-2 w-75'>
            <input
            className={`rounded ${userNameError ? "is-invalid" : ""}`}
            type='text'
            placeholder='User Name'
            value={userName}
            onChange={(e)=>{
            setUserName(e.target.value);
            }}
            />
            {userNameError && (
                <div className='invalid-feedback'>{userNameError}</div>
            )}
            <input
            className={`rounded ${emailError ? "is-invalid" : ""}`}
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e)=>{
            setEmail(e.target.value);
            }}
            />
            {emailError && (
                <div className='invalid-feedback'>{emailError}</div>
            )}
            <input
            className={`rounded ${phoneNumberError ? "is-invalid" : ""}`}
            type='text'
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e)=>{
            setPhoneNumber(e.target.value);
            }}
            />
            {phoneNumberError && (
                <div className='invalid-feedback'>{phoneNumberError}</div>
            )}
            <div className='d-flex justify-content-center align-items-center gap-3'>
                <button className='mt-3 rounded' type='submit' onClick={formHandle}>
                    Update
                </button>
                <button className='mt-3 rounded'
                type='submit'
                onClick={cancelHandle}>
                    Cancel
                </button>
            </div>
        </div>
    </form>
</div>
  )
}

export default Update