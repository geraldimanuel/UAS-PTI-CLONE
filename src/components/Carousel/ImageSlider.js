import React, { useState } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Flex, Box } from "@chakra-ui/core";

const ImageSlider = ({ slides }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}

	return (
		<section className="slider">
			{SliderData.map((slide, index) => {
				return (
					<Flex
						className={index === current ? "slide active" : "slide"}
						key={index}
					>
						{index === current && (
							<img
								width="300px"
								src={slide.image}
								alt="travel image"
								className="image"
							/>
						)}
					</Flex>
				);
			})}
			<FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
			<FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
		</section>
	);
};

export default ImageSlider;
