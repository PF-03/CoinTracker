import { useState } from "react";
import Carousel from "../carousel-activs/carousel";
import CarouselNews from "../crousel-news/carousel";
import Bubble from "../styles/bubbles";
import style from "./home.module.css";
import Sidebar from "../Sidebar/Sidebar";

export default function Home() {
  const [seeMore, setSeeMore] = useState(false);
  const handleSeeMore: any = (e: any) => {
    setSeeMore(true);
  };
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

          <h4 className={style.title}>Most relevant News</h4>
          {!seeMore && <CarouselNews />}
        </div>
      </div>
    </div>
  );
}
