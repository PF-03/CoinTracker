import Carousel from "../../components/carousel-activs/carousel";
import CarouselNews from "../../components/crousel-news/carousel";
import Bubble from "../../components/styles/bubbles";
import style from "./home.module.css";
import VerMas from "../../components/ver_mas_activos/ver_mas_activos";
import { seeMore } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

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
    <>
      <Bubble color="blue-dark" top="-40%" left="20vh" />
      <div className={style.home}>
        <div>
          <h4 className={style.title}>Most Relevants Coins</h4>
          <Carousel handleSeeMore={handleSeeMore} />
          {h4 === false && <h4 className={style.title}>Most relevant News</h4>}
          {infoSeeMore === false ? <CarouselNews /> : <VerMas />}
        </div>
      </div>
    </>
  );
}
