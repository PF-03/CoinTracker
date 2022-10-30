import style from "./card.module.css";
import s from "../styles/styles.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Card({ name, id, image, current_price }: coinInfo) {
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate(`/crypto/${id}`);
  };
  return (
    <div className={`${s.card} ${style.card}`} key={id}>
      <div className={style.img}>
        <img src={image} alt={name} />
      </div>
      <h6 className={style.titulo} onClick={() => handleOnClick(id)}>
        {name}
      </h6>

      <div className={style.CardText}>
        <p className={style.priceTitle}>
          <b>Price</b>
        </p>
        <p className={style.price}>
          {current_price === 1 ? current_price + ",00" : current_price} USD$
        </p>
        <div className={style.buttonContainer}>
          <button
            className={`${s.card} ${style.button}`}
            onClick={() => handleOnClick(id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path fill="white" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
