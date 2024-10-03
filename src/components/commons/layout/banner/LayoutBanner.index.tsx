import { SliderItem, Wrapper } from "./LayoutBanner.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LayoutBanner(): JSX.Element {
  const setting = {
    dots: true, // 사진아래 동그란 부분
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한 번에 슬라이드 이미지 보는 수
    slidesRToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return (
    <Wrapper>
      <Slider {...setting}>
        <SliderItem src="/images/Banner/banner 01.png" />

        <SliderItem src="/images/Banner/banner 02.png" />

        <SliderItem src="/images/Banner/banner 03.png" />

        <SliderItem src="/images/Banner/banner 04.png" />
      </Slider>
    </Wrapper>
  );
}
