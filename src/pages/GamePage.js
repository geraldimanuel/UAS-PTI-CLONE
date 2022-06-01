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
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	AlertDialogCloseButton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import { Icon } from "@iconify/react";

//IMPORT GAMBAR
import default_1 from "../Assets/pictures/avatar/avatar_1/default_1.png";
import default_2 from "../Assets/pictures/avatar/avatar_2/default_2.png";
import default_3 from "../Assets/pictures/avatar/avatar_3/default_3.png";
import default_4 from "../Assets/pictures/avatar/avatar_4/default_4.png";
import default_5 from "../Assets/pictures/avatar/avatar_5/default_5.png";

function GamePage() {
	// USE CONTEXT
	const { loginData, setLoginData } = useContext(UserContext);
	const { current, setCurrent } = useContext(UserContext);

	// DECLARE UPDATE WEATHER
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=-6.261180
	&lon=106.616820&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

	// DECLARE UNTUK KEPERLUAN PASS AVATAR
	const [avatar, setAvatar] = useState();
	let imageURL = "";

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
	const [statusMakan, setstatusMakan] = useState(50);
	const [statusMain, setstatusMain] = useState(50);
	const [statusTuru, setstatusTuru] = useState(50);
	const [statusSosial, setstatusSosial] = useState(50);
	const [statusBelajar, setstatusBelajar] = useState(0);

	// FUNCTION UPDATE STATUS + UPDATE TOMBOL + HIDE TOMBOL SESUAI LOKASI DAN STATUS
	const updateStatus = (status, tempat) => {
		if (status === "" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "tidur" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.5); //ini naik
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);

			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "makan" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter + 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "sosial" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.3); //ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "belajar" && tempat === "") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
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
			setstatusMakan((prevCounter) => prevCounter - 0.3);
			setstatusTuru((prevCounter) => prevCounter - 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter + 0.4);
			setstatusSosial((prevCounter) => prevCounter + 0.15); // ini naik
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
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "tidur" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter + 0.5); //ini naik
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "makan" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter + 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "sosial" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.3); //ini naik
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "belajar" && tempat === "rumah") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
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
			setstatusMakan((prevCounter) => prevCounter - 0.3);
			setstatusTuru((prevCounter) => prevCounter - 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter + 0.4);
			setstatusSosial((prevCounter) => prevCounter + 0.15); // ini naik
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
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "tidur" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "makan" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter + 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "sosial" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter + 0.3); //ini naik
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "belajar" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setstatusBelajar((prevCounter) => prevCounter + 0.8); //ini naik
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else if (status === "main" && tempat === "kampus") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		}
		// INI CAFE
		else if (status === "" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "tidur" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "makan" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter + 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "sosial" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else if (status === "belajar" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.3);
			setstatusBelajar((prevCounter) => prevCounter + 0.3); // naik tapi ga secepet di kampus
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(true);
		} else if (status === "main" && tempat === "cafe") {
			setstatusMakan((prevCounter) => prevCounter - 0.3);
			setstatusTuru((prevCounter) => prevCounter - 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter + 0.4);
			setstatusSosial((prevCounter) => prevCounter + 0.15); // ini naik
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
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "tidur" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "makan" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter + 0.8); // ini naik
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.2);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "sosial" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
		} else if (status === "belajar" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter - 0.4);
			setstatusTuru((prevCounter) => prevCounter - 0.2);
			setstatusMain((prevCounter) => prevCounter - 0.3);
			setstatusSosial((prevCounter) => prevCounter - 0.1);
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		} else if (status === "main" && tempat === "supermarket") {
			setstatusMakan((prevCounter) => prevCounter - 0.3);
			setstatusTuru((prevCounter) => prevCounter - 0.2); //ini naik
			setstatusMain((prevCounter) => prevCounter + 0.4);
			setstatusSosial((prevCounter) => prevCounter + 0.15); // ini naik
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
		}
	};

	//FUNCTION PASS AVATAR

	function choosenAvatar() {
		if (current === 0 && button === "") {
			setAvatar(
				"https://cdn.discordapp.com/attachments/981553514398515211/981553589195534417/1.png"
			);
		} else if (current === 1) {
			setAvatar(
				"https://cdn.discordapp.com/attachments/981553514398515211/981553586695716945/2.png"
			);
		} else if (current === 2) {
			setAvatar(
				"https://cdn.discordapp.com/attachments/981553514398515211/981553587299708998/3.png"
			);
		} else if (current === 3) {
			setAvatar(
				"https://cdn.discordapp.com/attachments/981553514398515211/981553587815604224/4.png"
			);
		} else if (current === 4) {
			setAvatar(
				"https://cdn.discordapp.com/attachments/981553514398515211/981553588646060142/5.png"
			);
		}
	}

	//WEATHER FUNCTION
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
			// AlertMakan();
			// AlertTidur();
			// AlertBelajar();
			// AlertSosial();
			// AlertMain();
		}, 1000);
		return () => clearInterval(interval);
	});

	useEffect(() => {
		const interval = setInterval(() => {
			choosenAvatar();
		}, 1);
		return () => clearInterval(interval);
	});

	// FUNCTION ALERT MAKAN
	function AlertMakan() {
		if (statusMakan <= 25 && statusMakan >= 24.8) {
			alert("Anda kelaparan segeralah makan!");
		}
	}

	//FUNCTION ALERT BELAJAR *bikin nanti berdasarkan waktu*

	//FUNCTION ALERT MAIN
	function AlertMain() {
		if ((statusMain = 25)) {
			alert("Anda kurang bermain segeralah main! ");
		}
	}

	//FUNCTION ALERT SOSIAL
	function AlertSosial() {
		if (statusSosial <= 25) {
			alert("Anda kurang bersosialisasi segeralah sosialisasi! ");
		}
	}

	//FUNCTION ALERT TIDUR
	function AlertTidur() {
		if (statusTuru <= 25) {
			alert("Anda kurang istirahat segeralah tidur!");
		}
	}

	// FUNCTION TOGGLE PINDAH TEMPAT
	// function toggle rumah
	function toggleHouse() {
		setIsClickedKampus(true);
		setIsClickedCafe(true);
		setIsClickedSupermarket(true);

		if (isClickedHome) {
			setWhere("rumah");
			setWarnaHome("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(true);
			setHideMakan(true);
			setHideMain(true);
			setHideBelajar(true);
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
			setWarnaKampus("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(false);
		} else {
			setWhere("");
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
			setWarnaCafe("#8FC3EE");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setWarnaSupermarket("#D0DCE5");
			setHideSleep(false);
			setHideMain(true);
			setHideBelajar(true);
		} else {
			setWhere("");
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
			setWarnaSupermarket("#8FC3EE");
			setWarnaCafe("#D0DCE5");
			setWarnaKampus("#D0DCE5");
			setWarnaHome("#D0DCE5");
			setHideSleep(false);
			setHideBelajar(false);
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

	// function toggle belajar
	function belajarHandler() {
		setIsClickedMain(true);
		setIsClickedSosial(true);
		setIsClickedMakan(true);
		setIsClickedTidur(true);

		if (isClickedBelajar) {
			setButton("belajar");
			setWarnaBelajar("#8FC3EE");
			setAvatar(
				"https://cdn.discordapp.com/attachments/981553514398515211/981569606772736000/Untitled_design_1.png"
			);
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

	function GamePause() {
		const { isOpen, onOpen, onClose } = useDisclosure();
		const cancelRef = React.useRef();

		return (
			<>
				<Button onClick={onOpen}>Discard</Button>
				<AlertDialog
					motionPreset="slideInBottom"
					leastDestructiveRef={cancelRef}
					onClose={onClose}
					isOpen={isOpen}
					isCentered
				>
					<AlertDialogOverlay />

					<AlertDialogContent>
						<AlertDialogHeader>Game Paused</AlertDialogHeader>
						<AlertDialogCloseButton />
						<AlertDialogBody>Do you want to restart your?</AlertDialogBody>
						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								No
							</Button>
							<Button colorScheme="red" ml={3}>
								Yes
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</>
		);
	}

	return (
		<Box
		// bgImage={umn}
		// bgSize="1700px"
		// bgPosition="center"
		// h="100vh"
		// bgRepeat="no-repeat"
		// justifyContent="center"
		// alignItems="center"
		// p="30px"
		// flexDirection={{ base: "column", md: "row" }}
		// height="100vh"
		>
			<Flex
				height="40px"
				bgColor="#EFF4F8"
				alignItems="center"
				px="10px"
				justifyContent="space-between"
			>
				<Heading size="md">09.43</Heading>
				<Heading size="sm">Friday, 7 January 2022</Heading>
			</Flex>
			<Flex
				alignItems="center"
				px="30px"
				flexDirection={{ base: "column", md: "row" }}
				height="100vh"
				justifyContent="space-around"
				// marginTop="-40px"
			>
				<Box className="avatarGame">
					<Image
						src={avatar}
						objectFit="cover"
						boxSize={{ md: "500px", base: "300px" }}
						py="20px"
					></Image>
				</Box>
				<Flex
					className="interface"
					width="400px"
					gap="15px"
					flexDirection="column"
					marginBottom="10px"
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
						gap={3}
					>
						<Flex alignItems="center" gap="5px">
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
						<Flex alignItems="center" gap="5px">
							<Icon
								icon="icomoon-free:spoon-knife"
								color="#0b66ae"
								width="25px"
							/>
							<Progress
								value={statusMakan}
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
								value={statusMain}
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
								value={statusTuru}
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
								value={statusSosial}
								height="25px"
								bg="white"
								borderRadius="30px"
								w="full"
							/>
						</Flex>
						{/* <Flex className="bungkus-bar-pause">
							<Flex className="main-bar" gap={2} flexDirection="column"></Flex>
							<Flex alignItems="center">
								<Icon
									icon="bi:pause-circle-fill"
									width="50px"
									color="#0b66ae"
								/>
							</Flex>
						</Flex> */}
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
		</Box>
	);
}

export default GamePage;
