import React, { useState } from 'react'

import RegisterTech from '../../pages/RegisterTech/RegisterTech.jsx'
import LoginTech from '../../pages/LoginTech/LoginTech.jsx'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomeTech from '../../pages/HomeTech/HomeTech.jsx'

import AuthContext from '../../context/context.js'

export default function TechApp() {


        const [toggle, setToggle] = useState(false)
        const [setRoleIsRequired, RoleIsRequired] = useState(false)
        const [selectedOption, setSelectedOption] = useState(null);
        const [selectedFile,setSelectedFile] = useState(null)
        const [menuIsOpen,setMenuIsOpen] = useState(false)
        const [updatedImage,setUpdatedImage]= useState(false);
    const [imagePerfil,setImagePerfil] = useState("")
        const [emailRequired,setEmailRequired] = useState(false)
        const [username, setUsername] = useState("")

const [login,setLogin] = useState("");
const [password,setPassword] = useState("");
const [email,setEmail] = useState("");
const [selectedMenu,setSelectedMenu] = useState("")
 const [dataForTable,setDataForTable] = useState([])
 const [nameAccount,setNameAccount] = useState("")
 const [IdTransact,setIdTransact] = useState(0)
 





  return (
    <BrowserRouter>
        <AuthContext.Provider value={{setSelectedOption,selectedOption,username, setUsername,setLogin,login,setPassword,password,setEmail,email,setRoleIsRequired,emailRequired,setEmailRequired,RoleIsRequired,toggle,setToggle,selectedFile,setSelectedFile,setMenuIsOpen,menuIsOpen,updatedImage,setUpdatedImage,imagePerfil,setImagePerfil,selectedMenu,setSelectedMenu,dataForTable,setDataForTable,nameAccount,setNameAccount,setIdTransact,IdTransact}}>
        <Routes>
        <Route path='/' element={<RegisterTech/>}></Route>
        <Route path='/login' element={<LoginTech/>}></Route>
        <Route path='/FinTech' element={<HomeTech/>}></Route>
        </Routes>
        </AuthContext.Provider>
    </BrowserRouter>
  )
}

