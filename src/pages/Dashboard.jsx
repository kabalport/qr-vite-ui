import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { decodeJWT } from '../utils/decodeJWT.js'; // decodeJWT 함수 가져오기
import QRCodeGenerator from '../components/QRCodeGenerator';
import QRCodeScanner from '../components/QRCodeScanner';
import { logout, fetchUserData } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken = decodeJWT(token); // decodeJWT 함수 사용
            dispatch(fetchUserData());
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');  // 로그아웃 후 메인 페이지로 리디렉션
    };

    return (
        <div>
            <h2>Welcome, {user}</h2>
            <div>
                <h3>Your QR Code:</h3>
                <QRCodeGenerator value={user} />
            </div>
            <div>
                <h3>Scan QR Code:</h3>
                <QRCodeScanner onScan={(result) => console.log(result)} />
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
