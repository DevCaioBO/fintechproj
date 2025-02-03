import { useContext, useEffect, useState } from "react";
import api from '../../api/api';

import { NumericFormat } from "react-number-format";
import AuthContext from "../../context/context";



export default function AssignAccount() {

    const [goalName, setGoalName] = useState('');
    const [amount, setAmount] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const { menuIsOpen, setMenuIsOpen, dataForTable, setDataForTable } = useContext(AuthContext)
    const [a, seta] = useState(0)
    const [color, setColor] = useState('')
    const [colorSpecified, setColorSpecified] = useState('')

    const makeMask = (bruteAmmount) => {


        const numbersAccepted = bruteAmmount.replace(/[^\d-]/g, '');


        const negativate = numbersAccepted.replace(/(?!^)-/g, '');


        const maskDzn = negativate.replace(/(\d)(\d{2})$/, '$1,$2');

        const maskCompleted = maskDzn.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return maskCompleted;
    }
    const removeMask = (maskCompleted) => {
        const numClean = maskCompleted.replace('.', '').replace(',', '.').replace('-', '')
        return numClean
    }

    const MaskNumber = (e) => {
        const bruteValue = e.target.value

        const valueFormatter = makeMask(bruteValue)

        setAmount(valueFormatter)
    }

    const setColorSpecifiedClean =()=>{
        setColor('')
        setColorSpecified('bg-orange-600')
    }

    const createAccount = async (e) => {
        e.preventDefault();


        const dateFormat = new Date(createdAt).toISOString().split('T')[0];
        const normalAmount = removeMask(amount)
        const amountStr = toString(amount)

        const isDuplicate = dataForTable.some(item => item.name_account.toUpperCase() === goalName.toUpperCase());
     
        // amount.includes("-")?
        // console.log("O valor bruto do amount é: " + "Tem sim pô é negativo")
        // :console.log("O valor bruto do amount é: " +"Tem nada é positivo")
        try {

            if (!isDuplicate) {
                const response = await api.post('/account/create', {
                    "name_account": goalName,
                    "color_account":color!=''?color:colorSpecified,
                    "credit": amount.includes("-") ? 0.00 : normalAmount,
                    "debit": amount.includes("-") ? normalAmount : 0.00,
                    "amount": amount.includes("-") ? -normalAmount : normalAmount,
                    "created_at": dateFormat
                })
            }
            else {
                console.log("DUPLICADO LL")
            }


        } catch (error) {
            console.error('Erro tentando colocar a goal:', error);
        } finally {
            setAmount("")
            setCreatedAt("")
            setGoalName("")

        }
    };
    return (

        <div className={` flex-col  w-[250px]  md:w-[300px] lg:w-[450px] mx-auto mt-5 rounded shadow-xl font-poppins ${color!=''? "bg-"+color+"-600":colorSpecified} transition-all ${color==""?"bg-gray-600":""} flex min-h-[395px] h-full py-3 `}>
            <div className={`${menuIsOpen ? "hidden" : "flex flex-col"} w-full items-end mt-5 pr-5 space-y-1 hover:cursor-pointer`} onClick={() => setMenuIsOpen(!menuIsOpen)} >
                <div className='flex'>
                    <span className='w-5 h-[2px] bg-white rounded-lg'></span>
                </div>
                <div className='flex'>
                    <span className='w-5 h-[2px] bg-white rounded-lg'></span>
                </div>
                <div className='flex'>
                    <span className='w-5 h-[2px] bg-white rounded-lg'></span>
                </div>


            </div>
            <div className='flex w-full text-center justify-center '>
                <h3 className='text-2xl py-5 text-white font-bold capitalize '>Atribuindo conta</h3>
            </div>
            <div>



                <form className="flex flex-col items-center  w-full" onSubmit={createAccount}>
                    <div className="flex flex-col space-y-5 items-center w-full">
                        <div className="flex flex-col  w-11/12">
                            <label className="text-white" htmlFor="account-name">Nome:</label>
                            <input className="bg-transparent  border-b-2 border-b-white text-xs font-semibold text-white placeholder:text-white outline-none " autoComplete="off" type="text" id="account-name" placeholder="Digite o nome da conta" value={goalName} onChange={(e) => setGoalName(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-11/12">
                            <label className="text-white" htmlFor="amount">Saldo:</label>
                            {/* <NumericFormat
                        id="amount"
                        value={amount}
                        onValueChange={(values) => {const { value } = values;setAmount(value);}}

                       thousandSeparator={"."}
                       decimalSeparator={","}
                        
                       
                        
                        prefix="R$"
                        maxLength={30}
                        autoComplete="off"
                        allowNegative={true}
                        placeholder="Digite um valor"
                        customInput="input"
                        className="bg-transparent  border-b-2 border-b-white text-xs font-semibold text-white placeholder:text-white outline-none "
      /> */}
                            <input type="text" value={amount} maxLength={21} className="bg-transparent   border-b-2 border-b-white text-xs font-semibold text-white placeholder:text-white outline-none " autoComplete="off" id="amount" placeholder="Coloque a data de criação" onChange={MaskNumber} required />
                        </div>
                        <div className="flex flex-col w-11/12">
                            <label className="text-white" htmlFor="account-name">Data:</label>
                            <input className="bg-transparent  border-b-2 border-b-white text-xs font-semibold text-white placeholder:text-white outline-none " autoComplete="off" type="date" id="account-name" placeholder="Coloque a data de criação" value={createdAt} onChange={(e) => setCreatedAt(e.target.value)} required />
                        </div>
                    </div>
                    <label className="flex w-full text-xs text-white" htmlFor="pallet-account">Escolha uma que combine com a conta</label>
                    <div className="flex w-10/12 my-5     ">
                       
                        <div className="flex  pl-4  p-3 justify-between  space-x-3 h-full bg-white items-center rounded-l-2xl w-11/12" id="pallet-account">

                            <div className="flex space-x-3 items-center ">

                                <div className="w-4 h-4 cursor-pointer transition-all hover:animate-pulse  hover:bg-blue-500/50 flex  rounded-full bg-blue-600" onMouseOver={() => setColor('blue')}></div>
                                <div className="w-4 h-4 cursor-pointer transition-all hover:animate-pulse  hover:bg-green-500/50 flex rounded-full bg-green-600" onMouseOver={() => setColor('green')}></div>
                                <div className="w-4 h-4 cursor-pointer transition-all hover:animate-pulse hover:bg-pink-500/50 flex rounded-full bg-pink-600" onMouseOver={() => setColor('pink')}></div>
                                <div className="w-4 h-4 cursor-pointer transition-all hover:animate-pulse hover:bg-purple-500/50 flex rounded-full bg-purple-600" onMouseOver={() => setColor('purple')}></div>
                                <div className="w-4 h-4 cursor-pointer transition-all hover:animate-pulse hover:bg-yellow-600/50 flex rounded-full bg-yellow-600" onMouseOver={() => setColor('yellow')}></div>
                            </div>
                                


                        </div>
                        <div className="flex items-center ">
                                <button type="button" className=" cursor-pointer w-full h-full   rounded-r-2xl p-2   transition-all hover:animate-pulse bg-black text-white  " onMouseOver={setColorSpecifiedClean}>Tech</button>
                            </div>
                    </div>
                    
                    <div className="flex flex-col w-7/12">
                        <button type="submit" className="p-3 text-center rounded shadow-lg shadow-submit-account/50 text-white text-xl  bg-submit-account">Gerar Conta</button>
                    </div>


                </form>




            </div>
        </div>
    )
}
