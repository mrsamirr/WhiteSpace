import Image from "./../assets/mediumLanding.jpg"
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-neutral-100">
            <Navbar />
            <main className="flex-grow flex items-center">
                <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row">
                    <div className="md:w-1/2 space-y-6 md:pr-8">
                        <h1 className="text-9xl md:text-8xl font-serif font-medium leading-tight text-gray-900">
                            Human
                        </h1>
                        <p className="text-9xl md:text-7xl font-serif font-medium  text-gray-900">
                            stories & ideas
                        </p>
                        <p className="text-xl font-medium text-gray-700">A place to read, write, and deepen your understanding</p>
                        <div className="pt-4">
                            <button className="rounded-full bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-4 text-lg" 
                            onClick={() => window.location.href = "/home"}>
                                Start reading
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center md:justify-end">
                        <div className="relative w-full max-w-md min-h-96 md:h-96">
                            <img
                                src={Image}
                                alt="Medium Landing"
                                className="object-contain"
                                loading="eager"
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
