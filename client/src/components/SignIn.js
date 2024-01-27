import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Signin.css';

const SignIn = () => {
    const navigate=useNavigate();
    const [userName, setUserName]= useState("");
    const [password, setPassword]=useState("");
    const [errorMessage, setErrorMessage]=useState("");

    const formHandle=async (e)=>{
        e.preventDefault();
        const data={userName,password};
        try {
            await axios.post("http://localhost:6060/signin", data);
            console.log("Authentication Successful");
            navigate("/homepage");
        } catch (err) {
            console.log(err);
            setErrorMessage("Invalid username or password");
        }
    };

    const loginHandle =() =>{
        navigate("/signup");
    }
  return (
    <div className='Apps p-5 d-flex justify-content-center align-items-center flex-column'>
        <h1 className='pb-3'>SIGNIN</h1>
        <form className='d-flex justify-content-center align-items-center'>
            <div className='d-flex justify-content-center align-items-center flex-column gap-2 w-50'>
                <input
                className='rounded'
                type='text'
                placeholder='User Name'
                value={userName}
                onChange={(e)=>{
                    setUserName(e.target.value);
                }}
                /><br />
                {errorMessage && <p style={{ color: "red"}}>{errorMessage}</p>}<br />
                  <input
                className='rounded'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
                />
                {errorMessage && <p style={{ color: "red"}}>{errorMessage}</p>}
                <div className='d-flex justify-content-center align-items-center gap-3'>
                    <button className='mt-3 rounded' type='submit' onClick={formHandle}>
                        Login
                    </button>
                    <button
                    className='mt-3 rounded'
                    type='submit'
                    onClick={loginHandle}>
                     Signup
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignIn