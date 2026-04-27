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

export type PropResizingTextarea = {
    text: string,
    setText: (value: string) => void,
};

export type MenuState = {
  isOpenMenu: boolean;
  coord: {x: number, y: number} | null;
  noteItem: Note | null;
}

export type MenuAction = 
  | {
      type: 'OPEN_MENU';
      payload: {
        coord: {x: number; y: number};
        noteItem: Note;
      }
    }
  | {
    type: 'HIDE_MENU';
    }
  | {
      type: 'CLOSE_MENU';
    };

export type PropContextMenu = {
    x: number;
    y: number;
    menuRef: React.RefObject<HTMLDivElement | null>;
    onEditNote: () => void;
    onDeleteNote: () => void;
}

export type AutoResizeTextareaHandle = {
  resetAndFocus: () => void;
};