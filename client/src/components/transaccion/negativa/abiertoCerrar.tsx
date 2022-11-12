import { useState } from "react";

export const AbiertoCerrar: any = (estado = false) => {
  let [abierto, setAbierto] = useState(estado);
  const abrir = () => {
    setAbierto(true);
  };
  const cerrado = () => {
    setAbierto(false);
  };

  return [abierto, abrir, cerrado];
};
