import { useState } from "react";

export const OpenCloseAlert: any = (estado = true) => {
  let [abierto, setAbierto] = useState(estado);
  const closee = () => setAbierto(false);

  return [abierto, closee];
};
