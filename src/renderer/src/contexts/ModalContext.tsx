import { C } from "@renderer/utils.js";
import {
  PropsWithChildren,
  SyntheticEvent,
  createContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNullableContext } from "./utils.js";

function useContent() {
  const [content, setContent] = useState<JSX.Element | null>(null);
  function changeContent(to: typeof content) {
    setContent(to);
  }

  return { content, changeContent };
}

export function Modal() {
  const { content, changeContent } = useModalContext();
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog === null) return;

    if (content !== null) {
      dialog.showModal();
      setIsOpen(true);
    } else {
      dialog.close();
      setIsOpen(false);
    }

    /**
     * Should've known about this...
     * - https://github.com/facebook/react/issues/24399#issuecomment-1104191934
     */
    return () => {
      dialog.close();
    };
  }, [content]);

  function initiateCancel(event: SyntheticEvent<HTMLDialogElement, Event>) {
    event.preventDefault();
    setIsOpen(false);
  }
  function finalizeCancel() {
    if (isOpen) return;
    changeContent(null);
  }

  const cls = C(
    "backdrop:bg-cyan-950/50 dark:backdrop:bg-white/25",
    "bg-transparent",
    "transition backdrop:transition",
    !isOpen && "opacity-0 backdrop:opacity-0",
  );

  return (
    <dialog
      ref={dialogRef}
      className={cls}
      onCancel={initiateCancel}
      onTransitionEnd={finalizeCancel}
    >
      {content}
    </dialog>
  );
}

type ModalValues = {
  content: JSX.Element | null;
  changeContent: (to: JSX.Element | null) => void;
};
const ModalContext = createContext<ModalValues | null>(null);
export function useModalContext() {
  return useNullableContext({ ModalContext });
}
export function ModalProvider(props: PropsWithChildren) {
  const { children } = props;
  const { content, changeContent } = useContent();

  const values = { content, changeContent };
  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
}
