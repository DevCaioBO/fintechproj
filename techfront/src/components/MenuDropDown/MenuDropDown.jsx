import React, {  useContext, useState,useEffect } from 'react'
import AuthContext from '../../context/context'
import closeIcon from '../../assets/img/close.png'

export default function MenuDropDown() {
    const { setMenuIsOpen, menuIsOpen,selectedMenu,setSelectedMenu } = useContext(AuthContext)
    const [readMenusOpen,setReadMenusOpen] = useState({})

    const[VisionDisplaySize,setVisionDisplaySize] = useState("sm")


    const toggleReader = (indx,labels) =>{
        setReadMenusOpen((before) => ({...before,[indx]: !before[indx]}))
        setSelectedMenu(labels)
        if(VisionDisplaySize=="sm" && (labels=="Adicionar/Editar Imagem" || labels=="Dashboard" || labels=="Atribuir Conta")){
            setMenuIsOpen(!menuIsOpen)
        }
    }

   

    useEffect(() => {
      const resizeManager = () => {
        const width = window.innerWidth;
        if (width >= 1024) setVisionDisplaySize("lg");
        else if (width >= 768) setVisionDisplaySize("md");
        else setVisionDisplaySize("sm");
      };
  
      window.addEventListener("resize", resizeManager);
      resizeManager(); 
  
      return () => window.removeEventListener("resize", resizeManager);
    }, []);


    const menuListener = [
        {label:"Dashboard"},
        {label:"Meus Dados",
            children:
            [{label:"Minhas Metas",submenus:"sub",
                children:[{label:"Minhas Conquistas",submenus:"sub1",
                    children:[{label:"Alcançadas",submenus:"sub2",}
                        ,{label:"Não Alcançadas",submenus:"sub2",}]}]}
            ,{label:"Minhas Transações"}]},  
            {label:"Meu Perfil",
                children:
                [{label:"Adicionar/Editar Imagem",submenus:"sub"},{label:"Atribuir Conta",submenus:"sub"},{label:"Transação Monetária"}]}  ,
                
      
            
]



const ChooseOneMenuWithChild = (menus, currentIndex = '') => (
        <ul className='transition-all'>
          {menus.map((menu, index) => {
            const menuIndex = currentIndex ? `${currentIndex}-${index}` : `${index}`;
            
   
            return (
              <div key={menuIndex}>
                <li  onClick={() =>  toggleReader(menuIndex,menu.label)}   
                className=
                {`  cursor-pointer ${Array.isArray(menu.children) && menu.submenus == "sub"  ? `pl-2 text-md  ${selectedMenu == menu.label? "text-white":"text-white/50"} bg-black/35   hover:text-white transition-all  ` 

                : menu.submenus=="sub"?`pl-2 text-md  ${selectedMenu == menu.label? "text-white":"text-white/50"} bg-black/35   hover:text-white transition-all`

                :  menu.submenus == "sub2"  ? `pl-9 text-md ${selectedMenu == menu.label? "text-white":"text-white/50"}    hover:text-white transition-all ` 



                : menu.submenus == "sub1"  ? `pl-6 text-md ${selectedMenu == menu.label? "text-white":"text-white/50"}  hover:text-white transition-all` 

                :!menu.submenus?`text-md ${selectedMenu == menu.label? "text-white":"text-white/50"} bg-black/45   hover:text-white transition-all`

                : 'pl-0 text-white'}` }>
                  <button  >
                    {menu.label}
                  </button>
                </li>
                {menu.children && readMenusOpen[menuIndex] && ChooseOneMenuWithChild(menu.children, menuIndex)}
              </div>
            );
          })}
        </ul>
      );
    return (
        <div className={`${menuIsOpen  ? "translate-x-0 md:relative md:block  transition-all lg:bg-gray-700/45 bg-gray-700 lg:w-[25%] md:w-[35%] md:h-auto w-full h-[1200px]  absolute z-50" : "-translate-x-96 transition-all w-0 "}`}>
        
                <div className={`${!menuIsOpen ? "hidden" : "flex"} w-full  rounded-b-xl items-center shadow-lg  shadow-gray-600/50 px-5 justify-between h-[35px] space-y-1 `}  >
                    <div >
                        <h1 className='text-white text-2xl shadow-lg  '>KOALU</h1>
                    </div>
                    <div className='w-[25px] h-[25px] shadow-lg hover:cursor-pointer  ' onClick={() => setMenuIsOpen(!menuIsOpen)}>
                        <img src={closeIcon} alt="" />
                    </div>
                    
                </div>
                <div className='flex w-full flex-col mt-2'>

                {ChooseOneMenuWithChild(menuListener)}





                {/* <ul className='flex flex-col w-full  text-white'>
                    {
                    menuListener.map((menus,indx)=>(
                        <div key={indx}>
                        <li className='text-white flex '  ><button onClick={()=>toggleReader(indx)}>{menus.label}</button></li>
                        {menus.children && readMenusOpen[indx] &&(
                            <ul>
                                {
                                    menus.children.map((menusChildren,indxChild)=>(
                                        <li key={indxChild}>{menusChildren.label}</li>
                                    ))
                                }
                            </ul>
                            
                        )}
                        </div>
                    ))}
                    
                </ul> */}
                
                </div>

            
        </div>
    )
}
