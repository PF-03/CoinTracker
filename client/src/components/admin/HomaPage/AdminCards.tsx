import { useSelector, useDispatch } from "react-redux/es/exports";
import { useEffect } from "react";
import { getDonations } from "../../../redux/actions/index";
import "swiper/css/navigation";
import "swiper/css/pagination";
import style from "./AdminCards.module.css";
import Cards from "./FeaturedInfo";

export default function AdminCards() {
    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(getDonations());
    }, [dispatch]);

    return (
        <div>
            <div className={style.contenedor}>
                <div>
                    <Cards />
                </div>
            </div>
        </div>
    );
}