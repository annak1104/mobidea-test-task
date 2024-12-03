import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./slider.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Navigation, Thumbs, FreeMode } from "swiper/modules";

import photo1 from "../../assets/images/ronaldo.png";
import photo2 from "../../assets/images/andrii.png";
import photo3 from "../../assets/images/leo.png";
import photo4 from "../../assets/images/jude.png";
import photo5 from "../../assets/images/ronaldinho.png";
import photo6 from "../../assets/images/bruno.png";
import photo7 from "../../assets/images/saka.png";

const photos = [
  { src: photo1, alt: "photo1" },
  { src: photo2, alt: "photo2" },
  { src: photo3, alt: "photo3" },
  { src: photo4, alt: "photo4" },
  { src: photo5, alt: "photo5" },
  { src: photo6, alt: "photo6" },
  { src: photo7, alt: "photo7" },
];

export const Slider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper,
        }}
        spaceBetween={10}
        className="mySwiper2"
        slidesPerView={1}
        loop={true}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img src={photo.src} alt={photo.alt} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={6}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        loop={true}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index}>
            <img src={photo.src} alt={photo.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
