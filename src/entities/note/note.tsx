import Form from "@/entities/note/form";
import ContextMenu from "./contextMenu";
import {
  type Note,
  type MenuAction,
  type MenuState,
  type AutoResizeTextareaHandle,
  type NoteState,
  type NoteAction,
} from "./model/types";
import { useEffect, useRef, useReducer } from "react";

const container = "flex flex-col items-center w-full min-h-screen";
const noteContainer = "flex flex-col  pt-[10px] pb-[30px] gap-[15px] w-fit";
const headerNote = "flex flex-col items-center gap-[15px] w-[350px]";
const headerNoteBtn = "flex flex-row gap-[10px]";
const btnCreate =
  "flex uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer";
const btnClear =
  "flex uppercase px-6 py-2 text-[#1976d3] bg-white border-[1px] border-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium transition-all duration-200 hover:border-[#1976d3]/50 hover:text-[#1976d3]/50 cursor-pointer";
const formContainer = "flex flex-col gap-[10px] w-full";
const btnClose =
  "flex self-center uppercase px-6 py-2 text-white bg-[#1976d3] rounded-[5px] font-[Roboto, sans-serif] font-medium w-fit transition-all duration-200 hover:bg-white hover: border-[#1976d3] hover: border-[1px] hover:text-[#1976d3] cursor-pointer";
const arrContainer = "flex flex-col gap-[20px] px-[20px] w-full";

// item Note in progress
const itemNote = "flex flex-col border-y-[1px]  bg-[#1976d3]/80 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px]";
const itemNoteHeader = "flex flex-col gap-[10px]";
const itemNoteTitle = "text-white text-[32px] font-[Roboto, sans-serif] font-medium";
const itemNoteContent = "text-white text-[16px] font-[Roboto, sans-serif] ";
const itemNoteDate = "text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end";

// item Note completed
const itemNoteCompleted = "flex flex-col border-y-[1px]  bg-[#1976d3]/80 px-[30px] py-[10px] rounded-[15px] overflow-hidden gap-[5px]";
const itemNoteHeaderCompleted = "flex flex-col gap-[10px]";
const itemNoteTitleCompleted = "text-white text-[32px] font-[Roboto, sans-serif] font-medium";
const itemNoteContentCompleted = "text-white text-[16px] font-[Roboto, sans-serif] ";
const itemNoteDateCompleted = "text-white/50 text-[12px] font-[Roboto, sans-serif] font-bold text-end";

const arrEmpty = "flex flex-col items-center opacity-50";

// reducer для заметок

const initialStateNote: NoteState = {
  isOpen: false,
  note: [],
  title: "",
  text: "",
  status: true,
};

function reducerNote(state: NoteState, action: NoteAction): NoteState {
  switch (action.type) {
    case "OPEN_FORM":
      return {
        ...state,
        isOpen: true,
      };
    case "SET_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "SET_TEXT":
      return {
        ...state,
        text: action.payload,
      };
    case "SAVE_NOTE":
      return {
        ...state,
        note: [
          ...state.note,
          {
            id: Date.now().toString(),
            createdAt: new Date(),
            content: action.payload.text,
            title: action.payload.title,
            status: 'inprogress',
          },
        ],
        title: "",
        text: "",
        isOpen: false,
      };
    case "CLEAR_FORM":
      return {
        ...state,
        title: "",
        text: "",
      };
    case "CLOSE_FORM":
      return {
        ...state,
        title: "",
        text: "",
        isOpen: false,
      };
    case "CLEAR_NOTES":
      return {
        ...state,
        note: [],
      };
    case "DELETE_NOTE":
      return {
        ...state,
        note: [...state.note.filter((n) => n.id !== action.payload.id)],
      };
    case "EDIT_NOTE":
      return {
        ...state,
        note: [
          ...state.note.map((n) =>
            n.id === action.payload.id
              ? {
                  ...n,
                  title: action.payload.title,
                  content: action.payload.content,
                  createdAt: action.payload.createdAt,
                }
              : n,
          ),
        ],
      };
    case "SET_STATUS_INPROGRESS":
      return {
        ...state,
        note: [
          ...state.note.map((n) =>
            n.id === action.payload.id
              ? {
                  ...n,
                  status: 'inprogress' as const,
                }
              : n,
          ),
        ],
      };

    case "SET_STATUS_COMPLETED":
      return {
        ...state,
        note: [
          ...state.note.map((n) =>
            n.id === action.payload.id
              ? {
                  ...n,
                  status: 'completed' as const,
                }
              : n,
          ),
        ],
      };
  }
}

// reducer для контекстного меню

const initialState: MenuState = {
  isOpenMenu: false,
  coord: null,
  noteItem: null,
};

function reducer(state: MenuState, action: MenuAction): MenuState {
  switch (action.type) {
    case "OPEN_MENU":
      return {
        ...state,
        isOpenMenu: true,
        coord: action.payload.coord,
        noteItem: action.payload.noteItem,
      };
    case "HIDE_MENU":
      return {
        ...state,
        isOpenMenu: false,
        coord: null,
      };
    case "CLOSE_MENU":
      return {
        ...state,
        isOpenMenu: false,
        coord: null,
        noteItem: null,
      };

    default:
      return state;
  }
}

export default function Note() {
  // useReducer Note
  const [stateNote, dispatchNote] = useReducer(reducerNote, initialStateNote);

  // useReducer ContexMenu

  const auto = useRef<AutoResizeTextareaHandle | null>(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  function onCreate() {
    dispatchNote({
      type: "SAVE_NOTE",
      payload: { title: stateNote.title, text: stateNote.text },
    });
  }

  function setTiTle(value: string) {
    dispatchNote({
      type: "SET_TITLE",
      payload: value,
    });
  }

  function setText(value: string) {
    dispatchNote({
      type: "SET_TEXT",
      payload: value,
    });
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!stateNote.title.trim() || !stateNote.text.trim()) return;
    if (state.noteItem) {
      onEditNote();
    } else {
      onCreate();
    }
    dispatchNote({ type: "CLOSE_FORM" });
  }

  function handleCleanNotes() {
    dispatchNote({ type: "CLEAR_NOTES" });
    // setNote([]);
  }

  function handleClearForm() {
    dispatchNote({ type: "CLEAR_FORM" });
    // setTitle('');
    auto.current?.resetAndFocus();
  }

  // Контекстне меню
  function onContextMenu(e: React.MouseEvent<HTMLDivElement>, item: Note) {
    e.preventDefault();
    dispatch({
      type: "OPEN_MENU",
      payload: {
        coord: { x: e.clientX, y: e.clientY },
        noteItem: item,
      },
    });
  }

  function onEditNote() {
    dispatch({ type: "HIDE_MENU" });
    dispatchNote({ type: "OPEN_FORM" });
    if (state.noteItem) {
      dispatchNote({
        type: "SET_TITLE",
        payload: state.noteItem?.title,
      });
      dispatchNote({
        type: "SET_TEXT",
        payload: state.noteItem?.content,
      });
    }
  }

  function onDeleteNote(item: Note) {
    dispatch({ type: "CLOSE_MENU" });
    dispatchNote({
      type: "DELETE_NOTE",
      payload: { id: item.id },
    });
  }

  function onSetStatusCompleted(item: Note) {
    dispatchNote({
      type: "SET_STATUS_COMPLETED",
      payload: { id: item.id },
    });
    dispatch({ type: "CLOSE_MENU" });
  }

  function onSetStatusInprogress(item: Note) {
    dispatchNote({
      type: "SET_STATUS_INPROGRESS",
      payload: { id: item.id },
    });
    dispatch({ type: "CLOSE_MENU" });
  }

  // Закриття контекстного меню
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!state.isOpenMenu) return;

    function onCloseMenu(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        console.log("Close menu");
        dispatch({ type: "CLOSE_MENU" });
      }
    }

    document.addEventListener("click", onCloseMenu);

    return () => {
      document.removeEventListener("click", onCloseMenu);
    };
  }, [state.isOpenMenu]);

  return (
    <div className={container}>
      <div className={noteContainer}>
        {stateNote.isOpen ? (
          <div className={headerNote}>
            <div className={headerNoteBtn}>
              <button className={btnCreate} type="submit" form="note-form">
                Save
              </button>
              <button className={btnClear} onClick={handleClearForm}>
                Clear
              </button>
            </div>
            <div className={formContainer}>
              <Form
                title={stateNote.title}
                text={stateNote.text}
                setTitle={setTiTle}
                setText={setText}
                onSubmit={handleSubmit}
                auto={auto}
              />
              <button
                className={btnClose}
                onClick={() => dispatchNote({ type: "CLOSE_FORM" })}
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className={headerNote}>
            <div className={headerNoteBtn}>
              <button
                className={btnCreate}
                onClick={() => dispatchNote({ type: "OPEN_FORM" })}
              >
                Create
              </button>
              <button className={btnClear} onClick={handleCleanNotes}>
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={arrContainer}>
        {stateNote.note.length !== 0 ? (
          stateNote.note.map((item) => (
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
        {state.isOpenMenu && state.coord && state.noteItem ? (
          <ContextMenu
            x={state.coord.x}
            y={state.coord.y}
            menuRef={menuRef}
            onDeleteNote={() => onDeleteNote(state.noteItem!)}
            onEditNote={() => onEditNote()}
            onSetStatusCompleted={() => onSetStatusCompleted(state.noteItem!)}
            onSetStatusInprogress={() => onSetStatusInprogress(state.noteItem!)}
            status={state.noteItem.status === 'inprogress'}
          />
        ) : null}
      </div>
    </div>
  );
}
