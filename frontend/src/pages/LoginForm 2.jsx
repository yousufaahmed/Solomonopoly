// Written by Aleem Abbas-Hussain

// All relevant imports

import React from'react';
import '../styles/LoginForm.css'

// Define the LoginForm component
const LoginForm = () => {
    return (
        <>
            {/* Main container for the LoginForm component */}
            <div className='container'>

                {/* Button to navigate back to the splash screen */}
                <button 
                    type='button'
                    onClick={() => window.location.href ='/splashscreen'}
                >
                    X
                </button>

                {/* Header section with greeting and prompt to sign in */}
                <div className='header'>
                    <h1 className="poppins-bold">Hello</h1>
                    <h2 className="poppins-light">Sign In!</h2>
                </div>
            </div>

            {/* Form wrapper for user input fields */}
            <div className='wrapper'>
                <form action="">
                    
                    {/* Input field for email address */}
                    <div className='input-box'>
                        <input 
                            type='text' 
                            placeholder='Email Address' 
                            required 
                        />
                    </div>

                    {/* Input field for password */}
                    <div className='input-box'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            required 
                        />
                    </div>

                    {/* Link to reset forgotten password */}

                    <div className='forgot'>
                        <a href='#'>Forgot password?</a>
                    </div>

       {/* Button to submit the form and navigate to the home page */}
                    <button 
                        type="submit"
                        onClick={() => window.location.href ='/home'}
                    >
                        SIGN IN
                    </button>

                    {/* Footer section with link to sign up page */}

                    <div className='footer'>
                        <h1>Don't have an account?</h1>
                        <a href='/signup'>Sign up</a>
                    </div>
                </form>
            </div>
        </>
    );
};

// Export the LoginForm component as the default export
export default LoginForm;
