import style from "./Comments.module.css";
import s from "../styles/styles.module.css";
import StarBorderIcon from '@mui/icons-material/StarBorder';

const Comments = () => {
  return (
    <div className={style.background}>
      <h3 className={style.title}>Score users</h3>
      <div className={style.comment_space}>
        <span className={style.comments}>
          <p className={style.com}>By: @Alexandra Araujo</p>
          {/* <StarBorderIcon/> */}
          <p className={style.com}>Comment: "Muy buena app!!!"</p>
          <p></p>
        </span>
        <span className={style.comments}>
          <p className={style.com}>By: @Guglielmo</p>
          <p className={style.com}>Score: 4/5</p>
          <p className={style.com}>Comment: "Esta hermosa"</p>
          <p></p>
        </span>
        <span>
          <p className={style.com}>By: @Manu_Garcia</p>
          <p className={style.com}>Score: 4.5/5</p>
          <p className={style.com}>Comment: "Excelente diseño"</p>
          <p></p>
        </span>
        <span>
          <p className={style.com}>By: @Camilo</p>
          <p className={style.com}>Score: 4/5</p>
          <p className={style.com}>Comment: "Esta hermosa"</p>
          <p></p>
        </span>
        <span>
          <p className={style.com}>By: @fercho</p>
          <p className={style.com}>Score: 4/5</p>
          <p className={style.com}>Comment: "Esta hermosa"</p>
          <p></p>
        </span>
        <span>
          <p className={style.com}>By: @Alejo-Ville</p>
          <p className={style.com}>Score: 4/5</p>
          <p className={style.com}>Comment: "Esta hermosa"</p>
          <p></p>
        </span>
        <span>
          <p className={style.com}>By: @Mily</p>
          <p className={style.com}>Score: 4/5</p>
          <p className={style.com}>Comment: "Esta hermosa"</p>
          <p></p>
        </span>
      </div>
    </div>
  );
};
export default Comments;
