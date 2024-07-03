import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { decodeJWT } from '../../utils/decodeJWT.js'; // decodeJWT 함수 가져오기

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
        initializeUser: (state) => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    const decodedToken = decodeJWT(token); // decodeJWT 함수 사용
                    state.value = decodedToken.username;
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
            Cookies.set('token', data.accessToken); // 쿠키에 accessToken 저장
            dispatch(setUser(username));
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
    }
    const response = await fetch(`${apiUrl}${url}`, options);
    return response;
};

export const fetchUserData = () => async (dispatch) => {
    try {
        const response = await fetchWithAuth('/api/member/me'); // 사용자 데이터를 가져오는 엔드포인트 수정
        const data = await response.json();
        if (response.ok) {
            dispatch(setUser(data.nickname)); // 사용자 닉네임 설정
        } else {
            console.error('Fetch user data failed:', data.message);
        }
    } catch (error) {
        console.error('Fetch user data error:', error);
    }
};

export default userSlice.reducer;
