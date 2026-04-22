import {type PropContextMenu} from './model/types';

const contextMenuConteiner = "flex flex-col items-stretch fixed z-50 w-[200px] h-fit rounded-[5px] overflow-hidden border border-[#1976d3]";
const btnEditNote = "flex uppercase px-6 py-2 text-white bg-[#1976d3] font-[Roboto, sans-serif] text-xs font-medium transition-all duration-200 hover:bg-white  hover:text-[#1976d3] cursor-pointer";
const btnDeleteNote = "flex uppercase px-6 py-2 text-white bg-[#1976d3] font-[Roboto, sans-serif] text-xs font-medium transition-all duration-200 hover:bg-white  hover:text-[#1976d3] cursor-pointer";
export default function ContextMenu({x, y, menuRef, onEditNote, onDeleteNote}: PropContextMenu){
    return (
        <div 
            className={contextMenuConteiner}
            style={{left: x, top:y}}
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}>
            <button 
            onClick={onEditNote}
            className={btnEditNote}>Edit note</button>
            <button 
            onClick={onDeleteNote}
            className={btnDeleteNote}>Delete note</button>
        </div>
    )
}