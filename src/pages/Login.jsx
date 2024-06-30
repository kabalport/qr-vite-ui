import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        await dispatch(loginUser({ username, password }));
        navigate('/dashboard');
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
