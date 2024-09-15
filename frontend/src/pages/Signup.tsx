import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"
import medium from "./../assets/medium-icon-svgrepo-com.svg"

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div>
        <div className="flex gap-2 items-center">
        <img className="w-8 h-8 mt-2 ml-2" src={medium} alt="" />
          <span className="text-2xl font-extrabold font-sans mt-2">Medium</span>
        </div>
        <Auth type="signup" />
      </div>
      <div>
        <Quote />
      </div>
    </div>
  );
}