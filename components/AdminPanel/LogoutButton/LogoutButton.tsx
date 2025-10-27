"use client"
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from 'next/navigation'


const LogoutButton =  () => {
    const router = useRouter()
    const handleClick = async( ) => {
     
    }

    return (
        <div className="p-1 rounded-full bg-purple-100 fixed top-4 md:top-6 right-6 md:right-8 cursor-pointer" onClick={handleClick}>
            <IoMdLogOut className="text-purple-800 text-2xl" />
        </div>
    )
}

export default LogoutButton;