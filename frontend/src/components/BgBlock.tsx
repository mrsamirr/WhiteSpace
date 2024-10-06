import pg from '../assets/bg_set2.jpeg';

const BgBlock = () => {
	return (
		<div className='h-screen rounded pl-20 p-2 relative hidden lg:block'>
			<img
				src={pg}
				className='object-cover w-full z-0 lg:object-left  h-full rounded-tl-[70px]  rounded-br-[70px]'
			></img>
			<div className='object-cover w-full absolute top-0 right-0 z-100   h-full rounded-tl-[70px]  rounded-br-[70px]'></div>
		</div>
	);
};

export default BgBlock;