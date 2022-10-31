import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import { getNews } from "../../redux/actions";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
/* import 'swiper/css/scrollbar'; */
import styles from "./carousel.module.css";
import NewsCard from "../card/newsCard";

export default function CarouselNews() {
  const dispatch: any = useDispatch();
  const newss = useSelector((state: any) => state.newsAll);
  let key1: number = 9903;
  const newssSlice = newss?.slice(0, 10);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  return (
    <div>
      <div className={styles.contenedor}>
        <div className="swiperr">
          <Swiper
            // install Swiper modules
            modules={[Navigation, /* Scrollbar */ A11y]}
            spaceBetween={46}
            slidesPerView={2.2}
            navigation
            /* scrollbar={{ draggable: true }} */
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {newssSlice.length > 0 &&
              newssSlice !== "error" &&
              newssSlice.map((el: any) => (
                <SwiperSlide key={key1++}>
                  <NewsCard
                    _id={el._id}
                    image={el.image}
                    name={el.name}
                    title={el.title}
                  />{" "}
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
