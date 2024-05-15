import React from 'react';
import ReactDom from 'react-dom/client'
import LoginForm from './component/LoginForm';
import './completed.css';

const root = ReactDom.createRoot(document.getElementById('root_login'));
root.render(
    <React.StrictMode>
        <LoginForm />
    </React.StrictMode>
);