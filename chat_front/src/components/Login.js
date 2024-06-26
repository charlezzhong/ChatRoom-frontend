// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import './Login.css'; // Make sure to create styles for your components

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users', { name: username });
            console.log(response);
            if (response.data.status === 'success') {
                console.log("start to set the login name");
                onLogin(username);
            } else {
                console.log("fail to set the login name");
                setError(response.data.message);
            }
        } catch (error) {
            console.log("what is going on");
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Login;