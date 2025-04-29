import { Auth } from "../components/Auth"
import BgBlock from "../components/BgBlock"
import medium from "./../assets/medium-icon-svgrepo-com.svg"
import '../fonts.css'

export const Signin = () => {
  return (
    <div className="h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
        <div className="flex flex-col justify-center">
          <div className="w-32 h-10 px-6 pt-10 lg:mx-16 lg:pt-20 flex gap-2 items-center">
            <img src={medium} alt="Medium Logo" />
            <span className="text-2xl font-extrabold font-gt-super pt-2">Medium </span>
          </div>
          <Auth type="signin" />
        </div>
        <div className="hidden lg:block">
          <BgBlock />
        </div>
      </div>
    </div>
  );
}
