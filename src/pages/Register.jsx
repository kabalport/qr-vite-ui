import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../features/user/userSlice';

const Register = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [nickname, setNickname] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async () => {
        await dispatch(registerUser({ email, pw, nickname }));
        navigate('/login');
    };

    return (
        <div>
            <h2>Register</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
            />
            <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter password"
            />
            <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter nickname"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
