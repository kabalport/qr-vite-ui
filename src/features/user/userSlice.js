import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

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
            Cookies.remove('token'); // 쿠키에서 토큰 제거
        },
    },
});

export const { setUser, logout } = userSlice.actions;

export const loginUser = ({ username, password }) => async (dispatch) => {
    try {
        const response = await fetch(`${apiUrl}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            Cookies.set('token', data.token); // 쿠키에 토큰 저장
            dispatch(setUser(username));
        } else {
            console.error('Login failed:', data.message);
        }
    } catch (error) {
        console.error('Login error:', error);
    }
};

export const registerUser = ({ email, pw, nickname }) => async (dispatch) => {
    try {
        const response = await fetch(`${apiUrl}/api/join`, {
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
    }
    const response = await fetch(`${apiUrl}${url}`, options);
    return response;
};

export const fetchUserData = () => async (dispatch) => {
    try {
        const response = await fetchWithAuth('/api/user');
        const data = await response.json();
        if (response.ok) {
            dispatch(setUser(data.username));
        } else {
            console.error('Fetch user data failed:', data.message);
        }
    } catch (error) {
        console.error('Fetch user data error:', error);
    }
};

export default userSlice.reducer;
