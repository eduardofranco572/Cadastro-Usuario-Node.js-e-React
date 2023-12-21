// para futuro desenvolvimento..............

import React from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const nome = searchParams.get('nome');
    const img = searchParams.get('img');

    return (
        <div>
            <h1>Bem-vindo, {nome}!</h1>
            <p>ID: {id}</p>
            <img src={img} alt="Imagem do usuário" />
        </div>
    );
};

export default Home;

