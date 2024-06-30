import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const logout = () => {
        setUser(null);
        // 여기서 토큰을 삭제하거나 서버에 로그아웃 요청을 보낼 수 있습니다.
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
