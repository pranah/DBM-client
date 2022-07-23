import { Box } from "@mui/system";
import styled from "@emotion/styled";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

type ImageProps = {
  left?: string;
  right?: string;
  zIndex?: number;
};

const ImageComponent = styled("img")<ImageProps>`
  width: 121px;
  margin-right: 0.5rem;
`;

const BackgroundCarousel = ({
  children,
  partialVisible,
  visibleSlidesInPc,
  visibleSlidesInMobile,
}) => (
  <Carousel
    // additionalTransfrom={10}
    arrows={false}
    autoPlay={true}
    autoPlaySpeed={3}
    centerMode={false}
    className=""
    containerClass="container-with-dots"
    customTransition="all 3s linear"
    dotListClass=""
    draggable={false}
    focusOnSelect={false}
    infinite
    itemClass=""
    partialVisible={partialVisible}
    // keyBoardControl
    // minimumTouchDrag={80}
    // infiniteLoop
    renderButtonGroupOutside={false}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024,
        },
        items: visibleSlidesInPc,
        partialVisibilityGutter: 25,
      },
      mobile: {
        breakpoint: {
          max: 464,
          min: 0,
        },
        items: visibleSlidesInMobile,
        partialVisibilityGutter: 10,
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 464,
        },
        items: visibleSlidesInPc,
        partialVisibilityGutter: 25,
      },
    }}
    showDots={false}
    sliderClass=""
    slidesToSlide={1}
    // swipeable
    transitionDuration={3000}
  >
    {children}
  </Carousel>
);

export const HomePageCarousel = () => {
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "50%",
          background:
            "linear-gradient(89.85deg, #F5F5F5 0.14%, rgba(245, 245, 245, 0.95) 45.61%, rgba(245, 245, 245, 0.44) 74.6%, rgba(245, 245, 245, 0) 99.45%, rgba(245, 245, 245, 0) 113.74%)",
          position: "absolute",
          left: 0,
          zIndex: 999,
        }}
      ></Box>
      {/* <Box
        sx={{
          px: { xs: 4, sm: 4, md: 0 },
          mt: { xs: 4, sm: 4, md: 0 },
          overflow: "hidden",
          width: "100%",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      > */}
      <BackgroundCarousel
        partialVisible={false}
        visibleSlidesInPc={5}
        visibleSlidesInMobile={3}
      >
        <ImageComponent src="images/image-7.png" />
        <ImageComponent src="images/image-2.png" />
        <ImageComponent src="images/image-3.png" />
        <ImageComponent src="images/image-4.png" />
        <ImageComponent src="images/image-5.png" />
      </BackgroundCarousel>
      {/* </Box> */}
      {/* <Box
        sx={{
          px: { xs: 4, sm: 4, md: 0 },
          mt: { xs: 4, sm: 4, md: 0 },
          overflow: "hidden",
          width: "100%",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      > */}
      <BackgroundCarousel
        partialVisible={true}
        visibleSlidesInPc={4}
        visibleSlidesInMobile={3}
      >
        <ImageComponent left="15%" zIndex={0} src="images/image-2.png" />
        <ImageComponent src="images/image-3.png" />
        <ImageComponent right="15%" zIndex={-1} src="images/image-4.png" />
        <ImageComponent right="15%" zIndex={-1} src="images/image-5.png" />
        <ImageComponent right="15%" zIndex={-1} src="images/image-6.png" />
      </BackgroundCarousel>
      {/* </Box> */}
    </>
  );
};
