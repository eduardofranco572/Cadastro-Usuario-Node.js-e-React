import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/login';
import CadastroForm from './pages/cadastar';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/cadastrar" element={<CadastroForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
       
    );
};

export default App;
