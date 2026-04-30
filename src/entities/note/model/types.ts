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
    auto: React.RefObject<AutoResizeTextareaHandle | null>,
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

export type NoteState = {
  isOpen: boolean,
  note: Note[],
  title: string,
  text: string,
};

export type NoteAction = 
| {
  type: 'OPEN_FORM',
}
| {
  type: 'SET_TITLE',
  payload: string,
}
| {
  type: 'SET_TEXT',
  payload: string,
}
| {
  type: 'SAVE_NOTE',
  payload: {title: string, text: string}
}
| {
  type: 'CLEAR_FORM',
}
| {
  type: 'CLOSE_FORM',
}
| {
  type: 'CLEAR_NOTES'
}
|{
  type: 'DELETE_NOTE',
  payload: {id: string}
}
|{
  type: 'EDIT_NOTE',
  payload: {id: string, title: string, content: string, createdAt: Date},
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