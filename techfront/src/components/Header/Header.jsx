import React, { useEffect, useState, useContext } from "react";
import {jwtDecode} from "jwt-decode";
import hiUser from "../../assets/img/hi-user.svg";
import api from "../../api/api";
import AuthContext from "../../context/context.js";

export default function Header() {
    const [credentials, setCredentials] = useState([]);
    const {setMenuIsOpen, menuIsOpen, username,setSelectedFile, setUsername, setUpdatedImage,imagePerfil, setImagePerfil,} = useContext(AuthContext);

    const getCredentialsUser = async () => {
        try {
            const response = await api.get("/tech/collect");
            setCredentials(response.data);
            const imageTarget = response.data.map((image) => image.image_perfil);
            setImagePerfil(imageTarget);
            setSelectedFile(null)
        } catch (error) {
            console.error("Ocorreu um erro ao buscar um usuário especifico:", error);
        }
    };

    useEffect(() => {
        getCredentialsUser();
        
    }, []);

    useEffect(() => {
        const getNameOfUser = () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            const { sub } = jwtDecode(token);
            return sub;
        };
        setUsername(getNameOfUser());
    }, []);

    return (
        <div className="flex mx-auto w-11/12 h-[100px] mt-5 justify-between font-poppins rounded-md items-center px-5 bg-tech-gray-header">
            <div className="flex flex-col justify-center items-center md:flex md:flex-row md:items-center md:space-x-2">
                <div className="flex">
                    <span className="w-[50px] flex bg-cover h-[50px] md:w-[55px] md:h-[55px] lg:w-[65px] lg:h-[65px] border-full rounded-full bg-gray-500">
                        <img
                            className="bg-cover bg-no-repeat w-full object-cover rounded-full"
                            src={`data:image/png;base64,${imagePerfil}`}
                            alt=""
                        />
                    </span>
                </div>
                <div className="flex">
                    <p className="text-white text-xl">Olá {username}</p>
                </div>
                <div className="hidden md:flex">
                    <img className="w-12 h-12" src={hiUser} alt="" />
                </div>
            </div>
            <div
                className={`${
                    menuIsOpen ? "hidden" : "flex flex-col"
                } space-y-1 hover:cursor-pointer`}
                onClick={() => setMenuIsOpen(!menuIsOpen)}
            >
                <div className="flex">
                    <span className="w-5 h-[2px] bg-white rounded-lg"></span>
                </div>
                <div className="flex">
                    <span className="w-5 h-[2px] bg-white rounded-lg"></span>
                </div>
                <div className="flex">
                    <span className="w-5 h-[2px] bg-white rounded-lg"></span>
                </div>
            </div>
        </div>
    );
}