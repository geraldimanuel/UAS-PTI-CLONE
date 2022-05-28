import React, { useContext } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { Select, Input, Button, Flex, Spacer, Box } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
// import Avatar from "./Avatar";
import GamePage from "./GamePage";
import { useState } from "react";
// import ImageSlider from "./ImageSlider";
// import { SliderData } from "./SliderData";
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
		<div className="App">
			<Flex alignItems="center" justifyContent="center">
				<Box>
					{/* <ImageSlider slides={SliderData}/> */}
					<img
						src="https://cdn.discordapp.com/attachments/979290524680847370/979293672799625266/soresunset.jpg"
						height="200"
						width="300"
					/>
					<FormName />
					<PilihJurusan />
					<Link to="/GamePage">
						<Button>Submit</Button>
					</Link>
				</Box>
			</Flex>
		</div>
	);
}

export default LoginPage;
