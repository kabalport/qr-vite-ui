import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import QRCodeGenerator from '../components/QRCodeGenerator';
import QRCodeScanner from '../components/QRCodeScanner';
import { logout, fetchUserData } from '../features/user/userSlice';

const Dashboard = () => {
    const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(fetchUserData());
        }
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logout());
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
