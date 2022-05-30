import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
	Select,
	Input,
	Button,
	Flex,
	Box,
	Heading,
	Image,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
// import Avatar from "./Avatar";
import ImageSlider from "../components/Carousel/ImageSlider";
import { SliderData } from "../components/Carousel/SliderData";
import { UserContext } from "../lib/UserContext";
import UMN from "../Assets/pictures/Logos/UMN.png";

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
			placeholder="Enter your name.."
			size="md"
			onChange={handleChange}
			bg="#D0DCE5"
			borderRadius="30px"
			border="1px solid"
			borderColor="#000000"
			width="290px"
			textAlign={["center"]}
		/>
	);
}

function PilihJurusan() {
	const { loginData, setLoginData } = useContext(UserContext);

	return (
		<Select
			placeholder="Pilih Jurusan"
			size="md"
			variant="filled"
			// icon={<ArrowDownIcon />}
			value={loginData.jurusan}
			onChange={(e) =>
				setLoginData({
					...loginData,
					jurusan: e.target.value,
				})
			}
			bg="#D0DCE5"
			borderRadius="30px"
			border="1px solid"
			borderColor="#000000"
			width="290px"
			textAlign={["center"]}
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
		<Flex
			className="main-div"
			alignItems="center"
			justifyContent="center"
			bgColor="#0B66AE"
			gap="15px"
			height="100vh"
		>
			<Flex
				className="kotak-kecil"
				gap="15px"
				bgColor="#EAF0F5"
				borderRadius="30px"
				alignItems="center"
				justifyContent="center"
				flexDirection={{ base: "column", md: "row" }}
				px="80px"
				py="80px"
			>
				<Flex alignItems="center" justifyContent="center">
					<Box className="carousel">
						<ImageSlider slides={SliderData} />
					</Box>
				</Flex>
				<Flex
					className="input-bar"
					flexDirection="column"
					gap="7px"
					alignItems="center"
					justifyContent="center"
				>
					<Box className="inputBar">
						<FormName />
					</Box>
					<Box className="dropDown">
						<PilihJurusan />
					</Box>
					<Box className="submitButton">
						<Link to="/GamePage">
							<Button
								bg="#D0DCE5"
								borderRadius="30px"
								border="1px solid"
								borderColor="#000000"
								width="290px"
								textAlign={["center"]}
							>
								PLAY!
							</Button>
						</Link>
					</Box>
				</Flex>
			</Flex>

			{/* 			
			<Box className="carousel">
				<ImageSlider slides={SliderData} />
			</Box>
			
			<Box className="dropDown">
				<PilihJurusan />
			</Box>
			<Box className="submitButton">
				<Link to="/GamePage">
					<Button>Submit</Button>
				</Link>
			</Box> */}
		</Flex>
	);
}

export default LoginPage;
