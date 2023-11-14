import { C, createNewRef } from "@renderer/utils.js";
import { SyntheticEvent, useState } from "react";
import { createNewContext } from "./utils.js";

type Content = JSX.Element;
function useModalState() {
  const [dialogRef, accessDialogRef] = createNewRef<HTMLDialogElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<Content | null>(null);

  function showOnModal(content: Content) {
    setContent(content);
    if (isOpen) return;
    setIsOpen(true);
    accessDialogRef().showModal();
  }
  function closeModal() {
    setIsOpen(false);
  }

  return {
    ...{ dialogRef, accessDialogRef, isOpen, setIsOpen, content, setContent },
    ...{ showOnModal, closeModal },
  };
}

export function Modal() {
  const { dialogRef, accessDialogRef, isOpen, setIsOpen, content, setContent } =
    useModalContext();

  function initiateCancel(event: SyntheticEvent<HTMLDialogElement, Event>) {
    event.preventDefault();
    setIsOpen(false);
  }
  function finalizeCancel() {
    if (isOpen) return;
    setContent(null);
    accessDialogRef().close();
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
  ...useModalState(),
}));
