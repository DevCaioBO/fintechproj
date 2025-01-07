import { useContext, useEffect, useState } from "react";
import api from '../../api/api';

import { NumericFormat} from "react-number-format";
import AuthContext from "../../context/context";



export default function AssignAccount() {

    const [goalName, setGoalName] = useState('');
    const [amount, setAmount] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const {menuIsOpen,setMenuIsOpen,dataForTable,setDataForTable}  = useContext(AuthContext)
    const [a,seta] = useState(0)

    const makeMask =(bruteAmmount)=>{

    
        const numbersAccepted = bruteAmmount.replace(/[^\d-]/g, '');
        
      
        const negativate = numbersAccepted.replace(/(?!^)-/g, '');
        
     
        const maskDzn = negativate.replace(/(\d)(\d{2})$/, '$1,$2');
        
        const maskCompleted = maskDzn.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return maskCompleted;
    }
    const removeMask =(maskCompleted)=>{
        const numClean = maskCompleted.replace('.', '').replace(',','.').replace('-','')
        return numClean
    }

    const MaskNumber = (e)=>{
        const bruteValue = e.target.value

        const valueFormatter = makeMask(bruteValue)

        setAmount(valueFormatter)
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

           if (!isDuplicate){
            const response = await api.post('/account/create',{
                "name_account":goalName ,
                "credit": amount.includes("-")?0.00:normalAmount,
                "debit": amount.includes("-")?normalAmount:0.00,
                "amount":amount.includes("-")?-normalAmount:normalAmount,
                "created_at":dateFormat
            })
        }
            else{
                console.log("DUPLICADO LL")
            }

    
        } catch (error) {
            console.error('Erro tentando colocar a goal:', error);
        }finally{
            setAmount("")
            setCreatedAt("")
            setGoalName("")
            
        }
    };
    return (
        
        <div className=' flex-col  w-[250px] md:w-[300px] lg:w-[450px] mx-auto mt-5 rounded shadow-xl font-poppins shadow-tech-assign-account/50 flex h-[395px] bg-tech-assign-account'>
                        <div className={`${menuIsOpen?"hidden":"flex flex-col"} w-full items-end mt-5 pr-5 space-y-1 hover:cursor-pointer`} onClick={()=>setMenuIsOpen(!menuIsOpen)} >
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
            <div className='flex w-full text-center justify-center'>
                <h3 className='text-2xl py-5 text-white font-bold capitalize '>Atribuindo conta</h3>
            </div>
            <div>

  

                <form className="flex flex-col items-center space-y-5 w-full" onSubmit={createAccount}>
                    <div className="flex flex-col  w-11/12">
                        <label className="text-white" htmlFor="account-name">Nome:</label>
                        <input className="bg-transparent  border-b-2 border-b-white text-xs font-semibold text-white placeholder:text-white outline-none "  autoComplete="off" type="text" id="account-name" placeholder="Digite o nome da conta" value={goalName} onChange={(e)=>setGoalName(e.target.value)}/>
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
      <input type="text"  value={amount} maxLength={21}  className="bg-transparent   border-b-2 border-b-white text-xs font-semibold text-white placeholder:text-white outline-none "  autoComplete="off"  id="amount" placeholder="Coloque a data de criação"  onChange={MaskNumber}/>
                    </div>
                    <div className="flex flex-col w-11/12">
                        <label className="text-white" htmlFor="account-name">Data:</label>
                        <input className="bg-transparent  border-b-2 border-b-white text-xs font-semibold text-white placeholder:text-white outline-none "  autoComplete="off" type="date" id="account-name" placeholder="Coloque a data de criação"  value={createdAt} onChange={(e)=>setCreatedAt(e.target.value)}/>
                    </div>
                    <div className="flex flex-col w-7/12">
                    <button type="submit" className="p-3 text-center rounded shadow-lg shadow-submit-account/50 text-white text-xl  bg-submit-account">Gerar Conta</button>
                    </div>


                </form>




            </div>
        </div>
    )
}
