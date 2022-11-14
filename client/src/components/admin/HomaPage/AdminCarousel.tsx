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
// import numberFormat from '../../utils/numberFormat.js'
import featuredInfo from "./FeaturedInfo";



export default function AdminCarousel() {
    const dispatch: any = useDispatch();


    useEffect(() => {
        dispatch(getDonations());
    }, [dispatch]);

    const allDonations = useSelector((state: any) => state.donations);

    return (
        <div>
            <div className={style.contenedor}>
                <div>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, /* Scrollbar */ A11y]}
                        slidesOffsetAfter={50}
                        slidesPerView={2}
                        navigation
                        scrollbar={{ draggable: true }}
                    >
                        <SwiperSlide >
                            <Card />
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>
        </div>
    );
}