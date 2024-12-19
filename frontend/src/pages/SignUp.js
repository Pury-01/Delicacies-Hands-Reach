// signup functionality
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom'

const  Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // useNavigate for navigation
    const navigate = useNavigate();
    
    // Handle input changes for username, email, and password
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // clear previous error message
        setErrorMessage('');

        // Create the request payload
        const requestData = { username, email, password }

        try {
            // send POST request to the signup endpoint
            const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestData),
             });
            // check if the signup was successful
            if (response.ok) {
              // Redirect to the login page if signup is successful
              navigate('/login');
            } else {
              const result = await response.json();
              setErrorMessage(result.error);
            }
        } catch (error) {
          // handle network
          setErrorMessage('Error, please try again')
       }
   };

return (
    <div style={styles.pageContainer}>
        <div className='Signup-container' style={styles.SignupContainer}>
            {/* Home link */}
            <div className='d-flex justify-content-between'>
                <a href="/" className='home-link' style={styles.homeLink}>
                  <i className='bi bi-house-door-fill'></i> Home
                </a>
            </div>
            {/* Form container */}
            <div className='form-container' style={styles.formContainer}>
                <h2 className='text-center mb-4'>Sign Up</h2>

                    {/* show error message if there is   any */}
                    {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        {/* Username input */}
                        <div className="mb-3">
                            <label htmlFor='username' className='form-label'>Username</label>
                            <input
                              type="text"
                              className='form-control'
                              id="username"
                              name="username"
                              value={username}
                              onChange={handleUsernameChange}
                              required
                              />
                        </div>

                        {/* Email input */}
                        <div className="mb-3">
                            <label htmlFor='email' className='form-label'>Email</label>
                            <input
                              type='email'
                              className='form-control'
                              id='email'
                              name='email'
                              value={email}
                              onChange={handleEmailChange}
                              required
                              />
                        </div>

                        {/* Password input */}
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input
                              type='password'
                              className='form-control'
                              id='password'
                              name='password'
                              value={password}
                              onChange={handlePasswordChange}
                              required
                              />
                        </div>

                        {/*submit button */}
                        <button type="submit" className='btn btn-primary w-100'>Signup</button>
                    </form>

                    {/* login Link */}
                    <div className='login-link mt-3'>
                        <p>Already have an account? <a href='/login' style={styles.loginLink}>Login Here</a></p>
                    </div>
        
            </div>
        </div>
     </div>
    );
}
// styling
const styles = {
    pageContainer: {
        background: 'linear-gradient(135deg, #ff99cc, #66ccff)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SignupContainer: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
    },
    homeLink: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#28a745',
    },
    loginLink: {
        color: '#007bff'
    },
};


export default Signup;