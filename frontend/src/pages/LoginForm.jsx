import React from'react';
import '../styles/LoginForm.css'

const LoginForm = () => {
    return (
        <><div className='container'>

            <button type='button'
            onClick={() => window.location.href ='/splashscreen'}>X</button>

            <div className='header'>
                <h1 className="poppins-bold">Hello</h1>
                <h2 className="poppins-light">Sign In!</h2>
            </div>
        </div>
        <div className='wrapper'>
                <form action="">
                    <div className='input-box'>
                        <input type='text' placeholder='Email Address' required />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' required />
                    </div>

                    <div className='forgot'>
                        <a href='#'>Forgot password?</a>
                    </div>

                    <button type="submit"onClick={() => window.location.href ='/home'}>SIGN IN</button>

                    <div className='footer'>
                        <h1>Don't have an account?</h1>
                        <a href='/signup'>Sign up</a>
                    </div>
                </form>
            </div></>

    );
};

export default LoginForm;