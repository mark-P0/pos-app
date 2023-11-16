import { createNewRef } from "@renderer/utils.js";
import { C } from "@renderer/utils/classes.js";
import { SyntheticEvent, useState } from "react";
import { createNewContext } from "./utils.js";

type Content = JSX.Element;
function useModalState() {
  const [dialogRef, accessDialogRef] = createNewRef<HTMLDialogElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<Content | null>(null);
  const [isCancellable, setIsCancellable] = useState(true);

  function showOnModal(content: Content) {
    setContent(content);
    if (isOpen) return;
    setIsOpen(true);
    accessDialogRef().showModal();
  }

  function closeModal() {
    setIsOpen(false);
  }

  function makeModalCancellable(status: boolean) {
    setIsCancellable(status);
  }

  return {
    ...{
      ...{ dialogRef, accessDialogRef },
      ...{ isOpen, setIsOpen },
      ...{ content, setContent },
      isCancellable,
    },
    ...{ showOnModal, closeModal, makeModalCancellable },
  };
}

export function Modal() {
  const state = useModalContext();
  const { dialogRef, accessDialogRef } = state;
  const { isOpen, setIsOpen } = state;
  const { content, setContent } = state;
  const { isCancellable } = state;

  function initiateCancel(event: SyntheticEvent<HTMLDialogElement, Event>) {
    event.preventDefault();
    if (!isCancellable) return;
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
