import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function Verifiqued() {
  const params = useParams();
  const token = params.token;
  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    axios.get("http://localhost:3001/verifiqued/" + token);
  }, [token]);

  return (
    <div>
      <h1>Mail verificado</h1>
    </div>
  );
}
