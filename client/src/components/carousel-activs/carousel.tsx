import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import { getActivos } from "../../redux/actions";
// Import Swiper styles import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
/*  import 'swiper/css/scrollbar';  */
import style from "./carousel.module.css";
import Card from "../card/card";
import numberFormat from "../../utils/numberFormat.js";


export default function Carousel() {
  const dispatch: any = useDispatch();
  const activos = useSelector((state: any) => state.allactivos);
  const see = useSelector((state: any) => state.seeMore);
  const activosSlice = activos.slice(0, 6);
  console.log(activos);
  useEffect(() => {
    dispatch(getActivos());
  }, [dispatch]);

  return (
    <div>
      <div className={style.contenedor}>
        <div>
          <Swiper
            // install Swiper modules
            modules={[Navigation, /* Scrollbar */ A11y]}
            slidesOffsetAfter={50}
            slidesPerView={3.5}
            navigation
            scrollbar={{ draggable: true }}
          >
            {activosSlice.length > 0 &&
              activosSlice !== "error" &&
              activosSlice?.map((el: coinInfo) => (
                <SwiperSlide key={el.name}>
                  <Card
                    id={el.id}
                    name={el.name}
                    image={el.image}

                    current_price={numberFormat(el.current_price, 'standard', 'decimal')}

                  />
                </SwiperSlide>
              ))}
            <SwiperSlide>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
