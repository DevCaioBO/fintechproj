import React, { useState, useLayoutEffect, useEffect, useContext } from 'react'
import Paginacao from '../Paginacao/Paginacao';
import api from '../../api/api';
import AuthContext from '../../context/context';
// import {gsap} from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);
export default function TableOfAction() {

    // const [indxPagination,setIndxPagination] = useState(0)
    // const [multipliyer,setMultipliyer] = useState(0)

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)

    const { dataForTable, setDataForTable, menuIsOpen, setMenuIsOpen, nameAccount,setIdTransact,IdTransact, setNameAccount, selectedMenu, setSelectedMenu } = useContext(AuthContext)
    const HandleNameAccount = (name_account,id_transact) => {
        setNameAccount(name_account)
        setIdTransact(id_transact)
        setSelectedMenu("Transação Monetária")
    }
    //      useLayoutEffect(()=>{

    //         gsap.to('.triggeredTable', {
    //             opacity: 1,
    //             x: 0,
    //             rotate: 0,  
    //             duration: 1,  
    //             ease: 'power2.out',  
    //             scrollTrigger: {
    //                 trigger: '.triggeredTable',
    //                 start: 'top 50%',
    //                 end: 'bottom 95%',
    //                 scrub: true,
    //                 // markers: true,
    //             }
    //         });
    // },[])



    // const [page,setPage] = useState(1)
    // // const allItems = dataForTable!=null?dataForTable.length:""
    // const itemIndexOf = 3;
    // const [init,setInit] = useState(1)
    // const [end,setEnd] = useState(3)

    // const handleChangeIndx=(page)=>{
    //     setInit((page*itemIndexOf)-itemIndexOf)
    //     setEnd(init+itemIndexOf)
    // }




    useEffect(() => {
        const getDataOfOneAccount = async () => {
            const dataOfOneUser = await api.get("/account/info")
            setDataForTable(dataOfOneUser.data)
            

        }
        
        getDataOfOneAccount();
        
    }, [])



    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = dataForTable.slice(firstPostIndex, lastPostIndex)
    return (
        <div className='w-full mt-5   flex flex-col areaTrigger font-poppins  items-center  justify-center'>
             <div className='flex w-11/12 justify-between px-2 border py-2  bg-gray-900 border-gray-950 border-b-0  items-center '>
                    <h3 className='text-center text-xl text-white   '>Transações</h3>
                    <div className={`${menuIsOpen ? "hidden" : "flex flex-col"}    space-y-1 hover:cursor-pointer`} onClick={() => setMenuIsOpen(!menuIsOpen)} >

                        <span className='w-5 h-[2px] bg-white rounded-lg'></span>


                        <span className='w-5 h-[2px] bg-white rounded-lg'></span>


                        <span className='w-5 h-[2px] bg-white rounded-lg'></span>

                    </div>
                </div>
            <div className='flex w-11/12  flex-col triggeredTable overflow-x-auto   md:overflow-x-hidden     h-auto bg-gray-900'>
               
                <table className='table-auto w-full  text-center border  md:overflow-x-hidden  border-gray-950 rounded-md  text-white'>

                    <thead>
                        <tr className='border-b border-gray-950 '>
                        <th className='py-2 px-4'>ID</th>
                            <th className='py-2 px-4'>NOME</th>
                           
                            <th className='py-2 px-4'>DATA</th>

                            <th className='py-2 px-4'>CRÉDITO</th>
                            <th className='py-2 px-4'>DÉBITO</th>
                            <th className='py-2 px-4'>SALDO TOTAL</th>

                            {/* <th className='py-2 px-4'>init</th>
                            <th className='py-2 px-4'>end</th> */}
                        </tr>
                    </thead>
                    <tbody>

                        {

                            currentPosts.map((itens, indx) => {
                             
                                const formattedDate = Intl.DateTimeFormat('Pt-BR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',

                                }).format(new Date(itens.created_at))
                                const formattedAmount = new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL',
                                }).format(itens.amount);
                                const formattedCredit = new Intl.NumberFormat('pt-BR',{
                                    style:'currency',

                                    currency:'BRL'
                                }).format(itens.credit)
                                const formattedDebit = new Intl.NumberFormat('pt-BR',{
                                    style:'currency',

                                    currency:'BRL'
                                }).format(itens.debit)
                                return (
                                    <tr key={itens.id_transact} className='border-t hover:bg-white/50 cursor-pointer transition-all hover:text-black border-gray-950 ' onClick={() => HandleNameAccount(itens.name_account,itens.id_transact)}>
                                         <td className='py-2 px-4'>{itens.id_transact}</td>
                                        <td className='py-2 px-4'>{itens.name_account}</td>
                                      
                                        <td className='py-2 px-4 text-nowrap'>{formattedDate}</td>

                                        <td className='py-2 px-4'>{formattedCredit}</td>
                                        <td className='py-2 px-4'>{formattedDebit}</td>
                                        <td className='py-2 px-4'>{formattedAmount}</td>

                                        {/* <td className='py-2 px-4'>{init}</td>
                                <td className='py-2 px-4'>{end}</td> */}
                                    </tr>
                                )


                            })

                        }


                    </tbody>

                </table>

                {/* <div className='flex   w-full'>
               

                </div> */}
                {/* <div onClick={()=>handleChangeIndx(page)}>prox</div> */}
            </div>

            <div className="overflow-x-auto w-11/12 bg-gray-900  ">
                <Paginacao
                    totalPosts={dataForTable.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}
