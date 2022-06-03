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
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import { Icon } from "@iconify/react";
import Jam from "../components/Jam/Jam";
import Pause from "../components/Pause/Pause";
import useSound from "use-sound";

//IMPORT GAMBAR AVATAR
import default_1 from "../Assets/pictures/avatar/avatar_1/default_1.png";
import default_2 from "../Assets/pictures/avatar/avatar_2/default_2.png";
import default_3 from "../Assets/pictures/avatar/avatar_3/default_3.png";
import default_4 from "../Assets/pictures/avatar/avatar_4/default_4.png";
import default_5 from "../Assets/pictures/avatar/avatar_5/default_5.png";

import makan_1 from "../Assets/pictures/avatar/avatar_1/makan_1.png";
import makan_2 from "../Assets/pictures/avatar/avatar_2/makan_2.png";
import makan_3 from "../Assets/pictures/avatar/avatar_3/makan_3.png";
import makan_4 from "../Assets/pictures/avatar/avatar_4/makan_4.png";
import makan_5 from "../Assets/pictures/avatar/avatar_5/makan_5.png";

import main_1 from "../Assets/pictures/avatar/avatar_1/main_1.png";
import main_2 from "../Assets/pictures/avatar/avatar_2/main_2.png";
import main_3 from "../Assets/pictures/avatar/avatar_3/main_3.png";
import main_4 from "../Assets/pictures/avatar/avatar_4/main_4.png";
import main_5 from "../Assets/pictures/avatar/avatar_5/main_5.png";

import belajar_1 from "../Assets/pictures/avatar/avatar_1/belajar_1.png";
import belajar_2 from "../Assets/pictures/avatar/avatar_2/belajar_2.png";
import belajar_3 from "../Assets/pictures/avatar/avatar_3/belajar_3.png";
import belajar_4 from "../Assets/pictures/avatar/avatar_4/belajar_4.png";
import belajar_5 from "../Assets/pictures/avatar/avatar_5/belajar_5.png";

import tidur_1 from "../Assets/pictures/avatar/avatar_1/tidur_1.png";
import tidur_2 from "../Assets/pictures/avatar/avatar_2/tidur_2.png";
import tidur_3 from "../Assets/pictures/avatar/avatar_3/tidur_3.png";
import tidur_4 from "../Assets/pictures/avatar/avatar_4/tidur_4.png";
import tidur_5 from "../Assets/pictures/avatar/avatar_5/tidur_5.png";

// IMPORT BACKGROUND
import home_morning from "../Assets/pictures/places/home/home_morning.jpg";
import home_afternoon from "../Assets/pictures/places/home/home_afternoon.jpg";
import home_evening from "../Assets/pictures/places/home/home_evening.jpg";
import home_night from "../Assets/pictures/places/home/home_night.jpg";

import campus_morning from "../Assets/pictures/places/campus/campus_morning.jpg";

import campus_evening from "../Assets/pictures/places/campus/campus_evening.jpg";

import campus_morning_hujan from "../Assets/pictures/places/campus/campus_morning_hujan.png";
import campus_afternoon_hujan from "../Assets/pictures/places/campus/campus_afternoon_hujan.png";
import campus_evening_hujan from "../Assets/pictures/places/campus/campus_evening_hujan.png";

import cafe_morning from "../Assets/pictures/places/cafe/cafe_morning.jpg";
import cafe_afternoon from "../Assets/pictures/places/cafe/cafe_afternoon.jpg";
import cafe_evening from "../Assets/pictures/places/cafe/cafe_evening.jpg";
import cafe_night from "../Assets/pictures/places/cafe/cafe_night.jpg";

import supermarket_morning from "../Assets/pictures/places/supermarket/supermarket_morning.jpg";
import supermarket_afternoon from "../Assets/pictures/places/supermarket/supermarket_afternoon.jpg";
import supermarket_evening from "../Assets/pictures/places/supermarket/supermarket_evening.jpg";
import supermarket_night from "../Assets/pictures/places/supermarket/supermarket_night.jpg";

// IMPORT OVERLAY HUJAN
import rain from "../Assets/pictures/overlay/rain.png";

// IMPORT SOUND EFFECT
import makan from "../Assets/music/makan.m4a";
import main from "../Assets/music/main.m4a";
import belajar from "../Assets/music/belajar.m4a";
import tidur from "../Assets/music/tidur.m4a";

function GamePage() {
	// USE CONTEXT
	const { loginData } = useContext(UserContext);
	const { current } = useContext(UserContext);
	const { waktu } = useContext(UserContext);
	const { increment } = useContext(UserContext);
	const { noCampus } = useContext(UserContext);
	const { pause } = useContext(UserContext);
	const { intervalPause, setIntervalPause } = useContext(UserContext);
	// DECLARE UNTUK HITUNG JUMLAH BUTTON DISENTUH
	const { incrementMakan, setIncrementMakan } = useContext(UserContext);
	const { incrementTidur, setIncrementTidur } = useContext(UserContext);
	const { incrementMain, setIncrementMain } = useContext(UserContext);
	const { incrementBelajar, setIncrementBelajar } = useContext(UserContext);
	const { setPesan } = useContext(UserContext);
	const { setPesanMati } = useContext(UserContext);

	// OVERLAY HUJAN
	const [overlay, setOverlay] = useState();

	// SOUND EFFECT
	const [makanSound] = useSound(makan);
	const [mainSound] = useSound(main);
	const [belajarSound] = useSound(belajar);
	const [tidurSound] = useSound(tidur);

	// USE NAVIGATE
	let navigate = useNavigate();

	// DECLARE UPDATE WEATHER
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=-6.261180
	&lon=106.616820&units=imperial&appid=ab0f345ea0cbf3b442ca0d46875f076b`;

	// DECLARE UNTUK RUBAH ICON CUACA
	const [icon, setIcon] = useState("");

	// DECLARE UNTUK GANTI BACKGROUND
	const [background, setBackground] = useState("");

	// DECLARE SALAM
	const [salam, setSalam] = useState("");

	// DECLARE UNTUK KEPERLUAN PASSING AVATAR
	const [avatar, setAvatar] = useState();

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

	// BUKA KAMPUS JAM >= 8 && 17 <= JAM
	const [hideKampus, setHideKampus] = useState(true);

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

	// FUNCTION UNTUK LIMIT STATUS
	function limitStatus(value, recursive, statsRate, movement) {
		if (movement === "naik" && value + statsRate <= 100) {
			recursive((prevValue) => prevValue + statsRate);
			return;
		} else if (movement === "turun" && value - statsRate >= 0) {
			recursive((prevValue) => prevValue - statsRate);
			return;
		} else {
			recursive(
				value + statsRate < 0
					? 0
					: value + statsRate > 100
					? 100
					: value + statsRate
			);
		}
	}

	// FUNCTION UPDATE STATUS + UPDATE TOMBOL + HIDE TOMBOL SESUAI LOKASI DAN STATUS
	const updateStatus = (status, tempat) => {
		if (status === "" && tempat === "") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
			setWarnaHome("#8FC3EE");
		} else if (status === "tidur" && tempat === "") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.9, "naik");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
			setWarnaHome("#8FC3EE");
		} else if (status === "makan" && tempat === "") {
			limitStatus(statusMakan, setstatusMakan, 0.9, "naik");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
			setWarnaHome("#8FC3EE");
		} else if (status === "belajar" && tempat === "") {
			limitStatus(statusMakan, setstatusMakan, 0.4, "turun");
			limitStatus(statusMain, setstatusMain, 0.3, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.2, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.1, "turun");
			limitStatus(statusBelajar, setstatusBelajar, 0.5, "naik");
			setWarnaHome("#8FC3EE");
		} else if (status === "main" && tempat === "") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.9, "naik");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.7, "naik");
			setWarnaHome("#8FC3EE");
		}
		// INI RUMAH
		else if (status === "" && tempat === "rumah") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "tidur" && tempat === "rumah") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.9, "naik");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "makan" && tempat === "rumah") {
			limitStatus(statusMakan, setstatusMakan, 0.7, "naik");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "belajar" && tempat === "rumah") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
			limitStatus(statusBelajar, setstatusBelajar, 0.7, "naik");
		} else if (status === "main" && tempat === "rumah") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.7, "naik");
			limitStatus(statusTuru, setstatusTuru, 0.2, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.7, "naik");
		}
		// INI KAMPUS
		else if (status === "" && tempat === "kampus") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "makan" && tempat === "kampus") {
			limitStatus(statusMakan, setstatusMakan, 0.7, "naik");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "belajar" && tempat === "kampus") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
			limitStatus(statusBelajar, setstatusBelajar, 0.9, "naik");
		} else if (status === "main" && tempat === "kampus") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.7, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.7, "naik");
		}
		// INI CAFE
		else if (status === "" && tempat === "cafe") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "tidur" && tempat === "cafe") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "makan" && tempat === "cafe") {
			limitStatus(statusMakan, setstatusMakan, 0.9, "naik");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "belajar" && tempat === "cafe") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
			limitStatus(statusBelajar, setstatusBelajar, 0.3, "naik"); // naik tapi ga secepet di kampus
		} else if (status === "main" && tempat === "cafe") {
			limitStatus(statusMakan, setstatusMakan, 0.9, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "naik");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.9, "naik");
		}
		// INI SUPERMARKET
		else if (status === "" && tempat === "supermarket") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "tidur" && tempat === "supermarket") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "makan" && tempat === "supermarket") {
			limitStatus(statusMakan, setstatusMakan, 0.9, "naik");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "belajar" && tempat === "supermarket") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.4, "turun");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.2, "turun");
		} else if (status === "main" && tempat === "supermarket") {
			limitStatus(statusMakan, setstatusMakan, 0.5, "turun");
			limitStatus(statusMain, setstatusMain, 0.5, "naik");
			limitStatus(statusTuru, setstatusTuru, 0.3, "turun");
			limitStatus(statusSosial, setstatusSosial, 0.5, "naik");
		}
	};

	//FUNCTION PASS AVATAR
	function passAvatar() {
		if (current === 0) {
			setAvatar(default_1);
		} else if (current === 1) {
			setAvatar(default_2);
		} else if (current === 2) {
			setAvatar(default_3);
		} else if (current === 3) {
			setAvatar(default_4);
		} else if (current === 4) {
			setAvatar(default_5);
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

	// FUNCTION UNTUK GANTI ICON SESUAI CUACA
	function WeatherIcon() {
		if (data.weather[0].main === "") {
			setIcon("");
		} else if (data.weather[0].main === "Clear") {
			setIcon("ic:round-wb-sunny");
		} else if (data.weather[0].main === "Clouds") {
			setIcon("bi:clouds-fill");
		} else if (data.weather[0].main === "Rain") {
			setIcon("bi:cloud-lightning-rain-fill");
		} else if (data.weather[0].main === "Thunderstorm") {
			setIcon("ri:thunderstorms-fill");
		} else if (data.weather[0].main === "Drizzle") {
			setIcon("fluent:weather-drizzle-24-filled");
		} else if (data.weather[0].main === "Snow") {
			setIcon("ph:snowflake-bold");
		} else if (data.weather[0].main === "Mist") {
			setIcon("tabler:mist");
		} else if (data.weather[0].main === "Haze") {
			setIcon("bi:cloud-haze2-fill");
		} else if (data.weather[0].main === "Fog") {
			setIcon("tabler:mist");
		} else if (data.weather[0].main === "Smoke") {
			setIcon("carbon:smoke");
		} else if (data.weather[0].main === "Dust") {
			setIcon("fluent:weather-duststorm-20-filled");
		} else if (data.weather[0].main === "Sand") {
			setIcon("icon-park-outline:sandstorm");
		} else if (data.weather[0].main === "Ash") {
			setIcon("emojione-monotone:dashing-away");
		} else if (data.weather[0].main === "Squall") {
			setIcon("fluent:weather-squalls-24-filled");
		} else if (data.weather[0].main === "Tornado") {
			setIcon("uil:tornado");
		}
	}

	// FUNCTION UNTUK PAUSE
	function handlePause() {
		if (pause === "pause") {
			setIntervalPause("1000000");
		} else if (pause === "") {
			setIntervalPause("1000");
		}
	}

	// tiap 1 detik function sbb akan dijalankan
	useEffect(() => {
		const interval = setInterval(() => {
			updateStatus(button, where);
			AlertMakan();
			AlertTidur();
			AlertSosial();
			AlertMain();
		}, intervalPause);
		return () => clearInterval(interval);
	});

	// ini use effect fast resp :D WKKWWK
	useEffect(() => {
		const interval = setInterval(() => {
			changeBackground();
			CheckIncrements();
			WeatherIcon();
			IsiSalam();
			HideKampus();
			handlePause();
		}, 1);

		return () => clearInterval(interval);
	});

	// windows onload
	useEffect(() => {
		searchLocation();
		passAvatar();
	}, []);

	// useEffect UNTUK UPDATE CUACA TIAP 5 MENIT
	useEffect(() => {
		const interval = setInterval(() => {
			searchLocation();
		}, 300000);

		return () => clearInterval(interval);
	});

	// FUNCTION ALERT MAKAN
	function AlertMakan() {
		if (statusMakan <= 1) {
			setPesanMati("Anda mati karena dehidrasi dan kurang gizi!");
			navigate("/Gameover");
		}
	}

	//FUNCTION MATI MAIN
	function AlertMain() {
		if (statusMain <= 1) {
			setPesanMati("Anda meninggal karena depresi! ");
			navigate("/Gameover");
		}
	}

	//FUNCTION MATI SOSIAL
	function AlertSosial() {
		if (statusSosial <= 1) {
			setPesanMati("Anda meninggal karena depresi! ");
			navigate("/Gameover");
		}
	}

	//FUNCTION MATI TIDUR
	function AlertTidur() {
		if (statusTuru <= 1) {
			setPesanMati("Anda mati karena kurang tidur!");
			navigate("/Gameover");
		}
	}

	//FUNCTION CHECK INCREMENT == 7
	function CheckIncrements() {
		if (
			increment === 7 &&
			incrementMakan >= incrementBelajar &&
			incrementMakan >= incrementTidur &&
			incrementMakan >= incrementMain
		) {
			alert("Selamat anda sudah melewati 7 hari");
			setPesan("Selama seminggu ini kamu sering makan!");
			navigate("/Finish");
		} else if (
			increment === 7 &&
			incrementBelajar >= incrementMakan &&
			incrementBelajar >= incrementTidur &&
			incrementBelajar >= incrementMain
		) {
			alert("Selamat anda sudah melewati 7 hari");
			setPesan(
				"Selama seminggu ini kamu sering belajar! kamu cocok jadi anak " +
					loginData.jurusan
			);
			navigate("/Finish");
		} else if (
			increment === 7 &&
			incrementTidur >= incrementMakan &&
			incrementTidur >= incrementBelajar &&
			incrementTidur >= incrementMain
		) {
			alert("Selamat anda sudah melewati 7 hari");
			setPesan("Selama seminggu ini kamu sering tidur!");
			navigate("/Finish");
		} else if (
			increment === 7 &&
			incrementMain >= incrementMakan &&
			incrementMain >= incrementBelajar &&
			incrementMain >= incrementTidur
		) {
			alert("Selamat anda sudah melewati 7 hari");
			setPesan("Selama seminggu ini kamu sering main!");
			navigate("/Finish");
		}
	}

	// FUNCTION UNTUK GANTI BACKGROUND
	function changeBackground() {
		//SET BACKGROUND DEFAULT (RUMAH)
		if ((where === "" || where === "rumah") && waktu === "Pagi") {
			setBackground(home_morning);
		} else if ((where === "" || where === "rumah") && waktu === "Siang") {
			setBackground(home_afternoon);
		} else if ((where === "" || where === "rumah") && waktu === "Sore") {
			setBackground(home_evening);
		} else if ((where === "" || where === "rumah") && waktu === "Malam") {
			setBackground(home_night);
		}

		// SET BACKGROUND KAMPUS
		else if (where === "kampus" && waktu === "Pagi") {
			setBackground(campus_morning);
		} else if (where === "kampus" && waktu === "Siang") {
			setBackground(campus_morning);
		} else if (where === "kampus" && waktu === "Sore") {
			setBackground(campus_evening);
		} else if (
			where === "kampus" &&
			waktu === "Pagi" &&
			data.weather[0].main === ("Rain" || "Thunderstorm" || "Drizzle")
		) {
			setBackground(campus_morning_hujan);
		} else if (
			where === "kampus" &&
			waktu === "Siang" &&
			data.weather[0].main === ("Rain" || "Thunderstorm" || "Drizzle")
		) {
			setBackground(campus_afternoon_hujan);
		} else if (
			where === "kampus" &&
			waktu === "Sore" &&
			data.weather[0].main === ("Rain" || "Thunderstorm" || "Drizzle")
		) {
			setBackground(campus_evening_hujan);
		}

		// // SET BACKGROUND CAFE
		else if (where === "cafe" && waktu === "Pagi") {
			setBackground(cafe_morning);
		} else if (where === "cafe" && waktu === "Siang") {
			setBackground(cafe_afternoon);
		} else if (where === "cafe" && waktu === "Sore") {
			setBackground(cafe_evening);
		} else if (where === "cafe" && waktu === "Malam") {
			setBackground(cafe_night);
		}

		// SET BACKGROUND SUPERMARKET
		else if (where === "supermarket" && waktu === "Pagi") {
			setBackground(supermarket_morning);
		} else if (where === "supermarket" && waktu === "Siang") {
			setBackground(supermarket_afternoon);
		} else if (where === "supermarket" && waktu === "Sore") {
			setBackground(supermarket_evening);
		} else if (where === "supermarket" && waktu === "Malam") {
			setBackground(supermarket_night);
		}
	}

	// FUNCTION UNTUK KASIH SALAM
	function IsiSalam() {
		if (waktu === "Malam") {
			setSalam("Good Night");
		} else if (waktu === "Pagi") {
			setSalam("Good Morning");
		} else if (waktu === "Siang") {
			setSalam("Good Afternoon");
		} else if (waktu === "Sore") {
			setSalam("Good Evening");
		}
	}

	// FUNCTION HIDE KAMPUS
	function HideKampus() {
		if (noCampus === "Campus Open") {
			setHideKampus(true);
		} else if (noCampus === "Campus Closed") {
			setHideKampus(false);
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

		if (isClickedTidur) {
			setButton("tidur");
			setWarnaSleep("#8FC3EE");
			setWarnaMakan("#D0DCE5");
			setWarnaMain("#D0DCE5");
			setWarnaBelajar("#D0DCE5");
			setIncrementTidur(incrementTidur + 1);
			tidurSound();

			// SET AVATAR
			if (current === 0) {
				setAvatar(tidur_1);
			} else if (current === 1) {
				setAvatar(tidur_2);
			} else if (current === 2) {
				setAvatar(tidur_3);
			} else if (current === 3) {
				setAvatar(tidur_4);
			} else if (current === 4) {
				setAvatar(tidur_5);
			}
		} else {
			setButton("");
			setWarnaSleep("#D0DCE5");
			passAvatar();
		}
		setIsClickedTidur(!isClickedTidur);
	}

	// function toggle makan
	function eatHandler() {
		setIsClickedMain(true);
		setIsClickedBelajar(true);
		setIsClickedTidur(true);

		if (isClickedMakan) {
			setButton("makan");
			setWarnaMakan("#8FC3EE");
			setWarnaMain("#D0DCE5");
			setWarnaBelajar("#D0DCE5");
			setWarnaSleep("#D0DCE5");
			setIncrementMakan(incrementMakan + 1);
			makanSound();

			// SET AVATAR
			// SET AVATAR
			if (current === 0) {
				setAvatar(makan_1);
			} else if (current === 1) {
				setAvatar(makan_2);
			} else if (current === 2) {
				setAvatar(makan_3);
			} else if (current === 3) {
				setAvatar(makan_4);
			} else if (current === 4) {
				setAvatar(makan_5);
			}
		} else {
			setButton("");
			setWarnaMakan("#D0DCE5");
			passAvatar();
		}
		setIsClickedMakan(!isClickedMakan);
	}

	// function toggle belajar
	function belajarHandler() {
		setIsClickedMain(true);
		setIsClickedMakan(true);
		setIsClickedTidur(true);

		if (isClickedBelajar) {
			setButton("belajar");
			setWarnaBelajar("#8FC3EE");
			setWarnaMakan("#D0DCE5");
			setWarnaMain("#D0DCE5");
			setWarnaSleep("#D0DCE5");
			setIncrementBelajar(incrementBelajar + 1);
			belajarSound();

			// SET AVATAR
			// SET AVATAR
			if (current === 0) {
				setAvatar(belajar_1);
			} else if (current === 1) {
				setAvatar(belajar_2);
			} else if (current === 2) {
				setAvatar(belajar_3);
			} else if (current === 3) {
				setAvatar(belajar_4);
			} else if (current === 4) {
				setAvatar(belajar_5);
			}
		} else {
			setButton("");
			setWarnaBelajar("#D0DCE5");
			passAvatar();
		}
		setIsClickedBelajar(!isClickedBelajar);
	}

	// function toggle main
	function mainHandler() {
		setIsClickedBelajar(true);
		setIsClickedMakan(true);
		setIsClickedTidur(true);

		if (isClickedMain) {
			setButton("main");
			setWarnaMain("#8FC3EE");
			setWarnaBelajar("#D0DCE5");
			setWarnaMakan("#D0DCE5");
			setWarnaSleep("#D0DCE5");
			setIncrementMain(incrementMain + 1);
			mainSound();

			// SET AVATAR
			if (current === 0) {
				setAvatar(main_1);
			} else if (current === 1) {
				setAvatar(main_2);
			} else if (current === 2) {
				setAvatar(main_3);
			} else if (current === 3) {
				setAvatar(main_4);
			} else if (current === 4) {
				setAvatar(main_5);
			}
		} else {
			setButton("");
			setWarnaMain("#D0DCE5");
			passAvatar();
		}
		setIsClickedMain(!isClickedMain);
	}

	return (
		<Box
			bgImage={background}
			backgroundRepeat="no-repeat"
			backgroundSize="cover"
			overflow="hidden"
		>
			<Jam />
			<Flex
				alignItems="center"
				px="30px"
				pt="30px"
				pb="10px"
				flexDirection={{ base: "column", md: "row" }}
				justifyContent="space-around"
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
					width={{ md: "400px", base: "350px" }}
					gap="15px"
					flexDirection="column"
				>
					<Flex
						className="greetings-weather"
						bg="#EAF0F6"
						p="20px"
						borderRadius="30px"
						alignItems="center"
						justifyContent="space-between"
					>
						<Box>
							<Heading size="lg">{salam}</Heading>

							{data.weather ? (
								<Heading size="md" color="#0B66AE">
									{data.weather[0].main} {data.main.temp.toFixed()}°F
								</Heading>
							) : null}

							<Text fontSize="md">{loginData.nama}</Text>
							<Text fontSize="sm" as="i">
								{loginData.jurusan}
							</Text>
						</Box>
						<Box pr="25px">
							<Icon icon={icon} width="70px" color="#467090" />
						</Box>
					</Flex>
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
					</Flex>
					<Flex
						className="activity-button-group"
						bg="#EAF0F6"
						borderRadius="30px"
						p="20px"
						flexDirection="row"
						flexWrap="wrap"
						gap="20px"
						justifyContent="center"
					>
						{hideSleep && (
							<Button
								id="tombolSleep"
								onClick={sleepHandler}
								bg={warnaSleep}
								borderRadius="30px"
								width={{ md: "160px", base: "300px" }}
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
								width={{ md: "160px", base: "300px" }}
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
								width={{ md: "160px", base: "300px" }}
							>
								Play
							</Button>
						)}
						{hideBelajar && (
							<Button
								id="tombolBelajar"
								onClick={belajarHandler}
								bg={warnaBelajar}
								borderRadius="30px"
								width={{ md: "160px", base: "300px" }}
							>
								Study
							</Button>
						)}
					</Flex>

					<Flex
						bg="#EAF0F6"
						borderRadius="30px"
						p="20px"
						flexDirection="row"
						flexWrap="wrap"
						gap="20px"
						justifyContent="center"
					>
						<Flex>
							<Button
								ref={btnRef}
								bg="#D6BCF8"
								color="#AF8EDB"
								borderRadius="30px"
								width={{ md: "160px", base: "300px" }}
								onClick={onOpen}
							>
								Change Location
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
												width={{ md: "160px", base: "300px" }}
												onClick={toggleHouse}
											>
												Home
											</Button>
											{hideKampus && (
												<Button
													bg={warnaKampus}
													borderRadius="30px"
													width={{ md: "160px", base: "300px" }}
													onClick={toggleKampus}
												>
													Campus
												</Button>
											)}
											<Button
												bg={warnaCafe}
												borderRadius="30px"
												width={{ md: "160px", base: "300px" }}
												onClick={toggleCafe}
											>
												Cafe
											</Button>
											<Button
												bg={warnaSupermarket}
												borderRadius="30px"
												width={{ md: "160px", base: "300px" }}
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
								width={{ md: "160px", base: "300px" }}
								bg="#DD9A9A"
								color="#C25050"
							>
								Logout
							</Button>
						</Link>

						<Pause />
					</Flex>
				</Flex>
			</Flex>
		</Box>
	);
}

export default GamePage;
