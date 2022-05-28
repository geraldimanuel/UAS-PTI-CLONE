import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
	Progress,
	Button,
	ButtonGroup,
	Flex,
	Box,
	Spacer,
	extendTheme,
	Heading,
	Text,
	Image,
} from "@chakra-ui/react";
import "./GamePage.css";
import { Link } from "react-router-dom";
// impoAt app from "./components/App";
import App from "./LoginPage";
import { isConstructorDeclaration } from "typescript";
import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
// import { clearInterval } from "timers";
import umn from "../Assets/pictures/umn.jpg";
import avatar from "../Assets/pictures/avatar.png";

const theme = extendTheme({
	textStyles: {
		h1: {
			fontWeight: "bold",
		},
	},
});

function GamePage(props) {
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

	// tiap 1 detik function sbb akan dijalankan
	useEffect(() => {
		const interval = setInterval(() => {
			updateStatus(button);
		}, 1000);
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
			<Box className="interface">
				<Box
					className="greetings-weather"
					bg="#EAF0F6"
					w="400px"
					p="20px"
					marginBottom="20px"
					borderRadius="30px"
				>
					<Heading size="lg">Good Morning!</Heading>
					<Heading size="md" marginBottom="20px" color="#0B66AE">
						Cloudy 30°C
					</Heading>
					<Text>{loginData.nama}</Text>
					<Text as="i">{loginData.jurusan}</Text>
				</Box>
				<Box
					className="progress-bar"
					bg="#EAF0F6"
					w="400px"
					p="40px"
					borderRadius="30px"
					marginBottom="10px"
					marginTop="20px"
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
				<Box
					className="activity-button-group"
					bg="#EAF0F6"
					borderRadius="30px"
					w="400px"
					p="20px"
					display="flex"
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
						id="tombolDiscord"
						onClick={discordHandler}
						bg="#D0DCE5"
						borderRadius="30px"
						width="160px"
					>
						Discord
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
				</Box>
				{/* <ButtonGroup spacing="6">
								<Button>Home</Button>
								<Button>Kampus</Button>
								<Button>Cafe</Button>
								<Button>Supermarket</Button>
								<Link to="/">
									<Button>Logout</Button>
								</Link>
							</ButtonGroup> */}
			</Box>
		</Flex>
	);
}

export default GamePage;
