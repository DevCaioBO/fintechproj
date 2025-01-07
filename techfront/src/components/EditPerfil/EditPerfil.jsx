import React, { useContext, useRef, useState } from 'react'
import AuthContext from '../../context/context';
import api from '../../api/api';

export default function EditPerfil() {

    const [SucessImage,setSucessImage] = useState(null)

    const {selectedFile,setSelectedFile,updatedImage,login,username,menuIsOpen,setMenuIsOpen,selectedMenu, setUsername,setUpdatedImage,imagePerfil,setImagePerfil} = useContext(AuthContext)
    

    const img_picture = useRef()


    const chooseAnImage = async(e)=>{
        e.preventDefault();
        try{
       const formData = new FormData();
       
       formData.append('image_perfil', selectedFile);
            try{

        const response = await api.put("/tech/updating",formData ,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            
            
        })
        setSucessImage("Porfavor Aguarde...")
    }
    finally{
        setUpdatedImage(!updatedImage)
        setSucessImage("Deu Certo")
    }
    }
    finally{
    
    }
    }



    const getSelectedFile =(event)=>{
        setSelectedFile(event.target.files[0]);
        setSucessImage(null)

        const file = event.target.files[0];
        if(file){

            const reader = new FileReader();
            reader.addEventListener("load",function(e){
                const reader_getter = e.target;
              
                img_picture.current.src = reader_getter.result;


            })
            reader.readAsDataURL(file);
        }
    }


  return (
    <form className='flex flex-col space-y-6 px-5  w-9/12 md:w-6/12 mx-auto font-poppins items-center mt-5 h-auto rounded-md bg-tech-gray-header' onSubmit={chooseAnImage}>
            <div className={`${menuIsOpen?"hidden":"flex flex-col"} w-full items-end mt-5 space-y-1 hover:cursor-pointer`} onClick={()=>setMenuIsOpen(!menuIsOpen)} >
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
                        <p className='text-xl text-white font-bold'>{username}</p>
                    
                        <div className='flex flex-col w-full h-auto items-center rounded-full '>
                            <label className={`bg-ocean-gray/30 border-2 flex justify-center items-center text-center cursor-pointer w-[150px] h-[150px] mt-5 hover:bg-ocean-gray/55 border-dashed   
                                ${selectedFile!=null?"border-white":"border-gray-500"} rounded-full min-h-[75px]   text-white`} id='place-image-picture' htmlFor="select-type-file" >
                                    {selectedFile !=null? <img className=' w-full h-full  bg-cover object-cover   hover:animate-pulse  rounded-full' ref={img_picture}  alt="" />
                                    :<img className=' w-full h-full  bg-cover object-cover   hover:animate-pulse  rounded-full' src={"data:image/png;Base64," +imagePerfil}  alt="" />}</label>
                            <input type={"file"} accept='image/*' className="hidden" name="inputfiles" id='select-type-file' onChange={getSelectedFile}   required />
                        </div>

                        <div className='w-full h-auto flex justify-center my-5'>
                    <button type='submit' className={`w-8/12 py-3 rounded-md text-white my-5 ${selectedFile==null?"opacity-50":"opacity-100"} hover:w-9/12 hover:text-lg md:hover:text-xl hover:py-4 hover:shadow-lg hover:shadow-blue-400 transition-all  text-sm md:text-lg bg-subscribe-blue hover:bg-blue-950/85 `}>{SucessImage=="Porfavor Aguarde..."?"":SucessImage=="Deu Certo"?"Imagem atribuida":selectedFile!=null?"Adicionar imagem Ao Perfil":"Imagem não selecionada"}</button>
                </div>
     
      
    </form>
  )
}
