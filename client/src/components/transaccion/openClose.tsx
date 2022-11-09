import { useState } from "react";

export const OpenClose: any = (estado = false) => {
  let [isOpen, setIsOpen] = useState(estado);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};
