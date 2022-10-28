import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useEffect } from "react"
import { getActivos } from '../../redux/actions';
// Import Swiper styles import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
/*  import 'swiper/css/scrollbar';  */
import style from "./carousel.module.css"
import Card from '../card/card';


type PrivateProps = {
  handleSeeMore: Function
}

export default function Carousel({ handleSeeMore }: PrivateProps ) {

  const dispatch: any = useDispatch()
  const activos = useSelector((state: any) => state.allActivos)
  const activosSlice = activos.slice(0, 6);

  useEffect(() => {
    dispatch(getActivos())
  }, [dispatch])

  return (
    <div>
      <div className={style.contenedor}>
        <div>
          <Swiper
            // install Swiper modules
            modules={[Navigation, /* Scrollbar */ A11y]}
            spaceBetween={36}
            slidesPerView={3.5}
            navigation
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {
              activosSlice && activosSlice.map((el: coinInfo) => <SwiperSlide key={el.name}><Card _id={el._id} name={el.name} image={el.image} current_price={el.current_price} /></SwiperSlide>)
            }
            <SwiperSlide>
              <div className={style.seeMore} onClick={() => handleSeeMore()}>
                  <h4>Ver mas</h4>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}