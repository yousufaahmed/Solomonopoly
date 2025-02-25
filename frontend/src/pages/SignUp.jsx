// Written by Mohammed Zarrar Shahid

// Import necessary modules and styles
import React from 'react';
import '../styles/SignUp.css'; // Import custom CSS for SignUp component

// Define the SignUp component
const SignUp = () => {
    return (
        <>
            {/* Main container for the SignUp component */}
            <div className='signupcontainer'>

                {/* Button to navigate back to the splash screen */}
                <button 
                    type='button'
                    onClick={() => window.location.href = '/splashscreen'}
                >
                    X
                </button>

                {/* Header section with title and subtitle */}
                <div className='signupheader'>
                    <h1>Create Your</h1>
                    <h2>Account</h2>
                </div>
            </div>
        
            {/* Form container for user input fields */}
            <div className='signupwrapper'>
                <form action="">
                    
                    {/* Input field for full name */}
                    <div className='signup-input-box'>
                        <input 
                            type='text' 
                            placeholder='Full Name' 
                            required 
                        />
                    </div>
                    
                    {/* Input field for email address */}
                    <div className='signup-input-box1'>
                        <input 
                            type='text' 
                            placeholder='Email Address' 
                            required 
                        />
                    </div>
                
                    {/* Input field for password */}
                    <div className='signup-input-box2'>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            required 
                        />
                    </div>
                    
                    {/* Input field for confirming password */}
                    <div className='signup-input-box3'>
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            required 
                        />
                    </div>

                    {/* Button to submit the form and navigate to the home page */}
                    <button 
                        type="submit" 
                        onClick={() => window.location.href = '/home'}
                    >
                        SIGN UP
                    </button>

                    {/* Footer section with link to sign in page */}
                    <div className='signup-footer'>
                        <h1>Have an account?</h1>
                        <a href='/loginform'>Sign In</a>
                    </div>
                </form>
            </div>
        </>
    );
}

// Export the SignUp component as the default export
export default SignUp;
