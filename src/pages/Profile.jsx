import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector((state) => state.user.value);

    return (
        <div>
            <h2>Profile</h2>
            {user ? (
                <div>
                    <p>Username: {user}</p>
                </div>
            ) : (
                <p>No user logged in</p>
            )}
        </div>
    );
};

export default Profile;
