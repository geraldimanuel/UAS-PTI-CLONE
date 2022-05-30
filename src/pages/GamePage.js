import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
	Progress,
	Button,
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
import { Link } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import { Icon } from "@iconify/react";
// import { Weather } from "../components/Weather/Weather";

import { Location } from "../lib/Location";

function GamePage() {
	// const checkAlert = document.getElementById("alertMakan").value;

	// DECLARE BUKA TUTUP DRAWER
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	// DECLARE BUTTON TOGGLE
	const [button, setButton] = useState("");
	const [where, setWhere] = useState("");

	// UNTUK CEK TOMBOL AKTIVITAS APA YANG SEDANG DITEKAN
	const [isClickedTidur, setIsClickedTidur] = useState(true);
	const [isClickedMakan, setIsClickedMakan] = useState(true);
	const [isClickedMain, setIsClickedMain] = useState(true);
	const [isClickedBelajar, setIsClickedBelajar] = useState(true);
	const [isClickedSosial, setIsClickedSosial] = useState(true);

	// UNTUK CEK TOMBOL YANG DITEKAN *biar berubah warna*
	const [warnaSleep, setWarnaSleep] = useState("#D0DCE5");
	const [warnaMakan, setWarnaMakan] = useState("#D0DCE5");
	const [warnaMain, setWarnaMain] = useState("#D0DCE5");
	const [warnaBelajar, setWarnaBelajar] = useState("#D0DCE5");
	const [warnaHome, setWarnaHome] = useState("#D0DCE5");
	const [warnaKampus, setWarnaKampus] = useState("#D0DCE5");
	const [warnaCafe, setWarnaCafe] = useState("#D0DCE5");
	const [warnaSupermarket, setWarnaSupermarket] = useState("#D0DCE5");

	// UNTUK HIDE TOMBOL SESUAI LOKASI
	const [hideSleep, setHideSleep] = useState(true);
	const [hideMakan, setHideMakan] = useState(true);
	const [hideMain, setHideMain] = useState(true);
	const [hideBelajar, setHideBelajar] = useState(true);

	// UNTUK CEK TOMBOL TEMPAT APA YANG SEDANG DITEKAN

	const [isClickedHome, setIsClickedHome] = useState(true);
	const [isClickedKampus, setIsClickedKampus] = useState(true);
	const [isClickedCafe, setIsClickedCafe] = useState(true);
	const [isClickedSupermarket, setIsClickedSupermarket] = useState(true);

	// DECLARE UNTUK NAIK TURUN STATS
	const [statusMakan, setstatusMakan] = useState(0);
	const [statusMain, setstatusMain] = useState(0);
	const [statusTuru, setstatusTuru] = useState(0);
	const [statusSosial, setstatusSosial] = useState(0);
	const [statusBelajar, setstatusBelajar] = useState(0);

	const updateStatus = (status, tempat) => {
		if (status === "" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "tidur" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.5); //ini naik
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "makan" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter - 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "sosial" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.3); //ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "belajar" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setstatusBelajar((prevCounter) => prevCounter + 0.5); //ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "main" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter + 0.3);
			setstatusTuru((prevCounter) => prevCounter + 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter - 0.4);
			setstatusSosial((prevCounter) => prevCounter - 0.15); // ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		}
		// INI RUMAH
		else if (status === "" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "tidur" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.5); //ini naik
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "makan" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter - 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "sosial" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.3); //ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "belajar" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setstatusBelajar((prevCounter) => prevCounter + 0.5); //ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "main" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter + 0.3);
			setstatusTuru((prevCounter) => prevCounter + 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter - 0.4);
			setstatusSosial((prevCounter) => prevCounter - 0.15); // ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		}
		// INI KAMPUS
		else if (status === "" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "tidur" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "makan" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter - 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "sosial" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.3); //ini naik
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "belajar" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setstatusBelajar((prevCounter) => prevCounter + 0.5); //ini naik
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "main" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		}
		// INI CAFE
		else if (status === "" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "tidur" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "makan" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter - 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "sosial" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "belajar" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.3);
			setstatusBelajar((prevCounter) => prevCounter + 0.3); // naik tapi ga secepet di kampus
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(true);
		} else if (status === "main" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter + 0.3);
			setstatusTuru((prevCounter) => prevCounter + 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter - 0.4);
			setstatusSosial((prevCounter) => prevCounter - 0.15); // ini naik
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		}
		// INI SUPERMARKET
		else if (status === "" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "tidur" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "makan" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter - 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "sosial" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
		} else if (status === "belajar" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter + 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.2);
			setstatusMain((prevCounter) => prevCounter + 0.3);
			setstatusSosial((prevCounter) => prevCounter + 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "main" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter + 0.3);
			setstatusTuru((prevCounter) => prevCounter + 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter - 0.4);
			setstatusSosial((prevCounter) => prevCounter - 0.15); // ini naik
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
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
			updateStatus(button, where);
			// searchLocation();
		}, 1000);
		return () => clearInterval(interval);
	});

	// FUNCTION UNTUK ALERT
	// function Alert() {
	// 	if (checkAlert === 25) {
	// 		alert("you're hungry");
	// 	}
	// }

	// FUNCTION TOGGLE PINDAH TEMPAT
	// function toggle rumah
	function toggleHouse() {
		setIsClickedKampus(true);
		setIsClickedCafe(true);
		setIsClickedSupermarket(true);

		if (isClickedHome) {
			setWhere("rumah");
		} else {
			setWhere("");
		}
		setIsClickedHome(!isClickedHome);
	}

	// function toggle kampus
	function toggleKampus() {
		setIsClickedHome(true);
		setIsClickedCafe(true);
		setIsClickedSupermarket(true);

		if (isClickedKampus) {
			setWhere("kampus");
			// setHideSleep(false);
			// setHideMain(false);
			// setWarnaKampus("#8FC3EE");
		} else {
			setWhere("");
			// setHideSleep(true);
			// setHideMain(true);
			// setWarnaKampus("#D0DCE5");
		}
		setIsClickedKampus(!isClickedKampus);
	}

	// function toggle cafe
	function toggleCafe() {
		setIsClickedHome(true);
		setIsClickedKampus(true);
		setIsClickedSupermarket(true);

		if (isClickedCafe) {
			setWhere("cafe");
			// setHideSleep(false);
			// setWarnaCafe("#8FC3EE");
		} else {
			setWhere("");
			// setHideSleep(true);
			// setWarnaCafe("#D0DCE5");
		}
		setIsClickedCafe(!isClickedCafe);
	}

	// function toggle supermarket
	function toggleSupermarket() {
		setIsClickedHome(true);
		setIsClickedKampus(true);
		setIsClickedCafe(true);

		if (isClickedSupermarket) {
			setWhere("supermarket");
		} else {
			setWhere("");
		}
		setIsClickedSupermarket(!isClickedSupermarket);
	}

	// function toggle tidur
	function sleepHandler() {
		setIsClickedMakan(true);
		setIsClickedMain(true);
		setIsClickedBelajar(true);
		setIsClickedSosial(true);

		if (isClickedTidur) {
			setButton("tidur");
			setWarnaSleep("#8FC3EE");
		} else {
			setButton("");
			setWarnaSleep("#D0DCE5");
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
			setWarnaMakan("#8FC3EE");
		} else {
			setButton("");
			setWarnaMakan("#D0DCE5");
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
			// setWarnaSosial("#8FC3EE");
		} else {
			setButton("");
			// setWarnaSosial("#D0DCE5");
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
			setWarnaBelajar("#8FC3EE");
		} else {
			setButton("");
			setWarnaBelajar("#D0DCE5");
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
			setWarnaMain("#8FC3EE");
		} else {
			setButton("");
			setWarnaMain("#D0DCE5");
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
			flexDirection={{ base: "column", md: "row" }}
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
						<Heading size="md" color="#0B66AE">
							{data.weather[0].main} {data.main.temp.toFixed()}°F
						</Heading>
					) : null}
					<Text fontSize="md">{loginData.nama}</Text>
					<Text fontSize="sm" as="i">
						{loginData.jurusan}
					</Text>
					<Box></Box>
				</Box>
				<Flex
					className="progress-bar"
					bg="#EAF0F6"
					p="30px"
					borderRadius="30px"
					flexDirection="column"
					gap={4}
				>
					<Flex className="study-bar" alignItems="center" gap="5px">
						<Icon icon="fa-solid:book-reader" color="#0b66ae" width="25px" />
						<Progress
							value={statusBelajar}
							height="25px"
							aria-valuemin={0}
							aria-valuemax={100}
							bg="white"
							borderRadius="30px"
							icon="fa-solid:book-reader"
							w="full"
						/>
					</Flex>
					<Flex className="main-bar" gap={2} flexDirection="column" pe="150px">
						<Flex alignItems="center" gap="5px">
							<Icon
								icon="icomoon-free:spoon-knife"
								color="#0b66ae"
								width="25px"
							/>
							<Progress
								value={50 - statusMakan}
								height="25px"
								bg="white"
								borderRadius="30px"
								id="alertMakan"
								w="full"
							/>
						</Flex>
						<Flex alignItems="center" gap="5px">
							<Icon
								icon="icon-park-solid:game-three"
								color="#0b66ae"
								width="25px"
							/>
							<Progress
								value={50 - statusMain}
								height="25px"
								bg="white"
								borderRadius="30px"
								w="full"
							/>
						</Flex>
						<Flex alignItems="center" gap="5px">
							<Icon
								icon="icon-park-solid:sleep-two"
								color="#0b66ae"
								width="25px"
							/>
							<Progress
								value={50 - statusTuru}
								height="25px"
								bg="white"
								borderRadius="30px"
								w="full"
							/>
						</Flex>
						<Flex alignItems="center" gap="5px">
							<Icon
								icon="healthicons:group-discussion-meeting"
								color="#0b66ae"
								width="25px"
							/>
							<Progress
								value={50 - statusSosial}
								height="25px"
								bg="white"
								borderRadius="30px"
								w="full"
							/>
						</Flex>
					</Flex>
				</Flex>
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
					{hideSleep && (
						<Button
							id="tombolSleep"
							onClick={sleepHandler}
							bg={warnaSleep}
							borderRadius="30px"
							width="160px"
						>
							Sleep
						</Button>
					)}
					{hideMakan && (
						<Button
							id="tombolEat"
							onClick={eatHandler}
							bg={warnaMakan}
							borderRadius="30px"
							width="160px"
						>
							Eat
						</Button>
					)}
					{hideMain && (
						<Button
							id="tombolMain"
							onClick={mainHandler}
							bg={warnaMain}
							borderRadius="30px"
							width="160px"
						>
							Main
						</Button>
					)}
					{hideBelajar && (
						<Button
							id="tombolBelajar"
							onClick={belajarHandler}
							bg={warnaBelajar}
							borderRadius="30px"
							width="160px"
						>
							Belajar
						</Button>
					)}
					{/* <Button id="tombolMain" onClick={mainHandler}>
							Main
						</Button> */}
				</Flex>
				<Flex
					bg="#EAF0F6"
					borderRadius="30px"
					p="20px"
					flexDirection="row"
					flexWrap="wrap"
					gap="15px"
					justifyContent="center"
				>
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
										<Button
											bg={warnaHome}
											borderRadius="30px"
											width="160px"
											onClick={toggleHouse}
										>
											Home
										</Button>
										<Button
											bg={warnaKampus}
											borderRadius="30px"
											width="160px"
											onClick={toggleKampus}
										>
											Kampus
										</Button>
										<Button
											bg={warnaCafe}
											borderRadius="30px"
											width="160px"
											onClick={toggleCafe}
										>
											Cafe
										</Button>
										<Button
											bg={warnaSupermarket}
											borderRadius="30px"
											width="160px"
											onClick={toggleSupermarket}
										>
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
					<Link to="/">
						<Button
							borderRadius="30px"
							width="150px"
							bg="#DD9A9A"
							color="#C25050"
						>
							Logout
						</Button>
					</Link>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default GamePage;
