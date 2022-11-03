import Carousel from "../carousel-activs/carousel";
import CarouselNews from "../crousel-news/carousel";
import Bubble from "../styles/bubbles";
import style from "./home.module.css";
import Sidebar from "../Sidebar/Sidebar";
import VerMas from "../ver_mas_activos/ver_mas_activos";
import { seeMore } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "../styles/button";

export default function Home() {
  /*   const [seeMore, setSeeMore] = useState(false); */
  /*   const handleSeeMore: any = (e: any) => {
    setSeeMore(true);
  }; */
  const dispatch = useDispatch();
  const infoSeeMore = useSelector((state: any) => state.seeMore);

  const handleSeeMore: any = () => {
    dispatch(seeMore());
  };
  const h4 = infoSeeMore;
  return (
    <div className={style.view}>
      <div>
        <Sidebar />
      </div>
      <Bubble color="blue-dark" top="-40%" left="20vh" />
      <div className={style.home}>
        <div>
          <h4 className={style.title}>Most Relevants Coins</h4>
          <Carousel handleSeeMore={handleSeeMore} />
          {h4 === false && <h4 className={style.title}>Most relevant News</h4>}
          {infoSeeMore === false ? <CarouselNews /> : <VerMas />}
        </div>
      </div>
    </div>
  );
}
