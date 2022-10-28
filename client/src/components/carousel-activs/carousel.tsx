import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector,useDispatch } from 'react-redux/es/exports';
import {useEffect} from "react"
import { getActivos } from '../../redux/actions';
// Import Swiper styles import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 
/*  import 'swiper/css/scrollbar';  */
import "./carousel.css"


type PrivateProps={
  handleSeeMore: any
}

export default function Carousel({handleSeeMore}:PrivateProps) {

  const dispatch:any=useDispatch()
  const activos=useSelector((state:any)=>state.allactivos)
  useEffect(()=>{
    dispatch(getActivos())
  },[dispatch])
  const activosSlice=activos.slice(0, 6);
    return (
      <div >
         <p className='News'>Most relevant Coins</p>
      <div className='contenedor'>
      <div className='swiperr'>
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
      activosSlice && activosSlice.map((el:any)=>{
        return(
          
          <SwiperSlide key={el.name}>
          <div className='ey' key={el._id}>
           <img className='img' src={el.image} alt={el.name}/>
           <h1 className='titulo'>{el.name}</h1>
          
          <div className='text'>
           <p className='price'>Price </p>
          <p className='price1'>{el.current_price === 1 ? el.current_price+",00" :el.current_price} US$</p>
          <div className='mas'>
            <div className='botom'>
            +
            </div>
          </div>
           </div> 
           </div> 
           </SwiperSlide>
           
        )
        
      })
    }
      <SwiperSlide>
      <div className='ey' onClick={()=>handleSeeMore()}>
      <div>
        <p className='seeMore'>Ver mas</p>
        </div> 
        </div> 
      </SwiperSlide> 
    </Swiper>
    </div>
    </div>
    </div>
    );
  }