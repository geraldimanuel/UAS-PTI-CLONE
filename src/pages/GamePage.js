import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
	Progress,
	Button,
	ButtonGroup,
	Flex,
	Box,
	Heading,
	Text,
	Image,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import "./GamePage.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
// import { Weather } from "../components/Weather/Weather";

// import { Location } from "../lib/Location";

function DrawerExample() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	return (
		<Flex>
			<Button
				ref={btnRef}
				bg="#D0DCE5"
				borderRadius="30px"
				width="150px"
				onClick={onOpen}
			>
				Pindah tempat
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
					<DrawerHeader>Mau pergi kemana?</DrawerHeader>

					<DrawerBody>
						<Flex
							flexDirection="column"
							gap="10px"
							justifyContent="center"
							alignItems="center"
						>
							<Button bg="#D0DCE5" borderRadius="30px" width="160px">
								Home
							</Button>
							<Button bg="#D0DCE5" borderRadius="30px" width="160px">
								Kampus
							</Button>
							<Button bg="#D0DCE5" borderRadius="30px" width="160px">
								Cafe
							</Button>
							<Button bg="#D0DCE5" borderRadius="30px" width="160px">
								Supermarket
							</Button>
						</Flex>
					</DrawerBody>

					<DrawerFooter>
						<Button
							variant="outline"
							mr={3}
							onClick={onClose}
							bg="#D0DCE5"
							borderRadius="30px"
							width="100px"
						>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}

function GamePage() {
	// DECLARE BUTTON TOGGLE
	const [button, setButton] = useState("");

	// UNTUK CEK TOMBOL APA YANG SEDANG DITEKAN

	const [isClickedTidur, setIsClickedTidur] = useState(true);
	const [isClickedMakan, setIsClickedMakan] = useState(true);
	const [isClickedMain, setIsClickedMain] = useState(true);
	const [isClickedBelajar, setIsClickedBelajar] = useState(true);
	const [isClickedSosial, setIsClickedSosial] = useState(true);

	// DECLARE UNTUK NAIK TURUN STATS
	const [statusMakan, setstatusMakan] = useState(0);
	const [statusMain, setstatusMain] = useState(0);
	const [statusTuru, setstatusTuru] = useState(0);
	const [statusSosial, setstatusSosial] = useState(0);
	const [statusBelajar, setstatusBelajar] = useState(0);

	const updateStatus = (status) => {
		if (status === "") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
		} else if (status === "tidur") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.5); //ini naik
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
		} else if (status === "makan") {
			setstatusMakan((prevCounter) => prevCounter - 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
		} else if (status === "sosial") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.3); //ini naik
		} else if (status === "belajar") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setstatusBelajar((prevCounter) => prevCounter + 0.5); //ini naik
		} else if (status === "main") {
			setstatusMakan((prevCounter) => prevCounter + 0.3);
			setstatusTuru((prevCounter) => prevCounter + 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter - 0.4);
			setstatusSosial((prevCounter) => prevCounter - 0.15); // ini naik
		}
	};

	//WEATHER FUNCTION
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=-6.261180
	&lon=106.616820&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

	const searchLocation = (event) => {
		axios.get(url).then((response) => {
			setData(response.data);
			console.log(response.data);
		});
		setLocation("");
	};

	// tiap 1 detik function sbb akan dijalankan
	useEffect(() => {
		const interval = setInterval(() => {
			updateStatus(button);
			searchLocation();
		}, 500);
		return () => clearInterval(interval);
	});

	// function toggle tidur
	function sleepHandler() {
		setIsClickedMakan(true);
		setIsClickedMain(true);
		setIsClickedBelajar(true);
		setIsClickedSosial(true);

		if (isClickedTidur) {
			setButton("tidur");
		} else {
			setButton("");
		}
		setIsClickedTidur(!isClickedTidur);
	}

	// function toggle makan
	function eatHandler() {
		setIsClickedMain(true);
		setIsClickedBelajar(true);
		setIsClickedSosial(true);
		setIsClickedTidur(true);

		if (isClickedMakan) {
			setButton("makan");
		} else {
			setButton("");
		}
		setIsClickedMakan(!isClickedMakan);
	}

	// function toggle discord
	function discordHandler() {
		setIsClickedMain(true);
		setIsClickedBelajar(true);
		setIsClickedMakan(true);
		setIsClickedTidur(true);

		if (isClickedSosial) {
			setButton("sosial");
		} else {
			setButton("");
		}
		setIsClickedSosial(!isClickedSosial);
	}

	// function toggle belajar
	function belajarHandler() {
		setIsClickedMain(true);
		setIsClickedSosial(true);
		setIsClickedMakan(true);
		setIsClickedTidur(true);

		if (isClickedBelajar) {
			setButton("belajar");
		} else {
			setButton("");
		}
		setIsClickedBelajar(!isClickedBelajar);
	}

	// function toggle main
	function mainHandler() {
		setIsClickedBelajar(true);
		setIsClickedSosial(true);
		setIsClickedMakan(true);
		setIsClickedTidur(true);

		if (isClickedMain) {
			setButton("main");
		} else {
			setButton("");
		}
		setIsClickedMain(!isClickedMain);
	}

	const { loginData, setLoginData } = useContext(UserContext);

	return (
		<Flex
			// bgImage={umn}
			// bgSize="1700px"
			// bgPosition="center"
			// h="100vh"
			// bgRepeat="no-repeat"
			// justifyContent="center"
			alignItems="center"
			p="30px"
		>
			<Box className="avatarGame">
				<Image
					src="https://cdn.discordapp.com/attachments/979290524680847370/980097903785816074/Untitled_design.png"
					objectFit="cover"
					boxSize="400px"
				></Image>
			</Box>
			<Flex
				className="interface"
				width="400px"
				gap="20px"
				flexDirection="column"
			>
				<Box
					className="greetings-weather"
					bg="#EAF0F6"
					p="20px"
					borderRadius="30px"
				>
					<Heading size="lg">Good Morning!</Heading>
					{data.weather ? (
						<Heading size="md">
							{data.weather[0].main} {data.main.temp.toFixed()}°F
						</Heading>
					) : null}
					<Text fontSize="md">{loginData.nama}</Text>
					<Text fontSize="sm" as="i">
						{loginData.jurusan}
					</Text>
					<Box></Box>
				</Box>
				<Box
					className="progress-bar"
					bg="#EAF0F6"
					pt="30px"
					pb="30px"
					ps="30px"
					pe="30px"
					borderRadius="30px"
					display="flex"
					flexDirection="column"
				>
					<Box className="study-bar">
						<Progress
							value={statusBelajar}
							height="25px"
							marginBottom={4}
							aria-valuemin={0}
							aria-valuemax={100}
							bg="white"
							borderRadius="30px"
						/>
					</Box>
					<Box className="main-bar">
						<Progress
							value={50 - statusMakan}
							height="25px"
							marginBottom={2}
							bg="white"
							borderRadius="30px"
						/>
						<Progress
							value={50 - statusMain}
							height="25px"
							marginBottom={2}
							bg="white"
							borderRadius="30px"
						/>
						<Progress
							value={50 - statusTuru}
							height="25px"
							marginBottom={2}
							bg="white"
							borderRadius="30px"
						/>
						<Progress
							value={50 - statusSosial}
							height="25px"
							bg="white"
							borderRadius="30px"
						/>
					</Box>
				</Box>
				<Flex
					className="activity-button-group"
					bg="#EAF0F6"
					borderRadius="30px"
					p="20px"
					flexDirection="row"
					flexWrap="wrap"
					gap="15px"
					justifyContent="center"
				>
					<Button
						id="tombolSleep"
						onClick={sleepHandler}
						bg="#D0DCE5"
						borderRadius="30px"
						width="160px"
					>
						Sleep
					</Button>
					<Button
						id="tombolEat"
						onClick={eatHandler}
						bg="#D0DCE5"
						borderRadius="30px"
						width="160px"
					>
						Eat
					</Button>
					<Button
						id="tombolMain"
						onClick={mainHandler}
						bg="#D0DCE5"
						borderRadius="30px"
						width="160px"
					>
						Main
					</Button>
					<Button
						id="tombolBelajar"
						onClick={belajarHandler}
						bg="#D0DCE5"
						borderRadius="30px"
						width="160px"
					>
						Belajar
					</Button>
					{/* <Button id="tombolMain" onClick={mainHandler}>
						Main
					</Button> */}
				</Flex>
				{/* <Flex
					bg="#EAF0F6"
					// w="400px"
					p="20px"
					borderRadius="30px"
					flexDirection="row"
					flexWrap="wrap"
					gap="15px"
					justifyContent="center"
				>
					<Button bg="#D0DCE5" borderRadius="30px" width="160px">
						Home
					</Button>
					<Button bg="#D0DCE5" borderRadius="30px" width="160px">
						Kampus
					</Button>
					<Button bg="#D0DCE5" borderRadius="30px" width="160px">
						Cafe
					</Button>
					<Button bg="#D0DCE5" borderRadius="30px" width="160px">
						Supermarket
					</Button>
				</Flex> */}
				<Box>
					<DrawerExample />
					<Link to="/">
						<Button borderRadius="30px" width="100px" bg="#D0DCE5">
							Logout
						</Button>
					</Link>
				</Box>
			</Flex>
		</Flex>
	);
}

export default GamePage;
