import React, { useState, useLayoutEffect, useEffect, useContext } from 'react'
import Paginacao from '../Paginacao/Paginacao';
import api from '../../api/api';
import AuthContext from '../../context/context';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';


// import {gsap} from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);
export default function CarousselAccounts() {

    // const [indxPagination,setIndxPagination] = useState(0)
    // const [multipliyer,setMultipliyer] = useState(0)


    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)
    const [isLoading, setIsLoading] = useState(true)
    const [color, setColor] = useState("")
    const [gradient, setGradient] = useState("")
    const [VisionDisplaySize, setVisionDisplaySize] = useState("sm")
    const [detailsTransact, setDetailsTransact] = useState('')
    const [chooseAction, setChooseAction] = useState(false)
    const [backtoActions, setBacktoActions] = useState(false)
    const [dataForCaroussel,setDataForCaroussel] = useState(null)

    const { dataForTable, setDataForTable, menuIsOpen, setMenuIsOpen, nameAccount, IdAccounts,viewGrafics,setViewGrafics, setIdAccounts, setNameAccount, selectedMenu, setSelectedMenu,viewTransactions,setViewTransactions } = useContext(AuthContext)
    const HandleNameAccount = (name_account, id_account) => {
        setNameAccount(name_account)
        setIdAccounts(id_account)
        setChooseAction(!chooseAction)
        console.log(id_account)

        // setSelectedMenu("Transação Monetária")
    }
    const handleBack = () => {
        setChooseAction(!chooseAction)
    }
    const handleBackActions = () => {
        setBacktoActions(!backtoActions)
    }
    const handleGoMakeTransaction = () => {
        setSelectedMenu("Transação Monetária")
    }
    const handleViewOnTransactions = ()=>{
        setViewTransactions(!viewTransactions)
        setViewGrafics(viewGrafics? !viewGrafics:viewGrafics)
    }
    const handleViewOnGrafics =()=>{
        setViewGrafics(!viewGrafics)
        setViewTransactions(viewTransactions?!viewTransactions:viewTransactions)
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
        const resizeManager = () => {
            const width = window.innerWidth;
            if (width >= 1024) setVisionDisplaySize("lg");
            else if (width >= 668) setVisionDisplaySize("md");
            else setVisionDisplaySize("sm");
        };

        window.addEventListener("resize", resizeManager);
        resizeManager();

        return () => window.removeEventListener("resize", resizeManager);
    }, []);


    useEffect(() => {
        const getDataOfOneAccount = async () => {
            try {

                const dataOfOneUser = await api.get("/transaction/collect/per/account")
                console.log(dataOfOneUser.data)
                setDataForCaroussel(dataOfOneUser.data)


            }
            finally {
                setIsLoading(false)
            }


        }

        getDataOfOneAccount();

    }, [])



    return (
        <div className='w-[250px]  md:w-[500px] lg:w-[850px] mx-auto mt-5    flex flex-col areaTrigger font-poppins h-full    items-center  justify-center'>
            {!isLoading ?
                dataForCaroussel.length > 0 ?
                    <div className=' w-full  rounded-md px-4 bg-total-amount'>

                        <div className='flex justify-end px-2'>
                            <div className={`${menuIsOpen ? "hidden" : "flex flex-col"} mt-2     space-y-1 hover:cursor-pointer`} onClick={() => setMenuIsOpen(!menuIsOpen)} >

                                <span className='w-5 h-[2px] bg-white rounded-lg'></span>


                                <span className='w-5 h-[2px] bg-white rounded-lg'></span>


                                <span className='w-5 h-[2px] bg-white rounded-lg'></span>

                            </div>
                        </div>
                        {chooseAction ?
                            <div className='flex flex-col items-center my-4 space-y-3 w-full h-full'>
                                <div className='w-full flex justify-center'>

                                    <p className='text-white font-bold  px-4 uppercase py-2 bg-purple-dark-800  rounded-br-md rounded-bl-md  rounded-tr-md text-center text-xl'>{dataForCaroussel.map(posts => posts.id_accounts == IdAccounts ? posts.name_account : null)}</p>
                                </div>
                                {!backtoActions ?
                                    <div className='flex flex-col w-full space-y-3'>
                                        <div className='w-full flex justify-center'>
                                            <button className='w-6/12 transition-all px-4 py-2 font-semibold rounded-md hover:bg-purple-clean-500 hover:shadow-lg hover:shadow-purple-clean-500 bg-blue-dark-600 shadow-md shadow-blue-dark-600 text-white' onClick={handleBackActions}>Detalhes</button>
                                        </div>
                                        <div className='w-full justify-center flex'>
                                            <button className='w-6/12 px-4 transition-all py-2 font-semibold rounded-md hover:bg-purple-clean-500 hover:shadow-lg hover:shadow-purple-clean-500 bg-blue-dark-600 shadow-md shadow-blue-dark-600 text-white' onClick={handleGoMakeTransaction}>Fazer transação</button>
                                        </div>
                                    </div>
                                    : <div className='flex flex-col items-center w-full justify-center space-y-1'>
                                        <h3 className='text-white text-center font-semibold bg-purple-800 rounded-3xl px-4 py-2 my-2'>clique nos botões abaixo para escolher o tipo de detalhe</h3>
                                        <div className=' w-full h-auto grid md:grid-cols-2 grid-cols-1 gap-2'>
                                        <div className='flex justify-center  w-full'>
                                        <button className='w-7/12 transition-all px-4 py-2 font-semibold rounded-md hover:bg-purple-clean-500 hover:shadow-lg hover:shadow-purple-clean-500 bg-blue-dark-600 shadow-md shadow-blue-dark-600 text-white' onClick={handleViewOnTransactions}>transações</button>
                                            </div>
                                        <div className='flex justify-center w-full'>
                                        <button className='w-7/12 transition-all px-4 py-2 font-semibold rounded-md hover:bg-purple-clean-500 hover:shadow-lg hover:shadow-purple-clean-500 bg-blue-dark-600 shadow-md shadow-blue-dark-600 text-white' onClick={handleViewOnGrafics}>gráficos</button>
                                        </div>
                                    </div></div>}
                                <div className='w-full justify-center flex'>
                                    <button className='w-6/12 px-4 transition-all  py-2 font-semibold  rounded-bl-md rounded-tr-md  rounded-tl-md hover:bg-purple-clean-500 hover:shadow-lg hover:shadow-purple-clean-500 bg-blue-dark-600 shadow-md shadow-blue-dark-600 text-white' onClick={!backtoActions ? handleBack : handleBackActions}>Voltar</button>
                                </div>
                            </div>
                            : null}
                        {!chooseAction ?
                            <Swiper
                                slidesPerView={VisionDisplaySize == "sm" ? postsPerPage - 2 : VisionDisplaySize == "md" ? postsPerPage - 1 : VisionDisplaySize == "lg" ? postsPerPage : postsPerPage}


                                spaceBetween={30}

                                scrollbar={{
                                    hide: true,
                                }}
                                modules={[Scrollbar]}
                                centeredSlides={false}



                            >
                                {dataForCaroussel.map((posts => {
                                    const formateddCredit = Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(posts.credit)
                                    return (
                                        <SwiperSlide key={posts.id_accounts} className={`${posts.color_account.includes('-600') ? posts.color_account : `bg-${posts.color_account}-600`}  rounded-lg  my-5 min-h-48 h-fit  text-center text-white flex items-center justify-center cursor-pointer`} onClick={() => HandleNameAccount(posts.name_account, posts.id_accounts)}>
                                            <div className='w-full h-auto flex flex-col mt-5 items-center space-y-5'>
                                                <span className='w-[50px] h-[50px] bg-gray-600/50 text-2xl text-white flex justify-center items-center p-10 rounded-full' >{posts.name_account[0]}</span>
                                                <p>{posts.name_account}</p>
                                                <p>{formateddCredit}</p>
                                            </div>

                                        </SwiperSlide>
                                    )
                                }))}



                            </Swiper>
                            : null}
                    </div>
                    

                    : <p className='text-white font-bold '>Você não tem nenhuma transação</p> :
                <div className='flex gap-2'>
                    <p className='text-center  text-xl text-white font-bold'>Carregando... </p>
                    <span className='text-center animate-spin   text-xl text-yellow-600 font-bold'>Q</span>
                </div>}

        </div>
    )
}
