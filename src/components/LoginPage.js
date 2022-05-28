import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { Select, Input, Button, Flex, Spacer, Box } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
// import Avatar from "./Avatar";
import GamePage from "./GamePage";
import { useState } from "react";
// import ImageSlider from "./ImageSlider";
// import { SliderData } from "./SliderData";

function FormName() {
	const [name, setName] = useState("");

	const handleChange = (e) => {
		setName(e.target.value);
	};

	console.log(name);

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
	return (
		<Select
			placeholder="Pilih Jurusan"
			size="sm"
			variant="filled"
			icon={<ArrowDownIcon />}
			// width="250px"
			marginBottom={4}
		>
			<option value="infor">Informatika</option>
			<option value="sisin">Sistem Informasi</option>
			<option value="tekom">Teknik Komputer</option>
			<option value="telektro">Teknik Elektro</option>
			<option value="tefisik">Teknik Fisika</option>
			<option value="hotel">Perhotelan</option>
			<option value="akuntansi">Akuntansi</option>
			<option value="manajemen">Manajemen</option>
			<option value="Stracom">Komunikasi Strategis</option>
			<option value="DiJur">Digital Jurnalistik</option>
			<option value="DolphiDKV">DKV</option>
			<option value="Arsitektur">Arsitektur</option>
			<option value="Filmasi">Film & Animasi</option>
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
