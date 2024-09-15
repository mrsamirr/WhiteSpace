import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import medium from "./../assets/medium-icon-svgrepo-com.svg"
import { useLogout } from "../hooks"

export const Appbar = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    return <div className="border-b flex justify-between px-10 py-3">
        <img src={medium} />
        <div className="flex flex-col justify-center cursor-pointer font-bold text-3xl">
            <Link to={'/blogs'}>
                WhiteSpace
            </Link>
        </div>
        <div className="flex items-center gap-3">

            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/signin");
                }}
                className="relative px-5 h-7 w-28 overflow-hidden font-medium text-white bg-red-600 border border-gray-100 rounded-lg shadow-inner group" >
                Sign Out
            </button>

            <button
                onClick={() => {
                    navigate("/publish");
                }}
                className="relative mr-2 px-5 h-7 w-28 overflow-hidden font-medium text-white bg-green-600 border border-gray-100 rounded-lg shadow-inner group"
            >
                    Publish
            </button>
            <Avatar name="User" size={"big"} />

        </div>
    </div>
}


