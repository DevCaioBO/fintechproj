import Header from '../../components/Header/Header.jsx'
import MenuDropDown from '../../components/MenuDropDown/MenuDropDown.jsx'
import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/context.js';

import EditPerfil from  '../../components/EditPerfil/EditPerfil.jsx'
import AssignAccount from '../../components/AssignAccount/AssignAccount.jsx'
import SectionViewTotalMoney from '../../components/SectionViewTotalMoney/SectionViewTotalMoney.jsx'
import TableOfTransactions from '../../components/TableOfTransactions/TableOfTransactions.jsx'
import CarousselAccounts from '../../components/CarousselAccounts/CarousselAccounts.jsx'
import MonetaryTransation from '../../components/MonetaryTransation/MonetaryTransation.jsx'
import LineGrafic from '../../components/LineGrafic/LineGrafic.jsx';
import GridGraficsLayout from '../../components/GridGraficsLayout/GridGraficsLayout.jsx';
import MaxEntryMaxQuit from '../../components/MaxEntryMaxQuit/MaxEntryMaxQuit.jsx';
import Footer from  '../../components/Footer/Footer.jsx'
import api from '../../api/api.js';

export default function HomeTech() {


  const { menuIsOpen, setMenuIsOpen,selectedMenu,setSelectedMenu,nameAccount,setNameAccount,viewGrafics,setViewGrafics,viewTransactions,setViewTransactions } = useContext(AuthContext);

  const navigate = useNavigate()


  const [userCredentials, setUserCredentials] = useState(null)

 

  const TokenNotExists = (token) => {
    if (!token) return true;
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
  };

  const token = localStorage.getItem("token");
  if (TokenNotExists(token)) {

    localStorage.removeItem("token");
    navigate("/login");
  }

  const calculateTokenExpirationTime = (token) => {
    const { exp } = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return (exp - currentTime) * 1000;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || TokenNotExists(token)) {

      localStorage.removeItem("token");
      navigate("/login");
      return;
    }

    const timeUntilExpiration = calculateTokenExpirationTime(token);

    const timeoutId = setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/login");
    }, timeUntilExpiration);

    return () => clearTimeout(timeoutId);
  }, []);

 




  return (
    <div>
      <div className={`flex transition-all  min-h-lvh h-auto bg-tech-purple`}>
          {userCredentials!=null? userCredentials.name:""}
          <MenuDropDown />
        

       
          <div className='flex flex-col w-full h-full '>
            {
              selectedMenu == "Adicionar/Editar Imagem"?
              <EditPerfil/>
            
            :
            selectedMenu == "Atribuir Conta"?
            <AssignAccount/>
            :
            selectedMenu == "Transação Monetária"?
            <div>
              {
                nameAccount != ""?
            <MonetaryTransation/>
            :
            <CarousselAccounts/>
              }
            </div>
            :
            <div className='flex flex-col w-full items-center  h-full'>
            <Header />
            <SectionViewTotalMoney/>
            <MaxEntryMaxQuit/>
            {viewTransactions?
            <TableOfTransactions />
            :viewGrafics?
             <GridGraficsLayout/>
             :
            <CarousselAccounts/>}
            {/* POR ENQUANTO LEMBRAR QUE TIROU A GRID DE GRAFICOS */}
          
           <Footer/>

           

     
            </div>
}
          </div>










        
      </div>
      



    </div>
  )
}
