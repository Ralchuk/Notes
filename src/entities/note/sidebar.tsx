import { useContext, createContext, useState} from "react";
import { type Note } from "./model/types";


const sidebar = "flex flex-col flex-1 gap-[20px] w-full ";

// filters
const filter = "flex flex-col gap-[15px]";
const filterTitle = "font-[Roboto, sans-serif] font-medium text-[24px] text-black/50"
const filterInput ="flex flex-col";
const inputTitle = "w-[300px] px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif] placeholder:italic focus:placeholder-transparent";

const StatusWrapper = "flex flex-col gap-[20px]";
const StatusWrapperItem = "flex flex-col  py-[10px] gap-[10px] ";
const StatusWrapperTitle = "text-black/50 text-[24px] font-[Roboto, sans-serif] font-normal px-[10px] border-b-[1px]"

// item Note in progress
const itemNote = "flex flex-col  bg-[#1976d3]/80 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px]";
const itemNoteHeader = "flex flex-col gap-[10px]";
const itemNoteTitle = "text-white text-[32px] font-[Roboto, sans-serif] font-medium";
const itemNoteContent = "text-white text-[16px] font-[Roboto, sans-serif] ";
const itemNoteDate = "text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end";

// item Note completed
const itemNoteCompleted = "flex flex-col   bg-black/25 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px]";
const itemNoteHeaderCompleted = "flex flex-col gap-[10px]";
const itemNoteTitleCompleted = "text-white text-[32px] font-[Roboto, sans-serif] font-medium";
const itemNoteContentCompleted = "text-white text-[16px] font-[Roboto, sans-serif] ";
const itemNoteDateCompleted = "text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end";

const arrEmpty = "flex flex-col items-center justify-center opacity-50 h-full";

type SidebarContextType = {
    notes: Note[];
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>, item: Note) => void;
    showTitle: string;
    setShowTitle: (value: string) => void;
    showContent: string;
    setShowContent: (value: string) => void;
    onEditNote: () => void;
    onDeleteNote: (item: Note) => void;

};

const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarComponent = ({SidebarProp, children}: {SidebarProp: SidebarContextType, children: React.ReactNode} ) => {
        const [showTitle, setShowTitle] = useState('');
        const [showContent, setShowContent] = useState('');
    return (
        <SidebarContext.Provider value={{...SidebarProp, showTitle, setShowTitle, showContent, setShowContent}}>
            {children}
        </SidebarContext.Provider>
    );
};

const SidebarFilterGroup = () => {
    const context = useContext(SidebarContext);
    if(context === null)return;
    const {showTitle, setShowTitle, showContent, setShowContent} = context;
    return (
        <div className={filter}>
            <h2 className={filterTitle}>Filter</h2>
            <div 
                className={filterInput}
            >
                <label htmlFor="inputfiltrTitle">Title</label>
                <input 
                    className={inputTitle}
                    type="text" 
                    id="inputfiltrTitle"
                    value={showTitle}
                    onChange={(e) => setShowTitle(e.target.value)} 
                />
                <label htmlFor="inputfiltrContent">Content</label>
                <input 
                    className={inputTitle}
                    type="text" 
                    id="inputfiltrContent" 
                    value={showContent}
                    onChange={(e) => setShowContent(e.target.value)} 
                />
                
            </div>
            <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck1">Checkbox 1</label>

                <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck2">Checkbox 2</label>

                <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" />
                <label class="btn btn-outline-primary" for="btncheck3">Checkbox 3</label>
            </div>
            
        </div>
    );
};

const SidebarList = () => {
    const context = useContext(SidebarContext);
    if(context == null) return;
    const{notes, onContextMenu, showTitle, setShowTitle, showContent, setShowContent} = context;
    return (
        <div className={sidebar}>
            {notes.length !== 0 ? (
            <div className={StatusWrapper}>
                <div className={StatusWrapperItem}>
                <h2 className={StatusWrapperTitle}>In Progress</h2>
                {notes
                .filter(n => n.status === 'inprogress' && n.title.includes(showTitle) && n.content.includes(showContent))
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
                ))
                }
            </div>
            <div className={StatusWrapperItem}>
                <h2 className={StatusWrapperTitle}>Completed</h2>
                {notes
                .filter(n => n.status === 'completed' && n.title.includes(showTitle) && n.content.includes(showContent))
                .map((item) => (
                <div
                    className={itemNoteCompleted}
                    key={item.id}
                    onContextMenu={(e) => onContextMenu(e, item)}
                >
                    <div className={itemNoteHeaderCompleted}>
                    <h1 className={itemNoteTitleCompleted}>{item.title}</h1>
                    <h2 className={itemNoteContentCompleted}>{item.content}</h2>
                    </div>
                    <h3 className={itemNoteDateCompleted}>
                    {item.createdAt.toLocaleString()}
                    </h3>
                </div>
                ))
                }
            </div>
            </div>
            ) : (
            <div className={arrEmpty}>
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                    <path
                    d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                    stroke="black"
                    strokeWidth="1.5"
                    />
                    <path d="M9 12h6M9 16h4" stroke="black" strokeWidth="1.5" />
                </svg>
                <p>No notes yet</p>
                <small>Click "Create" to add your first note</small>
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