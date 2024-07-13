import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { decodeJWT } from '../../utils/decodeJWT.js';

const apiUrl = import.meta.env.VITE_API_URL;

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = null;
            Cookies.remove('token');
        },
        initializeUser: (state) => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const decodedToken = decodeJWT(token);
                    state.value = decodedToken.nickname;
                } catch (error) {
                    state.value = null;
                    Cookies.remove('token');
                }
            }
        },
    },
});

export const { setUser, logout, initializeUser } = userSlice.actions;

export const loginUser = ({ username, password }) => async (dispatch) => {
    try {
        const response = await fetch(`${apiUrl}/api/member/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            Cookies.set('token', data.accessToken);
            dispatch(setUser(data.nickname));
            return true;
        } else {
            console.error('Login failed:', data.message);
            return false;
        }
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
};

export const registerUser = ({ email, pw, nickname }) => async (dispatch) => {
    try {
        const response = await fetch(`${apiUrl}/api/member/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, pw, nickname }),
        });

        const data = await response.json();

        if (response.ok) {
            // 회원가입 성공 시 추가적인 동작을 정의할 수 있습니다.
        } else {
            console.error('Registration failed:', data.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
    }
};

const fetchWithAuth = async (url, options = {}) => {
    const token = Cookies.get('token');
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    } else {
        console.error("No token found");
    }

    console.log(`Fetching ${apiUrl}${url} with options:`, options);

    const response = await fetch(`${apiUrl}${url}`, options);
    return response;
};
export const fetchUserData = () => async (dispatch) => {
    try {
        const response = await fetchWithAuth('/api/member/me');
        if (response.status === 401) {
            dispatch(logout());
            window.location.href = '/login'; // 로그아웃 후 로그인 페이지로 리디렉션
            return;
        }
        const data = await response.json();
        if (response.ok) {
            dispatch(setUser(data.nickname));
        } else {
            console.error('Fetch user data failed:', data.message);
        }
    } catch (error) {
        console.error('Fetch user data error:', error);
    }
};


export default userSlice.reducer;
