import { SignupInput } from "@devsamer/whitespace-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
      name: '',
      email: '',
      password: '',
    });
    const navigate = useNavigate();
  
    async function sendrequest() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/${
            type === 'signup' ? 'signup' : 'signin '
          }`,
          postInputs
        );
        const jwt = response.data;
        localStorage.setItem('token', jwt);
        navigate('/blogs');
      } catch (error) {
        alert(error);
      }
    }



    return <div className="h-screen flex justify-center flex-col">
       <div className="flex justify-center">
           <div>
            <div className="px-10">
                <div className="text-4xl font-extrabold">
                     {type === "signup" ? "Create an account" : "Login Your Account"}
                </div>
                    <div className="text-slate-400">
                        {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                        <Link className="font-semibold underline text-black pl-1" to={type === "signin" ? "/" : "/signin"}>
                            {type === "signin" ? "Sign Up" : "Sign In"}
                        </Link> 
                    </div>
                    </div>
                        <div className="pt-4">
                          {type === "signup" ?  <LabelledInput label="Name" placeholder="Md Samer Ansari" onchange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                            }}/> : null}
                            <LabelledInput label="Email" placeholder="sam@example.com" onchange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                            }}/>
                            <LabelledInput label="Password" type={"password"}placeholder="" onchange={(e) => {
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                            }}/>
                            <button onClick={sendrequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </div>    
             </div>
    </div>
}

interface LabelledInputTypes {
    label: string;
    placeholder: string;
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function LabelledInput({ label, placeholder, onchange, type }: LabelledInputTypes) {
    return  <div>
    <label className="block mb-2 text-sm font-bold text-black pt-4">{label}</label> 
    <input onChange={onchange} type={ type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5" placeholder={placeholder} required />
    
</div>
}


