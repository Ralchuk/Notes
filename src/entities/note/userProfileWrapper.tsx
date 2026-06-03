import { createPortal } from 'react-dom';
import { useRef } from 'react';

type UserProfileType = {
	children: React.ReactNode;
	onClose: () => void;
}

const UserProfileWrapper = ({children, onClose}: UserProfileType) => {
	const user = document.getElementById('userProfile');
	const userRef = useRef<HTMLDivElement>(null);
	if(user === null)return;
	return createPortal(
		<div
			className='flex fixed inset-0 bg-black/50 justify-center items-center'
			onClick={onClose}>
			<div
				className='flex flex-col gap-[40px] bg-white px-[40px] py-[40px]  uppercase rounded-[15px] overflow-hidden bg-white dark:bg-[#07151e] dark:border-[1px] dark:border-[#1976d3]'
				ref={userRef}>
				{children}
			</div>
		</div>,
		user
	);
};

export default UserProfileWrapper;
