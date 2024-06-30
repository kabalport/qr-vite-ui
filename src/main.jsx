import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
import './styles/global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <App />
                </Router>
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
