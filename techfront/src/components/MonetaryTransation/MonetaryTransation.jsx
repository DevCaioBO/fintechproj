import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/context'
import api from '../../api/api.js'

export default function MonetaryTransation() {

    const makeMask = (bruteAmmount) => {
        const numbersAccepted = bruteAmmount.replace(/\D/g, '')

        const maskDzn = numbersAccepted.replace(/(\d)(\d{2})$/, '$1,$2')

        const maskCompleted = maskDzn.replace(/\B(?=(\d{3})+(?!\d))/g, '.')

        return maskCompleted;
    }
    
    const removeMask = (maskCompleted) => {
        let amountClean = maskCompleted.replace('.', '').replace(',','.')
        console.log(amountClean)
        
        return amountClean
    }

    const MakeTransaction = async (e) => {
        e.preventDefault();

        const ConvertDate = new Date(createdAt).toISOString().split('T')[0]

        const normalAmountCredit = removeMask(amountCredit)
        const normalAmountDebit = removeMask(amountDebit)
        //const nmDivCredit  = normalAmountCredit/100
        //const nmDivDebit  = normalAmountDebit/100


        console.log('credit = '+normalAmountCredit)
        console.log('debit = ' + normalAmountDebit)
try{
        const response = await api.post("/transaction/create", {
            'name_account':nameAccount,
            'id_transact':IdTransact,
            'created_at': ConvertDate,
            'credit':normalAmountCredit,
            'debit':normalAmountDebit,
           'amount':normalAmountCredit-normalAmountDebit
        })
    }
    finally{
        setAmountCredit("")
        setAmountDebit("")
        setTransactionType("")
    }
    }
    const MaskNumber = (e) => {
        const bruteValue = e.target.value

        const valueFormatter = makeMask(bruteValue)

        typeTransaction =='depósito'?

        setAmountCredit(valueFormatter)
        :
        setAmountDebit(valueFormatter)
    }
    const { nameAccount, setNameAccount, menuIsOpen, setMenuIsOpen,IdTransact,setIdTransact } = useContext(AuthContext)
    const [createdAt, setCreatedAt] = useState('');
    const [typeTransaction, setTransactionType] = useState("")
    const [amountCredit, setAmountCredit] = useState('');
    const [amountDebit, setAmountDebit] = useState('');

    useEffect(()=>
        (
            typeTransaction == 'depósito'?(
            setAmountDebit("0.00"),
            setAmountCredit("")
            ):(
                setAmountCredit("0.00"),
                setAmountDebit("")
            )
            
            ),[typeTransaction])





    return (
        <div className=' text-white  font-poppins flex justify-center flex-1  w-full  '>

            <form className='flex flex-col lg:w-6/12 md:w-7/12 w-9/12 items-center mt-5 h-auto pb-5 rounded-lg bg-gray-950 shadow-lg shadow-black/50 ' onSubmit={MakeTransaction}>

                <div className='flex justify-between  h-16  w-full px-2 items-center'>
                    <div>
                        <h2 className='text-white text-xs md:text-xl font-semibold'> {typeTransaction != '' ? typeTransaction === "depósito" ? "DEPÓSITO$" : "SAQUE$" : "TIPO DE TRANSAÇÃO"}</h2>
                    </div>
                    <div className='flex gap-2  '>


                        <div className={`${menuIsOpen ? "hidden" : "flex flex-col justify-center"}     space-y-1 hover:cursor-pointer`} onClick={() => setMenuIsOpen(!menuIsOpen)} >

                            <span className='w-4 h-[2px] bg-white rounded-lg'></span>


                            <span className='w-4 h-[2px] bg-white rounded-lg'></span>


                            <span className='w-4 h-[2px] bg-white rounded-lg'></span>

                        </div>
                        <button type='button' className='w-10 h-10 rounded-full text-white font-extrabold bg-gray-950
                         ' onClick={() => setNameAccount("")}>X</button>
                    </div>
                </div>
                <div className='flex items-center text-white w-8/12 gap-1 mt-5 '>

                    <input className='text-white bg-transparent border-b-2 border-white outline-none' type='radio' value={"depósito"} id='deposit' checked={typeTransaction === 'depósito'} onChange={(e) => setTransactionType(e.target.value)} required />
                    <label className='' htmlFor="deposit" >Depositar</label>
                </div>
                <div className='flex items-center text-white w-8/12 gap-1 mt-5 '>

                    <input className='text-white bg-transparent border-b-2 border-white outline-none' type='radio' value={"saque"} id='remove' checked={typeTransaction === 'saque'} onChange={(e) => setTransactionType(e.target.value)} required />
                    <label className='' htmlFor="remove">Retirar</label>
                </div>
                <div className='flex flex-col text-white w-8/12 mt-5 '>
                    <label className='' htmlFor="">Nome da Conta:</label>
                    <input className='text-white bg-transparent border-b-2 border-white outline-none' type='text' value={nameAccount} onChange={() => setNameAccount(nameAccount)} required />
                </div>
                <div className='flex flex-col text-white w-8/12 mt-5 '>
                    <label className='' htmlFor="">Data:</label>
                    <input className='text-black rounded-md bg-white cursor-text  border-2  border-black outline-none' type='date' value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} required />

                </div>

                {
                    typeTransaction==""?
                    <div className='flex justify-center items-center  gap-1 text-center rounded-md py-3  text-white w-9/12 bg-blue-400/50 mt-5 '>
                        <div className='hidden  lg:flex'>
                            <span className='w-4 h-10 rounded-md transition-all bg-orange-500'>
                              
                            </span>
                        </div>
                        <div className='flex flex-col'>
                        <p className='text-base text-center font-semibold'>Considere primeiro escolher um tipo</p>
                        <p className='text-xs lg:text-start text-center'>Escolher o tipo libera o formulário!</p>
                        </div>
                </div>:
                typeTransaction === 'depósito'?
                    <div className='flex flex-col text-white w-8/12 mt-5 '>
                        <label className='' htmlFor="">Quatia a guardar:</label>
                        <input className='text-white bg-transparent border-b-2 border-white outline-none' maxLength={21} type='text' placeholder={typeTransaction != '' ? `Forneça a Quantidade` : `Selecione o tipo!`} value={amountCredit} onChange={MaskNumber} required />
                    </div>
                    :

                    <div className='flex flex-col text-white w-8/12 mt-5 '>
                        <label className='' htmlFor="">Quatia a pegar:</label>
                        <input className='text-white bg-transparent border-b-2 border-white outline-none' maxLength={21} type='text' placeholder={typeTransaction != '' ? `Forneça a Quantidade` : `Selecione o tipo!`} value={amountDebit} onChange={MaskNumber} required />
                    </div>}
                    {
                    typeTransaction!=""?
                <div className='flex w-full mt-4 justify-center  '>
                    <button className='flex uppercase font-bold justify-center text-xl w-8/12 px-4 py-2 text-black bg-gray-300 rounded-md shadow-lg shadow-gray-600' type='submit'>Fazer {typeTransaction}</button>
                </div>:""
}

            </form>
        </div>
    )
}
