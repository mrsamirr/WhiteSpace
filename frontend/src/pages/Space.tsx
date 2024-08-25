import { useNavigate } from "react-router-dom"


export const Space = () => {
    const navigate = useNavigate();

    return <div className="flex flex-start pt-10 pl-20">
      <h2> Hey, Anonymous Nothing Here, Go to the login page </h2>
      <div className="pl-5">
        <button type="button" onClick={() => navigate('/signup')} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login</button>
        </div>
  </div>

    
   
}