import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Progress, Button, ButtonGroup } from "@chakra-ui/react";
import "./GamePage.css";
import { Link } from "react-router-dom";
// impoAt app from "./components/App";
import App from "./LoginPage";
import { isConstructorDeclaration } from "typescript";
// import { clearInterval } from "timers";

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

	return (
		<div className="bungkus">
			<div className="header">
				<h1>7 Days Student</h1>
				<h1>Halo! {props.name}</h1>
			</div>
			<div className="body">
				<div className="progress-bar">
					<div className="social-bar">
						<Progress
							value={statusBelajar}
							weight="30px"
							marginBottom={4}
							aria-valuemin={0}
							aria-valuemax={100}
						/>
					</div>
					<div className="left-right-bar">
						<div className="left-bar">
							<Progress
								value={50 - statusMakan}
								height="20px"
								marginBottom={2}
							/>
							<Progress
								value={50 - statusMain}
								height="20px"
								marginBottom={2}
							/>
						</div>
						<div className="right-bar">
							<Progress
								value={50 - statusTuru}
								height="20px"
								marginBottom={2}
							/>
							<Progress value={50 - statusSosial} height="20px" />
						</div>
					</div>
				</div>
				<div className="activity-button-group">
					<ButtonGroup spacing="6">
						<Button id="tombolSleep" onClick={sleepHandler}>
							Sleep
						</Button>
						<Button id="tombolEat" onClick={eatHandler}>
							Eat
						</Button>
						<Button id="tombolDiscord" onClick={discordHandler}>
							Discord
						</Button>
						<Button id="tombolBelajar" onClick={belajarHandler}>
							Belajar
						</Button>
						<Button id="tombolMain" onClick={mainHandler}>
							Main
						</Button>
					</ButtonGroup>
					<ButtonGroup spacing="6">
						<Button>Home</Button>
						<Button>Kampus</Button>
						<Button>Cafe</Button>
						<Button>Supermarket</Button>
						<Link to="/">
							<Button>Logout</Button>
						</Link>
					</ButtonGroup>
				</div>
			</div>
			<div className="cobaModular"></div>
		</div>
	);
}

export default GamePage;
