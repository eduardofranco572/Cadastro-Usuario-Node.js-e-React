import '../css/cadastro.css';
import '../css/fonts.css'
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom'

import LoginForm from './login';

const CadastroForm = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const validaEmail = (e) => {
    setEmail(e.target.value);
    // eslint-disable-next-line
    const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = e.target.value.length >= 8 && regexEmail.test(e.target.value);

    if (!isValid) {
      e.target.style.borderColor = 'red';
    } else {
      e.target.style.borderColor = '#1CC88A';
    }
  };

  const validaSenha = (e) => {
    setSenha(e.target.value);
    const regexSenha = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W+)(?=^.{6,50}$).*/g;
    const isValid = e.target.value.length >= 8 && regexSenha.test(e.target.value);

    if (!isValid) {
      e.target.style.borderColor = 'red';
    } else {
      e.target.style.borderColor = '#1CC88A';
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        document.getElementById('preview').src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const response = await fetch('http://localhost:5000/cadastrar-usuario', {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    });

    console.log(response);

    if (response.ok) {
        alert('Cadastrado com sucesso');

    } else {
        const errorText = await response.text();
        console.error('Erro ao cadastrar usuário: ', errorText);
    }
  };

  return (
    <section className="container">
      <div className='lado1'>
          <h1>Bem Vindo</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatibus totam rem, culpa, quisquam esse voluptates delectus doloremque vero aliquid nulla perferendis repellendus eius, molestias illo natus officia illum excepturi.</p>
          <img className='imgdes' src={require('../img/svg.png')}/>
      </div>
      <form
        encType="multipart/form-data"
        method="post"
        action=""
        onSubmit={handleSubmit}
      >
        <h1>Cadastrar</h1>
        <div className="img4-div">
          <div className="contenerimg" id="img-container4">
            <img id="preview" src={require('../img/icone-utilisateur.png')}/>
          </div>
          <input
            className="file"
            id="img-input"
            type="file"
            name="img"
            size="25"
            onChange={handleImageUpload}
            required
          /> 
        </div>
        <input
          className="inputinfos"
          type="text"
          name="nome"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="inputinfos"
          type="text"
          name="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          onBlur={validaEmail}
        />
        <input
          className="inputinfos"
          type="password"
          name="senha"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          onBlur={validaSenha}
        />
        <div className="cadastro">
          <p>Já possui uma conta?</p>
          <div className="buttoncadastro">
            <Link to={`/login`}><button>Entrar</button></Link>
          </div>
            <Routes>
              <Route path='/login' element={<LoginForm/>}/>
            </Routes>
        </div>
        <div className="button">
          <input type="submit" value="Cadastrar" />
        </div>
      </form>
    </section>
  );
};

export default CadastroForm;

    
