type PropForm = {
    title: string,
    text: string,
    setTitle: (value: string) => void,
    setText: (value: string) => void,
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void,
};

export default function Form ({title, text, setTitle, setText, onSubmit}: PropForm ) {
    return (
        <div >
            <form 
                className="flex flex-col gap-[10px] w-[fit]"
                id="note-form"
                onSubmit={onSubmit}>
                <input 
                    className="px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none focus:border-[#1976d3] font-[Roboto, sans-serif]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}>
                </input>
                <textarea
                    rows={4}
                    className="h-[] px-3 py-1 rounded-[5px] border-[1px] border-[#1976d3]/40 outline-none resize-none focus:border-[#1976d3] font-[Roboto, sans-serif]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
            </form>
        </div>

    )
}