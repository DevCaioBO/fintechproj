import React from 'react'
import { useNavigate } from 'react-router-dom';
import FormAuth from '../../components/FormAuth/FormAuth.jsx'
import { useContext } from 'react';
import AuthContext from '../../context/context.js';
import api from '../../api/api.js';
export default function LoginTech() {
    const navigate = useNavigate();

    const {setSelectedOption,selectedOption,setLogin,login,setPassword,password,setEmail,email,setToggle,toggle,setRoleIsRequired,roleIsRequired} = useContext(AuthContext)
   
    const loginMyUser =async(e)=>{
        e.preventDefault();
  
       const response = await api.post("/tech/login",{
            "login":login,
            "password":password
            
        })


        const token = response.data.token;
        localStorage.setItem("token",token)
    

    
    


        setLogin("")
        setPassword("")
        setEmail("")

        navigate("/FinTech")
    
    }



    return (

        <>
        <FormAuth ActionName={"Entrar"} FormName={"Faça seu Login"} methodForForm={loginMyUser} setSelectedOption={setSelectedOption} selectedOption={selectedOption} setLogin={setLogin} login={login} setPassword={setPassword} password={password} setEmail={setEmail} email={email} roleIsRequired={roleIsRequired} setRoleIsRequired={setRoleIsRequired} setToggle={setToggle} toggle={toggle} />
        
        </>

    )
}
