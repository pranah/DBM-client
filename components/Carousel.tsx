import React, { PureComponent } from "react";
import SlickSlider from "react-slick";

class Slider extends PureComponent {
  state = {
    isClient: false,
  };

  componentDidMount() {
    this.setState((state) => {
      isClient: true;
    });
  }

  render() {
    const { children, responsive, ...rest } = this.props;
    const { isClient } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
    };

    return (
      <SlickSlider
        // {...settings}
        slidesToShow={3}
        infinite
        slidesToScroll={3}
        key={isClient ? "client" : "server"}
        responsive={isClient ? responsive : null}
        {...rest}
      >
        {children}
      </SlickSlider>
    );
  }
}

export default Slider;
