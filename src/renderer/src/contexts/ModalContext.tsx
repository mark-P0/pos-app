import { C } from "@renderer/utils.js";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { createNewContext } from "./utils.js";

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
    "overflow-hidden",
    isOpen && "h-full w-full grid place-content-center",
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

export const [useModalContext, ModalProvider] = createNewContext(() => ({
  ...useContent(),
}));
