import { createPortal } from 'react-dom';
import { useRef } from 'react';
import { useEffect } from 'react';

type UserProfileType = {
	children: React.ReactNode;
	onClose: () => void;
}

const UserProfileWrapper = ({children, onClose}: UserProfileType) => {
	const user = document.getElementById('userProfile');
	const userRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const focusableElements = userRef.current?.querySelectorAll(
			'button, input, a, textarea, select, input, [tabindex]:not([tabindex="-1"]), [href]'
		);

		if (!focusableElements || focusableElements.length === 0) return;

	
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[
			focusableElements.length - 1
		] as HTMLElement;

		if (!userRef.current?.contains(document.activeElement)){
			firstElement.focus();
		};

		function handleTab(e: KeyboardEvent) {
			if (e.key !== 'Tab') return;

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement.focus();
				}
			}
		}
		function handleEscape(e: KeyboardEvent) {
			if(e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('keydown', handleTab);
		return () => {
			document.removeEventListener('keydown', handleTab);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [onClose]);

	if(user === null)return;
	return createPortal(
		<div
			className='flex fixed inset-0 bg-black/50 justify-center items-center'
			onClick={onClose}>
			<div
				className='flex flex-col gap-[40px] bg-white px-[40px] py-[40px]  uppercase rounded-[15px] overflow-hidden bg-white dark:bg-[#07151e] dark:border-[1px] dark:border-[#1976d3]'
				ref={userRef}
				onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
				{children}
			</div>
		</div>,
		user
	);
};

export default UserProfileWrapper;
