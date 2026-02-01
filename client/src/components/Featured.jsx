import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import image1 from '../assets/featuredSection/banner1.png'
import image2 from '../assets/featuredSection/banner2.png'
import image3 from '../assets/featuredSection/banner3.png'
import image4 from '../assets/featuredSection/banner4.png'
import image5 from '../assets/featuredSection/banner5.png'


const images = [image1, image2, image3, image4, image5];

export default function Featured() {
  return (
    <Swiper
      spaceBetween={50}
      // slidesPerView={4}
      navigation={true}
      pagination={{clickable:true}}
      autoplay={{
        delay:3000,
        disableOnInteraction:false
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Pagination, Navigation, Autoplay]}
      className="featured-swiper mb-10"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="pb-10 px-4">
            <img src={img} className="w-full h-[250px] rounded-xl"/>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
