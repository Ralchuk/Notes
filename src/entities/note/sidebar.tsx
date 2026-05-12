import { useContext, createContext, useId, useReducer } from 'react';
import Empty_note from '../../../img/undraw_add-notes_9xls.svg';
import {
	type SiderbarState,
	type SidebarAction,
	type SidebarProp,
	type SidebarContextType,
} from './model/types';

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

const StatusWrapper = 'flex flex-col gap-[20px]';
const StatusWrapperItem = 'flex flex-col  py-[10px] gap-[10px]';
const StatusWrapperTitle =
	'text-black/50 text-[24px] font-[Roboto, sans-serif] font-normal px-[10px] border-b-[1px] dark:text-white';

// item Note in progress
const itemNote =
	'flex flex-col  bg-[#1976d3]/80 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px]';
const itemNoteHeader = 'flex flex-col gap-[10px]';
const itemNoteTitle =
	'text-white text-[32px] font-[Roboto, sans-serif] font-medium';
const itemNoteContent = 'text-white text-[16px] font-[Roboto, sans-serif]';
const itemNoteDate =
	'text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end';

// item Note completed
const itemNoteCompleted =
	'flex flex-col   bg-black/25 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px] dark:border-[1px] dark:border-[#1976d3]';
const itemNoteHeaderCompleted = 'flex flex-col gap-[10px]';
const itemNoteTitleCompleted =
	'text-white text-[32px] font-[Roboto, sans-serif] font-medium';
const itemNoteContentCompleted =
	'text-white text-[16px] font-[Roboto, sans-serif]';
const itemNoteDateCompleted =
	'text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end';

// const arrEmpty = 'flex flex-col items-center justify-center opacity-50 h-full';

const InitialSidebarState: SiderbarState = {
	showTitle: '',
	showContent: '',
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
}

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

	const id = useId();
	return (
		<SidebarContext.Provider
			value={{
				...SidebarProp,
				stateSidebar,
				dispatchSidebar,
				id,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

const SidebarFilterGroup = () => {
	const context = useContext(SidebarContext);
	if (context === null) return;
	const { stateSidebar, dispatchSidebar, id } = context;
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
					onChange={(e) =>
						dispatchSidebar({
							type: 'SEARCHING_BY_TITLE',
							payload: e.target.value,
						})
					}
				/>
				<label htmlFor={`${id}-content`} />
				<input
					className={inputTitle}
					placeholder="Searching by content..."
					type="text"
					id={`${id}-content`}
					value={stateSidebar.showContent}
					onChange={(e) =>
						dispatchSidebar({
							type: 'SEARCHING_BY_CONTENT',
							payload: e.target.value,
						})
					}
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
	if (context == null) return;
	const { notes, onContextMenu, stateSidebar } = context;
	return (
		<div className={sidebar}>
			{notes.length !== 0 ? (
				<div className={StatusWrapper}>
					{stateSidebar.filterStatusInprogress ?  (
						<div className={StatusWrapperItem}>
							<h2 className={StatusWrapperTitle}>In Progress</h2>
							{notes
								.filter(
									(n) =>
										n.status === 'inprogress' &&
										n.title.includes(stateSidebar.showTitle) &&
										n.content.includes(stateSidebar.showContent),
								)
								.map((item) => (
									<div
										className={itemNote}
										key={item.id}
										onContextMenu={(e) => onContextMenu(e, item)}
									>
										<div className={itemNoteHeader}>
											<h1 className={itemNoteTitle}>{item.title}</h1>
											<h2 className={itemNoteContent}>{item.content}</h2>
										</div>
										<h3 className={itemNoteDate}>
											{item.createdAt.toLocaleString()}
										</h3>
									</div>
								))}
						</div>
					) : null
					}
					{stateSidebar.filterStatusCompleted ? (
						<div className={StatusWrapperItem}>
							<h2 className={StatusWrapperTitle}>Completed</h2>
							{notes
								.filter(
									(n) =>
										n.status === 'completed' &&
										n.title.includes(stateSidebar.showTitle) &&
										n.content.includes(stateSidebar.showContent),
								)
								.map((item) => (
									<div
										className={itemNoteCompleted}
										key={item.id}
										onContextMenu={(e) => onContextMenu(e, item)}
									>
										<div className={itemNoteHeaderCompleted}>
											<h1 className={itemNoteTitleCompleted}>{item.title}</h1>
											<h2 className={itemNoteContentCompleted}>
												{item.content}
											</h2>
										</div>
										<h3 className={itemNoteDateCompleted}>
											{item.createdAt.toLocaleString()}
										</h3>
									</div>
								))}
						</div>
					) : null}
				</div>
			) : (
				<div>
					<img  src={Empty_note} alt='no_notes' />
				</div>
			)}
		</div>
	);
};

const Sidebar = Object.assign(SidebarComponent, {
	FilterGroup: SidebarFilterGroup,
	SidebarList: SidebarList,
});

export default Sidebar;
