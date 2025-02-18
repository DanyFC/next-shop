"use client";

import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import ProductImage from "../product-image/ProductImage";
import "./slideShow.css";

interface Props {
  className?: string;
  images: string[];
  title: string;
}

const SlideShow = ({ className = '', images, title }: Props) => {

  if (images.length === 0) return (
    <div className={`${className}`}>
      <ProductImage
        alt={title}
        width={600}
        height={500}
        className="rounded-lg object-fill"
      />
    </div>
  )

  return (
    <div className={`${className}`}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination={true}
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {
          images.map(image => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                width={600}
                height={500}
                className="object-fill"
              />
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  )
}
export default SlideShow