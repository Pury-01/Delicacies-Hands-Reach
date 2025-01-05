// Login functionality
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // navigation
    const navigate = useNavigate();

    // handle change for email and password
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // claer previous errors
        setErrorMessage('');
        setIsLoading(true);

        try {
            // send post request to login endpoint
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            // check if response was successful and redirect to homepage
            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:, redirecting to:', result.redirect_url);
                console.log('success', result);
                navigate(result.redirect_url);
            } else {
                const results = await response.json();
                setErrorMessage(results.error || 'Invalid email or password');
            }
        } catch (error) {
            console.log('Login error:', error);
            setErrorMessage('Unable to login, please try again');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div style={styles.pageContainer}>
            <div className='Login-container' style={styles.LoginContainer}>
                {/* Home link */}
                <div className='d-flex justify-content-between'>
                    <a href="/" className='home-link' style={styles.homeLink}>
                      <i className='bi bi-house-door-fill'></i> Home
                    </a>
                </div>
                {/* form container */}
                <div className='form-container' style={styles.formContainer}>
                    <h2 className='text-center mb-4'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        {/* email input */}
                        <div className='mb-3'>
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
                        <div className='mb-3'>
                            <label htmlFor='password' className='form-label'>Password</label>
                            <input
                              type='password'
                              className='form-control'
                              id='password'
                              value={password}
                              onChange={handlePasswordChange}
                              required
                              />
                        </div>
                        {/* error Message */}
                        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                        <button type='submit' className='btn btn-primary w-100' disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                    {/* Link to Signup */}
                    <p className='mt-3 text-center'>
                        Don't have an account? <a href='/signup'>Signup here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

//styling
const styles = {
    pageContainer: {
        background: 'linear-gradient(135deg, #ff99cc,  #66ccff)',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    LoginContainer: {
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
    SignupLink: {
        color: '#007bff'
    },
};

export default Login;