import { FaLinkedin } from 'react-icons/fa';

export const Quote = () => {
    return <div className="bg-slate-200 h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="max-w-lg">
                <div className="text-3xl font-bold">
                    "The customer service I recieved was exceptional. The support team went above and beyond to address the concern"
                </div>
                <div className="max-w-md text-xl font-bold text-left mt-4">
                    Jules Winnfield
                </div>
                <div className="max-w-md text-sm font-light text-slate-400">
                    CEO, Acme Corp
                </div>
                <div className='max-w-lg text-2xl font-bold mt-4'>
                  Md Samer Ansari
                </div>
                <div className='max-w-lg'>
                    <a
                        href='https://www.linkedin.com/in/mrsamirr/'
                        className='flex items-center'
                        target='_blank'
                    >
                        <span className='mr-2 font-light'>Let's Connect</span>{' '}
                        <FaLinkedin color='blue' size={20} />
                    </a>
                </div>
            </div>
        </div>

    </div>
}