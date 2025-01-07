import React from 'react'

export default function SelectOptions({RoleIsRequired,toggle,setToggle,options,Options,selectedOption}) {
    return (
        <div className='flex  w-full justify-center'>
            {RoleIsRequired ?
                <div className='flex flex-col w-full items-center'>
                    <div className="flex flex-col  h-fit mt-5 text-white  w-9/12 ">
                        <button
                            type='button'

                            onClick={() => setToggle(() => !toggle)}
                            className="flex  px-4 py-2  justify-between gap-2 bg-gray-900/45 border rounded-t-lg  shadow-sm outline-none"
                        >
                            {selectedOption ? selectedOption.label : "cargos"}
                            <span className='w-10'>
                                {toggle ? String.fromCharCode(0x2193) : String.fromCharCode(0x2191)}
                            </span>
                        </button>


                        {toggle && (
                            <ul className="flex flex-col   bg-gray-900/45 text-white border ">
                                {options.map((option) => (
                                    <li
                                        key={option.value}
                                        onClick={() => Options(option)}
                                        className="px-4 py-2 hover:bg-blue-500/50 hover:animate-pulse hover:text-white    shadow-b-lg cursor-pointer"
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div> : ""}
        </div>
    )
}
