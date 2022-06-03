import React from "react";
import {
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Button,
	useDisclosure,
	Heading,
	Box,
	Text,
} from "@chakra-ui/react";

function News() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		fetch(
			"https://newsapi.org/v2/top-headlines?country=id&apiKey=169c0cc2f63b475fb0236c42e4777cfd"
		)
			.then((res) => res.json())
			.then((res) => setData(res.articles));
	}, []);

	return (
		<>
			<Button
				ref={btnRef}
				onClick={onOpen}
				borderRadius="30px"
				width={{ md: "160px", base: "300px" }}
				bgColor="#B4EBC7"
				color="#519D6B"
			>
				News
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Heading>News</Heading>
					</DrawerHeader>

					<DrawerBody>
						{data.map((item) => (
							<Box
								key={item.title}
								bg="#EAF0F6"
								borderRadius="30px"
								p={4}
								marginBottom="10px"
							>
								<Heading size="sm" color="#467090" mb="5px">
									{item.title}
								</Heading>
								<Text>{item.description}</Text>
							</Box>
						))}
					</DrawerBody>

					<DrawerFooter>
						<Button
							borderRadius="30px"
							width="100px"
							bg="#DD9A9A"
							color="#C25050"
							mr={3}
							onClick={onClose}
						>
							Close
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}

export default News;
