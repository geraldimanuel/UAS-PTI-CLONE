import React, { useContext } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { Select, Input, Button, Flex, Spacer, Box } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
// import Avatar from "./Avatar";
import GamePage from "./GamePage";
import { useState } from "react";
import ImageSlider from "../components/Carousel/ImageSlider";
import { SliderData } from "../components/Carousel/SliderData";
import { UpdateData } from "../App";
import { UserContext } from "../lib/UserContext";

function FormName() {
	const { loginData, setLoginData } = useContext(UserContext);

	const handleChange = (e) => {
		setLoginData({
			...loginData,
			nama: e.target.value,
		});
	};

	return (
		<Input
			className="input"
			placeholder="Enter your name"
			size="md"
			width={300}
			onChange={handleChange}
		/>
	);
}

function PilihJurusan() {
	const { loginData, setLoginData } = useContext(UserContext);

	return (
		<Select
			placeholder="Pilih Jurusan"
			size="sm"
			variant="filled"
			icon={<ArrowDownIcon />}
			marginBottom={4}
			value={loginData.jurusan}
			onChange={(e) =>
				setLoginData({
					...loginData,
					jurusan: e.target.value,
				})
			}
		>
			<option value="Informatika">Informatika</option>
			<option value="Sistem Informasi">Sistem Informasi</option>
			<option value="Teknik Komputer">Teknik Komputer</option>
			<option value="Teknik Elektro">Teknik Elektro</option>
			<option value="Teknik Fisika">Teknik Fisika</option>
			<option value="Perhotelan">Perhotelan</option>
			<option value="Akuntansi">Akuntansi</option>
			<option value="Manajemen">Manajemen</option>
			<option value="Komunikasi Strategis">Komunikasi Strategis</option>
			<option value="Digital Jurnalistik">Digital Jurnalistik</option>
			<option value="DKV">DKV</option>
			<option value="Arsitektur">Arsitektur</option>
			<option value="Film & Animasi">Film & Animasi</option>
		</Select>
	);
}

function LoginPage() {
	return (
		<Flex alignItems="center" justifyContent="center" flexDirection="column">
			<Box className="carousel">
				<ImageSlider slides={SliderData} />
			</Box>
			<Box className="inputBar">
				<FormName />
			</Box>
			<Box className="dropDown">
				<PilihJurusan />
			</Box>
			<Box className="submitButton">
				<Link to="/GamePage">
					<Button>Submit</Button>
				</Link>
			</Box>
		</Flex>
	);
}

export default LoginPage;
