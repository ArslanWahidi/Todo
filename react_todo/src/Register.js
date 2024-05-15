import React from 'react';
import ReactDom from 'react-dom/client'
import RegisterForm from './component/RegisterForm';
import './completed.css';

const root = ReactDom.createRoot(document.getElementById('root_register'));
root.render(
    <React.StrictMode>
        <RegisterForm />
    </React.StrictMode>
);