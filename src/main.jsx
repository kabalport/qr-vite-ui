import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './app/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './styles/global.css';
import { initializeUser } from './features/user/userSlice';

const queryClient = new QueryClient();

const AppWrapper = () => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(initializeUser());
    }, [dispatch]);

    return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <AppWrapper />
                </Router>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
