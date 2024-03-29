import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { slides } from '../../constants';
import './Carousel.css';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    cssEase: 'ease',
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="p-4 focus:outline-none">
            <img src={slide.photo} alt={slide.description} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
