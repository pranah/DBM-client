import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { IconButton } from "@mui/material";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 20,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const CustomRightArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <IconButton
      color="secondary"
      sx={{ position: "absolute", right: "1px", zIndex: 1000 }}
      onClick={() => onClick()}
      aria-label="Go to next slide"
    >
      <ArrowForwardIosOutlinedIcon sx={{ fontSize: "3rem", color: "#fff" }} />
    </IconButton>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <IconButton
      color="secondary"
      sx={{ position: "absolute", left: "1px", zIndex: 1000 }}
      onClick={() => onClick()}
      aria-label="Go to previous slide"
    >
      <ArrowBackIosOutlinedIcon sx={{ fontSize: "3rem", color: "#fff" }} />
    </IconButton>
  );
};

export const ProductCarousel = ({ children }) => (
  <Carousel
    swipeable={false}
    draggable={false}
    showDots={false}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    infinite={false}
    autoPlaySpeed={1000}
    keyBoardControl={true}
    partialVisible
    customTransition="all 0.5s ease-in-out"
    transitionDuration={500}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
    customRightArrow={<CustomRightArrow />}
    customLeftArrow={<CustomLeftArrow />}
  >
    {children}
  </Carousel>
);
