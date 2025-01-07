
import React, { useLayoutEffect } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import { Navigation } from 'swiper/modules';




export default function Paginacao({totalPosts,postsPerPage,setCurrentPage,currentPage}) {

 

  
 
  


    let pages = [];

    for(let i  = 1; i<=Math.ceil(totalPosts/postsPerPage);i++){
        pages.push(i)
    }


  return (
    <div className='flex h-fit overflow-x-auto  border border-black  border-t-0   space-x-7 justify-center '>
      
            
          

                 {
            pages.map((page,index)=>(
              <button className='w-10 h-10 mt-2  rounded-full bg-purple-950 text-white ' onClick={()=> setCurrentPage(page)} key={index} >{page}</button>
        ))}
            {/* </Swiper> */}
          

      
    </div>
  )
}
