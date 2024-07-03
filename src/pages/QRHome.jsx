import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { initializeUser } from '../features/user/userSlice';
import './QRHome.css'; // 스타일을 위한 CSS 파일 추가

const QRHome = () => {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    return (
        <div className="home-container">
            <h1>Welcome to QR-Vite-UI</h1>
            <div className="links-container">
                {user ? (
                    <>
                        <Link to="/dashboard" className="home-link">Go to Dashboard</Link>
                        <Link to="/scan" className="home-link">Scan QR Code</Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="home-link">Login</Link>
                        <Link to="/register" className="home-link">Register</Link>
                        <Link to="/scan" className="home-link">Scan QR Code</Link> {/* Scan QR Code 링크 추가 */}
                    </>
                )}
            </div>
        </div>
    );
};

export default QRHome;
