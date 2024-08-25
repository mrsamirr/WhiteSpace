import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
import medium from "./../assets/medium-icon-svgrepo-com.svg"
import { useLogout } from "../hooks"

export const Appbar = () => {
    const logout = useLogout();
    return <div className="border-b flex justify-between px-10 py-4">
            <img src={medium} />
        <div className="flex flex-col justify-center cursor-pointer font-bold text-3xl">
            <Link to={'/blogs'}>
                Medium
            </Link>
        </div>
        <div>
            <Link to={'/publish'}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">New Blog</button>
            <Avatar name="Md Samerr Ansari" size={"big"} />
            </Link>
            <Link
          onClick={logout}
          to='/signin'
          className='py-1 px-3 ml-3 rounded-xl bg-red-600 text-white'
        >
          Logout
        </Link>
        </div>
    </div>
}