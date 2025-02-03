import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/context'
import Paginacao from '../Paginacao/Paginacao'
import api from '../../api/api'



export default function TableOfTransactions() {
    const { dataForTable, setDataForTable, menuIsOpen, setMenuIsOpen, nameAccount, IdAccounts, setIdAccounts, setNameAccount, selectedMenu, setSelectedMenu, viewTransactions, setViewTransactions } = useContext(AuthContext)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)
    const [isLoading, setIsLoading] = useState(true)
    const [color, setColor] = useState("")
    const [gradient, setGradient] = useState("")
    const [VisionDisplaySize, setVisionDisplaySize] = useState("sm")
    const [detailsTransact, setDetailsTransact] = useState('')
    const [chooseAction, setChooseAction] = useState(false)
    const [backtoActions, setBacktoActions] = useState(false)


    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = dataForTable.slice(firstPostIndex, lastPostIndex)

    const handleNotViewTransactions = ()=>{
        setViewTransactions(!viewTransactions)
    }

    useEffect(() => {
        const ObtainTransactionPerAccount = async () => {
            const response = await api.get(`transaction/obtain/per/account/${IdAccounts}`)
            setDataForTable(response.data)
        }
        ObtainTransactionPerAccount()
    }, [])


    return (
        <>
            <div className='flex w-11/12 mt-5  justify-between px-2 border py-2  bg-gray-900 border-gray-950 border-b-0  items-center '>
                <h3 className='text-center text-xl text-white   '>{nameAccount} - transações</h3>
                <div className='flex items-center gap-2'>
                    <div>                                    <button className=' px-4 transition-all  py-2 font-semibold  rounded-bl-md rounded-tr-md  rounded-tl-md hover:bg-purple-clean-500 hover:shadow-md hover:shadow-purple-clean-500 bg-blue-dark-600 shadow-md shadow-blue-dark-600 text-white' onClick={handleNotViewTransactions}>Voltar</button></div>
                    <div className={`${menuIsOpen ? "hidden" : "flex flex-col"}    space-y-1 hover:cursor-pointer`} onClick={() => setMenuIsOpen(!menuIsOpen)} >

                        <span className='w-5 h-[2px] bg-white rounded-lg'></span>


                        <span className='w-5 h-[2px] bg-white rounded-lg'></span>


                        <span className='w-5 h-[2px] bg-white rounded-lg'></span>

                    </div>
                </div>
            </div>

            <div className='flex w-11/12   flex-col triggeredTable overflow-x-auto   md:overflow-x-hidden     h-auto bg-gray-900'>

                <table className='table-auto w-full  text-center border  md:overflow-x-hidden  border-gray-950 rounded-md  text-white'>

                    <thead>
                        <tr className='border-b border-gray-950 '>
                            <th className='py-2 px-4'>ID</th>
                            <th className='py-2 px-4'>NOME</th>

                            <th className='py-2 px-4'>DATA</th>

                            <th className='py-2 px-4'>CRÉDITO</th>
                            <th className='py-2 px-4'>DÉBITO</th>
                            {/* <th className='py-2 px-4'>SALDO TOTAL</th> */}

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
                                const formattedCredit = new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',

                                    currency: 'BRL'
                                }).format(itens.credit)
                                const formattedDebit = new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',

                                    currency: 'BRL'
                                }).format(itens.debit)
                                return (
                                    <tr key={itens.id_transact} className='border-t hover:bg-white/50 cursor-pointer transition-all hover:text-black border-gray-950 ' >
                                        <td className='py-2 px-4'>{IdAccounts}</td>
                                        <td className='py-2 px-4'>{itens.name_account}</td>

                                        <td className='py-2 px-4 text-nowrap'>{formattedDate}</td>

                                        <td className='py-2 px-4'>{formattedCredit}</td>
                                        <td className='py-2 px-4'>{formattedDebit}</td>
                                        {/* <td className='py-2 px-4'>{formattedAmount}</td> */}

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
        </>
    )
}
