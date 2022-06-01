import React, { useState, useEffect, useContext } from "react";
import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Flex, Box } from "@chakra-ui/core";
import { UserContext } from "lib/UserContext";

const ImageSlider = ({ slides }) => {
	const { current, setCurrent } = useContext(UserContext);
	const length = slides.length;

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		console.log(current);
	// 	}, 1000);
	// 	return () => clearInterval(interval);
	// });

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
		<Flex flexDirection="column" justifyContent="center" alignItems="center">
			<section className="slider">
				{SliderData.map((slide, index) => {
					return (
						<Flex
							className={index === current ? "slide active" : "slide"}
							key={index}
							// onClick={nextSlide}
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
			</section>
			<Flex>
				<Box p="10px">
					<FaArrowAltCircleLeft
						className="left-arrow"
						onClick={() => {
							prevSlide();
							// console.log(current);
						}}
					/>
				</Box>
				<Box p="10px">
					<FaArrowAltCircleRight
						className="right-arrow"
						onClick={() => {
							nextSlide();
							// console.log(current);
						}}
					/>
				</Box>
			</Flex>
		</Flex>
	);
};

export default ImageSlider;
