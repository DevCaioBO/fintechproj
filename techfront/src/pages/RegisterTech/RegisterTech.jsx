import { useContext, useState } from 'react'

import { Link, useNavigate } from "react-router-dom"


import FormAuth from '../../components/FormAuth/FormAuth.jsx'
import AuthContext from '../../context/context.js'
import api from '../../api/api.js'

export default function RegisterTech() {

    const navigate = useNavigate();

    const {setSelectedOption,selectedOption,emailRequired,setEmailRequired,selectedFile,setSelectedFile,setLogin,login,setPassword,password,setEmail,email,setToggle,toggle,setRoleIsRequired,roleIsRequired} = useContext(AuthContext)
    const registerOneUser = async (event) => {
    
       event.preventDefault(); 
       try {


    //    const formData = new FormData();
       
    //    formData.append('login', login);
    //    formData.append('password', password);
    //    formData.append('email', email);

        setSelectedFile(null)
       
            await api.post('/tech/register',{
          
            'login': login,
            'password': password,
            'email': email,
            'role':"USER"
           });



         

          
          
       } 
       finally{
        setLogin("")
        setPassword("")
        setEmail("")
 
        navigate("/Login")

    
    }
   };




    return (

        <>
        <FormAuth ActionName={"inscrever-se"} FormName={"REGISTRAR-SE"} methodForForm={registerOneUser} emailRequired={!emailRequired} setEmailRequired={setEmailRequired} selectedFile={selectedFile} setSelectedFile={setSelectedFile} setSelectedOption={setSelectedOption} selectedOption={selectedOption} setLogin={setLogin} login={login} setPassword={setPassword} password={password} setEmail={setEmail} email={email} roleIsRequired={roleIsRequired} setRoleIsRequired={setRoleIsRequired} setToggle={setToggle} toggle={toggle} />
        </>

    )
}
