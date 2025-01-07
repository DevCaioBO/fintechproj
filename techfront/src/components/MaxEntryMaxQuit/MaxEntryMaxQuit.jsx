import React, { useEffect, useState } from 'react'

import ArrowCredit from '../../assets/img/ArrowCredit.svg'
import ArrowDebit from '../../assets/img/ArrowDebit.svg'
import api from '../../api/api'

export default function MaxEntryMaxQuit() {

  const [CreditDebit,setCreditDebit] = useState([])

  useEffect(()=>{
    const ObtainMaxCreditAndMaxDebit = async () => {
      const response = await api.get("/transaction/collect")
      
      const formattedCreditAndDebit = response.data.map(listCreditDebit => {
        
        listCreditDebit.credit = Intl.NumberFormat('pt-BR',{
          style:'currency',
          currency:'BRL'
        }).format(listCreditDebit.credit)
        listCreditDebit.debit = Intl.NumberFormat('pt-BR',{
          style:'currency',
          currency:'BRL'
        }).format(listCreditDebit.debit)

          return listCreditDebit

      })
      setCreditDebit(formattedCreditAndDebit)
      console.log(response.data)
  
    }
    ObtainMaxCreditAndMaxDebit()
    
  },[])

  return (
    
    <div className='w-full flex justify-center mt-5  min-h-[150px] h-full    font-poppins'>
        <div className='grid items-center  grid-cols-1 md:grid-cols-2 w-11/12  divide-y-2  md:divide-x-2 md:divide-y-0  divide-slate-900 bg-tech-gray-header rounded-md '>
          <div className='flex w-full justify-center py-4 hover:shadow-lg transition-shadow hover:shadow-green-600/50 md:py-0 items-center h-full'>
            {/* Parte para a img  */}
            <img src={ArrowCredit} alt="" className='w-12 h-16 ' />
            <div className='flex flex-col  justify-center'>
            <p className='text-white  text-base'>Entrada</p>
            <p className='text-white font-bold text-2xl'>{CreditDebit.map(itens=>itens.credit)}</p>
            </div>
          </div>
          <div className='flex w-full justify-center py-4 md:py-0 hover:shadow-lg transition-shadow hover:shadow-red-600/50 items-center h-full'>
          <img src={ArrowDebit} alt="" className='w-12 h-16 ' />
            <div className='flex flex-col  justify-center'>
            <p className='text-white  text-base'>Entrada</p>
            <p className='text-white font-bold text-2xl'>{CreditDebit.map(itens=>itens.debit)}</p>
            </div>
          </div>
        </div>

    </div>
  )
}
