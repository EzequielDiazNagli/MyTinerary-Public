// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../style/style.css";

import {useSelector} from 'react-redux'

// import required modules
import { Autoplay, Grid, Pagination, Navigation } from "swiper";



function Carousel() {
  const citiesRedux = useSelector(store => store.citiesReducer.cities)
  return (
    <>
      <Swiper
        slidesPerView={2}
        grid={{
          rows: 2
        }}
        spaceBetween={20}
        slidesPerGroup={2}
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Autoplay, Grid, Pagination, Navigation]}
        className="mySwiper"
      >
        {citiesRedux.map(citiesRedux =>
        <SwiperSlide key={citiesRedux._id} style={{backgroundImage:`url("${citiesRedux.image}")`, backgroundSize: "cover"}}>
          <div className="city-name">
            <h4>{citiesRedux.name}</h4>
            <h5>{citiesRedux.country}</h5>
          </div>
        </SwiperSlide>)}
      </Swiper>
    </>
  );
}

// const mapDispatchToProps = {
//   getCities: citiesActions.getCities,
// }

// const mapStateToProps = (state) => {
//   return {
//     cities: state.citiesReducer.cities,
//     auxiliar: state.citiesReducer.auxiliar
//   }
// }
// (mapStateToProps, null)(Carousel)

export default Carousel