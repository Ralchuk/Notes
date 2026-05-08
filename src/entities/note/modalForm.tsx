import { createPortal } from 'react-dom';
import { useRef, useEffect } from 'react';

const portalBg = 'flex fixed inset-0 bg-black/50 justify-center items-center';
const portalWrapper =
	'flex flex-col gap-[40px] bg-white px-[40px] py-[40px]  uppercase rounded-[15px] overflow-hidden ';

type ModalProp = {
	children: React.ReactNode;
	onClose: () => void;
};

const ModalWrapper = ({ children, onClose }: ModalProp) => {
	const modal = document.getElementById('modal');
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const focusableElements = modalRef.current?.querySelectorAll(
			'button, input, a, textarea, select, input, [tabindex]:not([tabindex="-1"], [href]'
		);

		if (!focusableElements || focusableElements.length === 0) return;

	
		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[
			focusableElements.length - 1
		] as HTMLElement;

		firstElement.focus();

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

	if (!modal) return null;

	return createPortal(
		<div
			className={portalBg}
			onClick={onClose}
		>
			<div
				className={portalWrapper}
				ref={modalRef}
				role='dialog'
				aria-modal='true'
				onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		modal,
	);
};

export default ModalWrapper;
