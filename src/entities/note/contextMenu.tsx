type PropContextMenu = {
    x: number;
    y: number;
}

export default function ContextMenu({x, y}: PropContextMenu){
    return (
        <div 
            className="flex fixed z-50" 
            style={{left: x, top:y}}
            onClick={(e) => e.stopPropagation()}>
            <p>MyContextMenu</p>
        </div>
    )
}