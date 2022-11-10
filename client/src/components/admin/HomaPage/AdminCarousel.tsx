import { Navigation, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import { getDonations } from "../../../redux/actions/index";
// Import Swiper styles import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
/*  import 'swiper/css/scrollbar';  */
import style from "./AdminCarousel.module.css";
import Card from "./FeaturedInfo";
// import numberFormat from '../../utils/numberFormat.js';

type PrivateProps = {
    handleSeeMore: Function;
};

export default function AdminCarousel({ handleSeeMore }: PrivateProps) {
    const dispatch: any = useDispatch();
    const allDonations = useSelector((state: any) => state.donations);

    useEffect(() => {
        dispatch(getDonations());
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
                            <div className={style.seeMore} onClick={() => handleSeeMore()}>
                                <h4>{see === false ? "Ver mas" : "Ver menos"}</h4>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    );
}