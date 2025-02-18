"use client";

import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { ProductImage } from '@/components';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideShow.css";


interface Props {
  className?: string;
  images: string[];
  title: string;
}

const SlideShow = ({ className = '', images, title }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  if (images.length === 0) return (
    <div className={`${className}`}>
      <ProductImage
        alt={title}
        width={1024}
        height={800}
        className="rounded-lg object-fill"
      />
    </div>
  )

  return (
    <div className={`${className}`}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                width={1024}
                height={800}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        }

      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                width={300}
                height={300}
                className="rounded-lg object-fill"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
export default SlideShow