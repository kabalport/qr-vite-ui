import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { decodeJWT } from '../utils/decodeJWT.js'; // decodeJWT 함수 가져오기
import QRCodeGenerator from '../components/QRCodeGenerator';
import { logout, fetchUserData } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decodedToken = decodeJWT(token); // decodeJWT 함수 사용
                dispatch(fetchUserData());
            } catch (error) {
                console.error("Failed to decode token:", error);
                dispatch(logout());
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');  // 로그아웃 후 메인 페이지로 리디렉션
    };

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>Welcome, {user}</h2>
            <div>
                <h3>Your QR Code:</h3>
                <QRCodeGenerator value={user} />
            </div>
            <button onClick={handleGoHome}>홈으로 가기</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
