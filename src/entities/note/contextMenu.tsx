type PropContextMenu = {
    x: number;
    y: number;
}

export default function ContextMenu({x, y}: PropContextMenu){
    return (
        <div 
            className="flex flex-col items-stretch fixed z-50 " 
            style={{left: x, top:y}}
            onClick={(e) => e.stopPropagation()}>
            <button className="flex uppercase px-6 py-2 text-white bg-[#1976d3] font-[Roboto, sans-serif] text-xs font-medium transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer">Edit note</button>
            <button className="flex uppercase px-6 py-2 text-white bg-[#1976d3] font-[Roboto, sans-serif] text-xs font-medium transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer">Delete note</button>
        </div>
    )
}