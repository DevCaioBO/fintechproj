import { useContext, useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, ResponsiveContainer, ReferenceArea } from 'recharts';
import api from '../../api/api';
import { Brush } from 'recharts';
import AuthContext from '../../context/context';




export default function LineGrafic() {
  const [DataForGrafic, setDataForGrafic] = useState([])
  const [datas, setDatas] = useState([])
  const { menuIsOpen, setMenuIsOpen,selectedMenu,setSelectedMenu,nameAccount,setNameAccount,IdAccounts,viewGrafics,setViewGrafics,viewTransactions,setViewTransactions } = useContext(AuthContext);
const [amountPositive,setAmountPositive] = useState(null)
  useEffect(() => {
    const ObtainTransactionPerAccount = async () => {
        const response = await api.get(`transaction/obtain/per/account/${IdAccounts}`)
        
        const fomatterData = response.data.map(item => {
          item.created_at = Intl.DateTimeFormat('Pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
  
          }).format(new Date(item.created_at));

        
           

          return item
        })
     

        
      
  
  
        setDataForGrafic(fomatterData)
    }
    ObtainTransactionPerAccount()
}, [])

const handleNotViewGrafics=()=>{
  setViewGrafics(!viewGrafics)
} 

useEffect(()=>(
  console.log(amountPositive)
),[amountPositive])


  // useEffect(() => {
  //   const getDataOfOneAccount = async () => {
  //     const dataOfOneUser = await api.get("/account/info")



  //   }

  //   getDataOfOneAccount();
  
  // }, [])

  
  const InfoAmount = ({payload, label, active})=>{
    if (active && payload && payload.length) {
      return (
        <div className="bg-purple-900 border border-purple-800 rounded-2xl p-4">
          <p className="text-white/75">{`${label} : ${payload[0].value}`}</p>
          <p className="text-white text-center">Secret</p>
          <p ></p>
        </div>
      );
    }
  
    return null;
  }
  // const formattedAmount =(money)=>{
  //   return Intl.NumberFormat("pt-BR",{
  //     style:'currency',
  //     currency:'BRL'
  //   }).format(money)
  // } 
  return (


//LINE CHART
/*  <LineChart
width={500}
height={300}
data={DataForGrafic}
margin={{
  top: 5,
  right: 30,
  left: 20,
  bottom: 5,
}}
>
<XAxis dataKey={"created_at"}/>
<Tooltip 
content={InfoAmount}
  cursor={{ fill: '#4a4e69', opacity: 0.5 }} />
   <Legend />
<Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
</LineChart>*/

    
    <div className='w-full h-full border p-4 border-white/65 text-center  rounded-xl   flex flex-col justify-center'>
      <p className='text-center text-xl text-white font-semibold'>{nameAccount}</p>
      <p className='text-base text-white font-semibold '>Passe o mouse sobre as barras para ver o conteúdo</p>
      <div>                                    <button className=' px-4 transition-all  py-2 font-semibold  rounded-bl-md rounded-tr-md  rounded-tl-md hover:bg-purple-clean-500 hover:shadow-md hover:shadow-purple-clean-500 bg-blue-dark-600 shadow-md shadow-blue-dark-600 text-white' onClick={handleNotViewGrafics}>Voltar</button></div>
      <ResponsiveContainer width="100%"  height={400} >
        <BarChart  data={DataForGrafic}>


          <XAxis domain={['auto','auto']} dataKey={'created_at'} stroke='#778da9' 
          />
          <YAxis
            stroke='#778da9'
            domain={['auto','auto']}
            allowDataOverflow={true}
          
            
            
          />
       
          <Tooltip 
          content={InfoAmount}
            cursor={{ fill: '#4a4e69', opacity: 0.5 }} />
          <CartesianGrid stroke="#ced4da" vertical={false}  horizontal={true} />
          <Bar  label={{ position: 'top', fill: 'white', fontWeight: "bold",fontSize:14 }}   barSize={50} dataKey="amount"  fill='#480ca8' isAnimationActive={true} animationDuration={1500}/>
       
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}


