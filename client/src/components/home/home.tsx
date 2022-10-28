import React, {useEffect,useState} from "react"
import Carousel from "../carousel-activs/carousel"
import CarouselNews from "../crousel-news/carousel"
import "./home.css"

export default function Home(){
    const [seeMore, setSeeMore]=useState(false)


    const handleSeeMore: any=(e:any)=>{
        setSeeMore(true)
    }
    return (
        <div className="home">
            <Carousel 
            handleSeeMore={handleSeeMore}
            />
            {seeMore==false &&  <CarouselNews/>}
       

        </div>
    )

}