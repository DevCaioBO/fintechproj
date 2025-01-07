import React, { useEffect, useState } from 'react'
import sale from '../../assets/img/sale-icon.svg'
import seeAll from '../../assets/img/see-all.png'
import api from '../../api/api';
import { NumericFormat } from 'react-number-format';

export default function SectionViewTotalMoney() {
    const [myAmount, setMyAmount] = useState(null);




    useEffect(() => {
        const getTotalAmountOfOneUser = async () => {

            const response = await api.get("/account/total")

            setMyAmount(response.data[0].amount)

            console.log(response.data)

        }
        getTotalAmountOfOneUser()


    }, [])





    return (
        <div className='mt-5 bg-total-amount w-11/12   font-poppins h-[300px] mx-auto rounded'>
            <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col w-full'>
                    <div className='flex w-full justify-between'>
                        <div className='flex space-x-3 items-center pl-5 pt-5'>
                            <p className='text-white  text-2xl'>Saldo Total</p>
                            <img className='w-12 h-12 bg-cover object-cover bg-no-repeat' src={sale} alt="" />
                        </div>
                        <div className='flex'>
                            <span className='w-16 h-16 border-4 border-black bg-span-decor-one rounded-bl-md'></span>
                        </div>

                    </div>
                    <div className='flex '>
                    
                            <NumericFormat
                                //   Para dolar (myAmount/100)/6.19
                                value={myAmount }
                                displayType={'text'}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                fixedDecimalScale={true}
                                decimalScale={2}

                                prefix={"R$"}

                                className=' flex  text-xl md:text-2xl lg:text-4xl w-full text-white font-bold mt-5 ml-5'
                            /> 
                        
                    </div>
                </div>
                <div className='w-full bg-red-500 '>


                </div>

                <div className='flex w-full justify-between'>
                    <div className='flex items-end'>
                        <span className='w-16 h-16 border-4 border-black bg-span-decor-one rounded-tr-md'></span>
                    </div>
                    <div className='flex space-x-3 items-center mb-2 mr-2 pl-5 pt-5'>
                        <p className='text-white font-bold  text-2xl'>Visão Geral</p>
                        <div className='flex'>
                            <span className='flex items-center  justify-center rounded-full w-12 h-12 bg-span-decor-one'>
                                <img className='w-9 h-9' src={seeAll} alt="" />
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
