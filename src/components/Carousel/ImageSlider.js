import React, { useContext } from "react";
import { SliderData } from "./SliderData";
import { Icon } from "@iconify/react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Flex, Box } from "@chakra-ui/core";
import { UserContext } from "lib/UserContext";

const ImageSlider = ({ slides }) => {
	const { current, setCurrent } = useContext(UserContext);
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
		<Flex flexDirection="column" justifyContent="center" alignItems="center">
			<Flex alignItems="center" justifyContent="center">
				<Box>
					<Icon
						icon="ic:round-navigate-before"
						width="30px"
						onClick={() => {
							prevSlide();
						}}
					/>
				</Box>
				<Flex>
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
											src={slide.image}
											alt="travel image"
											className="image"
										/>
									)}
								</Flex>
							);
						})}
					</section>
				</Flex>
				<Box>
					<Icon
						icon="ic:round-navigate-next"
						width="30px"
						onClick={() => {
							nextSlide();
						}}
					/>
				</Box>
			</Flex>
			<Flex>
				{/* <Box p="3px">
					<Icon
						icon="ic:round-navigate-before"
						width="30px"
						onClick={() => {
							prevSlide();
						}}
					/>
				</Box>
				<Box p="3px">
					<Icon
						icon="ic:round-navigate-next"
						width="30px"
						onClick={() => {
							nextSlide();
						}}
					/>
				</Box> */}
			</Flex>
		</Flex>
	);
};

export default ImageSlider;
