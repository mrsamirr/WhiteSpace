import { Auth } from "../components/Auth"
import BgBlock from "../components/BgBlock";
import medium from "./../assets/medium-icon-svgrepo-com.svg"

export const Signup = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div>
        <div className="w-32 h-10 px-6 pt-10 lg:mx-16 lg:pt-20 flex gap-2 items-center">
            <img src={medium} alt="Medium Logo" />
            <span className="text-2xl font-extrabold font-sans pt-2">Medium</span>
          </div>
          <Auth type="signup" />
        </div>
        <div>
          <BgBlock />
        </div>
      </div>
    </div>
  );
}