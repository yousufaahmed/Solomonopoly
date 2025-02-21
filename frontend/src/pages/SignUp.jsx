import React from'react'
import '../styles/SignUp.css'

const SignUp = () => {
    return(
        <><div className='signupcontainer'>

            <button type='button'
            onClick={() => window.location.href ='http://192.168.0.76:5173/splashscreen'}>X</button>

            <div className='signupheader'>
                <h1>Create Your</h1>
                <h2>Account</h2>
            </div>
        </div>
        
        <div className='signupwrapper'>
            <form action="">
                <div className='signup-input-box'>
                    <input type='text' placeholder='Full Name' required />
                </div>
                    
                <div className='signup-input-box1'>
                    <input type='text' placeholder='Email Address' required />
                </div>
                
                <div className='signup-input-box2'>
                    <input type='password' placeholder='Password' required />
                </div>
                    
                <div className='signup-input-box3'>
                    <input type='password' placeholder='Confirm Password' required />
                </div>

                <button type="submit" onClick={() => window.location.href ='http://192.168.0.76:5173/home'}>SIGN UP</button>

                <div className='signup-footer'>
                    <h1>Have an account?</h1>
                    <a href='http://192.168.0.76:5173/loginform'>Sign In</a>
                </div>
            </form>
        </div>
        </>
    );
}

export default SignUp;