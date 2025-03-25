import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import AuctionCard from '../AuctionCard/AuctionCard';


const AuctionSwiper = ({ items }) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {items.map((item) => (
        <SwiperSlide key={item._id}>
          <AuctionCard item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default AuctionSwiper;
