export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export type PropForm = {
    title: string,
    text: string,
    setTitle: (value: string) => void,
    setText: (value: string) => void,
    onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void,
};

export type PropContextMenu = {
    x: number;
    y: number;
    menuRef: React.RefObject<HTMLDivElement | null>;
    onEditNote: () => void;
    onDeleteNote: () => void;
}