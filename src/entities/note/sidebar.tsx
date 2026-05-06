import { useContext, createContext, useState} from "react";
import { type Note } from "./model/types";
import ContextMenu from "./contextMenu";
import {type PropContextMenu} from './model/types';

type SidebarContextType = {
    notes: Note[];
    onContextMenu: (e: React.MouseEvent, item: Note) => void;
    showTitle: string;
    setShowTitle: (value: string) => void;
    onEditNote: () => void;
    onDeleteNote: (item: Note) => void;

};

const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarComponent = ({SidebarProp, children}: {SidebarProp: SidebarContextType, children: React.ReactNode} ) => {
        const [showTitle, setShowTitle] = useState('');
    return (
        <SidebarContext.Provider value={{...SidebarProp, showTitle, setShowTitle}}>
            {children}
        </SidebarContext.Provider>
    );
};

const SidebarFilterGroup = () => {
    const context = useContext(SidebarContext);
    if(context === null)return;
    const {showTitle, setShowTitle} = context;
    return (
        <div>
            <div>
                <input 
                    type="text" 
                    id="inputfiltrTitle"
                    value={showTitle}
                    onChange={(e) => setShowTitle(e.target.value)} />
                <label htmlFor="inputfiltrTitle">Title</label>
                <input type="text" id="inputfiltrContent" />
                <label htmlFor="inputfiltrContent">Content</label>
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
    const{notes, onContextMenu, showTitle, setShowTitle} = context;
    return (
        <div className={sidebar}>
            {notes.length !== 0 ? (
            <div className={StatusWrapper}>
                <div className={StatusWrapperItem}>
                <h2 className={StatusWrapperTitle}>In Progress</h2>
                {notes
                .filter(n => n.status === 'inprogress')
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
                .filter(n => n.status === 'completed')
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



export default Sidebar;