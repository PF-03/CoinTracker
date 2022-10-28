import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { useSelector,useDispatch } from 'react-redux/es/exports';
import {useEffect} from "react"
import { getNews } from '../../redux/actions';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
/* import 'swiper/css/scrollbar'; */
import "./carousel.css"
import image from "../../img/vermas.png"

export default function CarouselNews() {
  const dispatch:any=useDispatch()
  const newss=useSelector((state:any)=>state.newsAll)
  let key1:number=9903
  useEffect(()=>{
    dispatch(getNews())
  },[dispatch])
 const newssSlice=newss.slice(0,10)

    return (
      <div >
         <p className='News'>Most relevant News</p>
      <div className='contenedor1'>
      <div className='swiperr'>
      <Swiper
      // install Swiper modules
      modules={[Navigation, /* Scrollbar */ A11y]}
      spaceBetween={46}
      slidesPerView={2.2}
      navigation 
      /* scrollbar={{ draggable: true }} */
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
    
       
     {
      newssSlice && newssSlice.map((el:any)=>{
        return(
          
          <SwiperSlide key={key1++}>
          <div className='ey1' key={el._id}>
            <div className='div-img'>
           <img className='imge' src={el.image} alt={el.name}/>
          <div className='text1'>
          <p>{el.title}</p> 
          <div className='masNews'>
            <div className='botomNews'>
            +
            </div>
          </div>
          
           </div> 
           </div>
           </div> 
           </SwiperSlide>
           
        )
        
      })
    }
     
    </Swiper>
    </div>
    </div>
    </div>
    );
  }