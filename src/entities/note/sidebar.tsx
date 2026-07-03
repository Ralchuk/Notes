import { useContext, createContext, useId, useReducer, useTransition, useMemo, useEffect, useState } from 'react';
import {
	type SiderbarState,
	type SidebarAction,
	type SidebarProp,
	type SidebarContextType,
} from './model/types';
import { preload } from 'react-dom';

const sidebar = 'flex flex-col flex-1 gap-[30px] w-full ';

// filters
const filter = 'flex flex-col gap-[20px] ';
const filterTitle =
	'font-[Roboto, sans-serif] font-medium text-[24px] text-black/50 dark:text-white';
const filterInput = 'flex flex-col gap-[5px]';
const filterCheckbox = 'flex flex-row';
const checkboxItem = 'flex';
const checkboxInput = 'appearance-none peer';
const checkboxBtnProgress =
	'cursor-pointer uppercase font-[Roboto, sans-serif] text-[#1976d3] font-medium transition-all duration-200 px-[20px] py-[10px] bg-white border-[1px] rounded-l-[10px] border-[#1976d3] peer-checked:bg-[#1976d3] peer-checked:text-white';
const checkboxBtnCompleted =
	'cursor-pointer uppercase font-[Roboto, sans-serif] text-[#1976d3] font-medium transition-all duration-200 px-[20px] py-[10px] bg-white border-[1px] border-l-0 rounded-r-[10px] border-[#1976d3] peer-checked:bg-[#1976d3] peer-checked:text-white';

const inputTitle =
	'w-[300px] px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:text-gray-400 focus:placeholder-transparent';

const StatusWrapper = 'flex flex-col gap-[20px] relative';
const StatusWrapperItem = 'flex flex-col  py-[10px] gap-[10px]';
const StatusWrapperTitle =
	'text-black/50 text-[24px] font-[Roboto, sans-serif] font-normal px-[10px] border-b-[1px] dark:text-white';

// item Note in progress
const itemNote =
	'flex flex-col  bg-[#1976d3]/80 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px]';
const itemNoteHeader = 'flex flex-col gap-[10px]';
const itemNoteTitle =
	'text-white text-[32px] font-satoshi font-medium';
const itemNoteContent = 'text-white text-[16px] font-satoshi';
const itemNoteDate =
	'text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end';

// item Note completed
const itemNoteCompleted =
	'flex flex-col   bg-black/25 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px] dark:border-[1px] dark:border-[#1976d3]';
const itemNoteHeaderCompleted = 'flex flex-col gap-[10px]';
const itemNoteTitleCompleted =
	'text-white text-[32px] font-satoshi font-medium';
const itemNoteContentCompleted =
	'text-white text-[16px] font-satoshi';
const itemNoteDateCompleted =
	'text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end';

// isPanding

const isPandingbg = 'flex w-full h-full absolute bg-white/75 justify-center items-center';
const isPandingWrapper = 'flex flex-col gap-[10px]';
const isPandingLoader = 'flex w-[70px] h-[70px] bg-transparent border-[5px] border-solid border-t-[#1976d3] border-r-transparent border-b-[#1976d3] border-l-transparent rounded-full animate-spin';
const isPandingText = 'text-[#1976d3] text-[16px] font-[Roboto, sans-serif] font-normal';


// const markDownParser = (value: string):string =>{
// 	return value
// 		.replace(/^# (.+)/gm, '<h1>$1</h1>')
// 		.replace(/^## (.+)/gm, '<h2>$1</h2>')
// 		.replace(/^### (.+)/gm, '<h3>$1</h3>')
// 		.replace(/^#### (.+)/gm, '<h4>$1</h4>')
// 		.replace(/^##### (.+)/gm, '<h5>$1</h5>')
// 		.replace(/^###### (.+)/gm, '<h6>$1</h6>')
// 		.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
// 		.replace(/^__(.+?)__/g, '<b>$1</b>')
// 		.replace(/\*(.+?)\*/g, '<em>$1</em>')
// 		.replace(/^_(.+?)/gm, '<i>$1</i>')
// 		.replace(/^`(.+?)/gm, '<code>$1</code>')
// 		.replace(/^```(.+?)/gm, '<pre><code>$1</code><pre>');
// };

// const arrEmpty = 'flex flex-col items-center justify-center opacity-50 h-full';

const InitialSidebarState: SiderbarState = {
	showTitle: '',
	showContent: '',
	deferredShowTitle: '',
	deferredShowContent: '',
	filterStatusInprogress: true,
	filterStatusCompleted: false,
};

function reduceSidebar(state: SiderbarState, action: SidebarAction) {
	switch (action.type) {
	case 'SEARCHING_BY_TITLE':
		return {
			...state,
			showTitle: action.payload,
		};
	case 'SEARCHING_BY_CONTENT':
		return {
			...state,
			showContent: action.payload,
		};
	case 'DEFERRED_SEARCHING_BY_TITLE':
		return {
			...state,
			deferredShowTitle: action.payload,
		};
	case 'DEFERRED_SEARCHING_BY_CONTENT':
		return {
			...state,
			deferredShowContent: action.payload,
		};
	case 'STATUS_INPROGRESS':
		return {
			...state,
			filterStatusInprogress: !state.filterStatusInprogress
		};
	case 'STATUS_COMPLETED':
		return {
			...state,
			filterStatusCompleted: !state.filterStatusCompleted,
		};
	}
};

preload('https://www.fontshare.com/fonts/satoshi.woff2', {
	as:'font',
	type: 'font/woff2'
});

const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarComponent = ({
	SidebarProp,
	children,
}: {
	SidebarProp: SidebarProp;
	children: React.ReactNode;
}) => {
	const [stateSidebar, dispatchSidebar] = useReducer(
		reduceSidebar,
		InitialSidebarState,
	);
	const[parser, setParser] = useState<((value: string) => string) | null>(null);
	const [isPanding, startTransition] = useTransition();

	const id = useId();


	useEffect(() => {
		import('./markDown')
			.then((result) => {
				setParser(() => result.default);
			});
	},[]);
	return (
		<SidebarContext
			value={{
				...SidebarProp,
				stateSidebar,
				dispatchSidebar,
				id,
				isPanding,
				startTransition,
				parser
			}}
		>
			{children}
		</SidebarContext>
	);
};

const SidebarFilterGroup = () => {
	const context = useContext(SidebarContext);
	if (context === null) return;
	const { stateSidebar, dispatchSidebar, id, startTransition } = context;

	function handleSearchingTitle(e: React.ChangeEvent<HTMLInputElement>){
		const newValue = e.target.value;
		dispatchSidebar({type:'SEARCHING_BY_TITLE', payload: newValue});
		startTransition(() => {
			dispatchSidebar({type:'DEFERRED_SEARCHING_BY_TITLE', payload: newValue});
		});
	};
	function handleSearchingContent(e: React.ChangeEvent<HTMLInputElement>){
		const newValue = e.target.value;
		dispatchSidebar({type:'SEARCHING_BY_CONTENT', payload: newValue});
		startTransition(() => {
			dispatchSidebar({type:'DEFERRED_SEARCHING_BY_CONTENT', payload: newValue});
		});
	};

	return (
		<div className={filter}>
			<h2 className={filterTitle}>Filter</h2>
			<div className={filterInput}>
				<label htmlFor={`${id}-title`} />
				<input
					className={inputTitle}
					placeholder="Searching by title..."
					type="text"
					id={`${id}-title`}
					value={stateSidebar.showTitle}
					onChange={handleSearchingTitle}
				/>
				<label htmlFor={`${id}-content`} />
				<input
					className={inputTitle}
					placeholder="Searching by content..."
					type="text"
					id={`${id}-content`}
					value={stateSidebar.showContent}
					onChange={handleSearchingContent}
				/>
			</div>
			<div
				className={filterCheckbox}
				role="group"
				aria-label="Basic checkbox toggle button group"
			>
				<div className={checkboxItem}>
					<input
						type="checkbox"
						name="statusInprogres"
						className={checkboxInput}
						id={`${id}-inprogress`}
						
						autoComplete="off"
						defaultChecked
						onChange={() =>
							dispatchSidebar({ type: 'STATUS_INPROGRESS'})
						}
					/>
					<label className={checkboxBtnProgress} htmlFor={`${id}-inprogress`}>
						In Progress
					</label>
				</div>
				<div className={checkboxItem}>
					<input
						type="checkbox"
						name="statusCompl"
						className={checkboxInput}
						
						id={`${id}-completed`}
						autoComplete="off"
						onChange={() =>
							dispatchSidebar({ type: 'STATUS_COMPLETED'})
						}
					/>
					<label className={checkboxBtnCompleted} htmlFor={`${id}-completed`}>
						Completed
					</label>
				</div>
			</div>
		</div>
	);
};

const SidebarList = () => {
	
	const context = useContext(SidebarContext);

	const notes = context?.notes;
	const deferredShowTitle = context?.stateSidebar.deferredShowTitle ?? '';
	const deferredShowContent = context?.stateSidebar.deferredShowContent ?? '';
	const parser = context?.parser ?? null;

	const filterInProgress = useMemo(() => {
		if (!notes) return;
		return notes
			.filter(
				(n) =>
					n.status === 'inprogress' &&
					n.title.toLocaleLowerCase().startsWith(deferredShowTitle.toLocaleLowerCase()) &&
					n.content.toLocaleLowerCase().startsWith(deferredShowContent.toLocaleLowerCase()),
			)
			.map((item) => ({
				...item,
				parsedTitle: parser ? parser(item.title) : item.title,
				parsedContent: parser ? parser(item.content) : item.content,
			}));
	},
	[notes, deferredShowTitle, deferredShowContent, parser]);

	// function filterInProgress(){
	// 	if (!notes) return;
	// 	return notes
	// 		.filter(
	// 			(n) =>
	// 				n.status === 'inprogress' &&
	// 				n.title.toLocaleLowerCase().startsWith(deferredShowTitle.toLocaleLowerCase()) &&
	// 				n.content.toLocaleLowerCase().startsWith(deferredShowContent.toLocaleLowerCase()),
	// 		)
	// 		.map((item) => ({
	// 			...item,
	// 			parsedTitle: markDownParser(item.title),
	// 			parsedContent: markDownParser(item.content),
	// 		}));
	// };

	const filterCompleted = useMemo(() => {
		if (!notes) return;
		return notes
			.filter(
				(n) =>
					n.status === 'completed' &&
					n.title.toLocaleLowerCase().startsWith(deferredShowTitle.toLocaleLowerCase()) &&
					n.content.toLocaleLowerCase().startsWith(deferredShowContent.toLocaleLowerCase()),
			)
			.map((item) => ({
				...item,
				parsedTitle: parser ? parser(item.title) : item.title,
				parsedContent: parser ? parser(item.content) : item.content,
			}));
	},
	[notes, deferredShowTitle, deferredShowContent, parser]);

	// function filterCompleted(){
	// 	if (!notes) return;
	// 	return notes
	// 		.filter(
	// 			(n) =>
	// 				n.status === 'completed' &&
	// 				n.title.toLocaleLowerCase().startsWith(deferredShowTitle.toLocaleLowerCase()) &&
	// 				n.content.toLocaleLowerCase().startsWith(deferredShowContent.toLocaleLowerCase()),
	// 		)
	// 		.map((item) => ({
	// 			...item,
	// 			parsedTitle: markDownParser(item.title),
	// 			parsedContent: markDownParser(item.content),
	// 		}));
	// };

	if (context == null) return;
	const { onContextMenu, stateSidebar, isPanding } = context;

	

	return (
		<div className={sidebar}>
			<div className={StatusWrapper}>
				{isPanding && 
					<div
				 	className={isPandingbg}>
						<div
							className={isPandingWrapper}>
							<div
								className={isPandingLoader}>
							</div>
							<p
								className={isPandingText}>Searching...
							</p>
						</div>
					</div>
				}
				
				{stateSidebar.filterStatusInprogress  ?  (
					<div className={StatusWrapperItem}>
						<h2 className={StatusWrapperTitle}>In Progress</h2>
						{filterInProgress?.map((item) => (
							<div
								className={itemNote}
								key={item.id}
								onContextMenu={(e) => onContextMenu(e, item)}
							>
								<div className={itemNoteHeader}>
									<p className={itemNoteTitle} dangerouslySetInnerHTML={{ __html: item.parsedTitle }}/>
									<p className={itemNoteContent} dangerouslySetInnerHTML={{ __html: item.parsedContent }}/>
								</div>
								<h3 className={itemNoteDate}>
									{new Date(item.createdAt).toLocaleString()}
								</h3>
							</div>
						))}
					</div>
				) : null
				}
				{stateSidebar.filterStatusCompleted  ?  (
					<div className={StatusWrapperItem}>
						<h2 className={StatusWrapperTitle}>Completed</h2>
						{filterCompleted?.map((item) => (
							<div
								className={itemNoteCompleted}
								key={item.id}
								onContextMenu={(e) => onContextMenu(e, item)}
							>
								<div className={itemNoteHeaderCompleted}>
									<p className={itemNoteTitleCompleted} dangerouslySetInnerHTML={{ __html: item.parsedTitle }}/>
									<p className={itemNoteContentCompleted} dangerouslySetInnerHTML={{ __html: item.parsedContent }}/>
								</div>
								<h3 className={itemNoteDateCompleted}>
									{new Date(item.createdAt).toLocaleString()}
								</h3>
							</div>
						))}
					</div>
				) : null
				}
			</div>
		</div>
	);
};

const Sidebar = Object.assign(SidebarComponent, {
	FilterGroup: SidebarFilterGroup,
	SidebarList: SidebarList,
});

export default Sidebar;
