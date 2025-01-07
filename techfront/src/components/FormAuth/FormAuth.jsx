import React, { useRef } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; 
import api from '../../api/api.js'
import SelectOptions from '../../components/SelectOptions/SelectOptions.jsx';

export default function FormAuth({ FormName, ActionName, emailRequired, setEmailRequired, login, selectedFile, setSelectedFile, setLogin, setPassword, password, setEmail, email, setSelectedOption, selectedOption, setToggle, toggle, setRoleIsRequired, roleIsRequired, methodForForm }) {
  const img_picture = useRef();
  const navigate = useNavigate();
  const clientId = "440602114393-690ejccco4qn8etugca92mat4ilrlvn0.apps.googleusercontent.com";

  const onSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await api.post('tech/google', {
        token: credential,
      });
      const { jwtToken } = res.data;


      localStorage.setItem('token', jwtToken);

      alert('Login com Google realizado com sucesso!');
      navigate('/FinTech'); 
    } catch (error) {
      console.error('Erro ao autenticar com Google:', error);
      alert('Falha no login com o Google.');
    }
  };

  const onFailure = (error) => {
    console.error('Erro no login com o Google:', error);
    alert('Login com Google falhou. Tente novamente.');
  };

  const options = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "USER", label: "USER" },
  ];

  const Options = (option) => {
    setSelectedOption(option);
    setToggle(false);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <form
        className="w-full min-h-lvh flex bg-mobile-tech bg-cover bg-no-repeat bg-center md:bg-desktop-tech"
        onSubmit={methodForForm}
      >
        <div className="flex flex-col items-center h-fit bg-ocean-green/65 rounded-md w-[250px] my-10 md:w-[300px] lg:w-[350px] mx-auto">
          <div className="text-center font-poppins font-bold my-5 text-white text-xl md:text-2xl lg:text-3xl">
            <h1>{FormName}</h1>
          </div>
          <div className="w-9/12 flex flex-col">
            <label className="text-white" htmlFor="">
              Nome:
            </label>
            <input
              className="bg-ocean-gray/30 border-2 p-1 placeholder:text-white border-white rounded-md pl-2 text-white outline-none"
              type="text"
              placeholder="insira um nome"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          {emailRequired ? (
            <div className="flex flex-col w-9/12">
              <div className="w-full flex flex-col">
                <label className="text-white" htmlFor="">
                  Email:
                </label>
                <input
                  type={"email"}
                  className="bg-ocean-gray/30 border-2 p-1 placeholder:text-white border-white rounded-md pl-2 text-white outline-none"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="w-9/12 flex flex-col">
            <label className="text-white" htmlFor="">
              Senha:
            </label>
            <input
              type={"password"}
              className="bg-ocean-gray/30 border-2 p-1 placeholder:text-white border-white rounded-md pl-2 text-white outline-none"
              placeholder="Digite uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <SelectOptions
            setToggle={setToggle}
            RoleIsRequired={roleIsRequired}
            toggle={toggle}
            options={options}
            Options={Options}
            selectedOption={selectedOption}
          />

          <div className="w-full flex justify-center my-5">
            <button
              type="submit"
              className="w-8/12 py-3 rounded-md text-white hover:w-9/12 hover:text-lg md:hover:text-xl hover:py-4 hover:shadow-lg hover:shadow-blue-400 transition-all text-sm md:text-lg bg-subscribe-blue hover:bg-blue-950/85"
            >
              {ActionName}
            </button>
          </div>

          <div className="w-full flex justify-center my-3">
      
            <GoogleLogin
              onSuccess={onSuccess}
              onError={onFailure}
              useOneTap
            />
          </div>
        </div>
      </form>
    </GoogleOAuthProvider>
  );
}
