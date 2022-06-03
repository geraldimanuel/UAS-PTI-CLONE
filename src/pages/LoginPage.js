import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
	Select,
	Input,
	Button,
	Flex,
	Box,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from "@chakra-ui/react";
import ImageSlider from "../components/Carousel/ImageSlider";
import { SliderData } from "../components/Carousel/SliderData";
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

function HowToPlayButton() {
	const OverlayOne = () => (
		<ModalOverlay
			bg="blackAlpha.300"
			backdropFilter="blur(10px) hue-rotate(90deg)"
		/>
	);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = React.useState(<OverlayOne />);

	return (
		<Box>
			<Button
				onClick={() => {
					setOverlay(<OverlayOne />);
					onOpen();
				}}
				bg="#D0DCE5"
				borderRadius="30px"
				border="1px solid"
				borderColor="#000000"
				textAlign={["center"]}
				width={{ md: "140px", base: "290px" }}
			>
				Cara Bermain
			</Button>
			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Cara Main: </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							1. Pada permainan 7 Days Maba ini, pemain memiliki 5 status bar
							(Belajar, Sosial, Main, Makan, dan Tidur), dengan 3 status bar
							diantaranya (Main, Makan, dan Tidur) harus dipertahankan agar
							tidak mati (game selesai) sebelum 7 hari.
						</Text>
						<br />
						<Text>
							2. Pemain dapat menekan tombol "Makan" untuk menaikkan stats
							"Makan", tombol "Main" untuk stats "Main" dan "Sosial", tombol
							"Tidur" untuk stats "Ngantuk", dan tombol "Belajar" untuk stats
							"Pengetahuan". Stats akan berkurang apabila tombol tidak ditekan
							(idle).
						</Text>
						<br />
						<Text>
							3. Pemain dapat memilih Avatar sesuai keinginan, lalu masukkan
							nama pemain dan juga pilihlah jurusan, setelah itu tekan tombol
							"PLAY!"
						</Text>
						<br />
						<Text>
							4. Pemain dapat berpindah lokasi dengan menekan tombol "Pindah
							Tempat". Terdapat beberapa lokasi permainan, yaitu Home, Kampus,
							Cafe, dan Supermarket
						</Text>
						<br />
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}

function AboutButton() {
	const OverlayOne = () => (
		<ModalOverlay
			bg="blackAlpha.300"
			backdropFilter="blur(10px) hue-rotate(90deg)"
		/>
	);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = React.useState(<OverlayOne />);

	return (
		<Box>
			<Button
				onClick={() => {
					setOverlay(<OverlayOne />);
					onOpen();
				}}
				bg="#D0DCE5"
				borderRadius="30px"
				border="1px solid"
				borderColor="#000000"
				textAlign={["center"]}
				width={{ md: "140px", base: "290px" }}
			>
				Tentang Kami
			</Button>

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				{overlay}
				<ModalContent>
					<ModalHeader>Kelompok 7</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>Gerald Imanuel Wijaya (00000060106)</Text>
						<Text>Ikbar Muhammad Mumtaz (00000061296)</Text>
						<Text>Michael Danda Pratama (00000055630)</Text>
						<Text>Steven Arya Setyadharma T.C (00000055610)</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
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
				p={{ md: "70px", base: "30px" }}
				width={{ md: "700px", base: "350px", sm: "100px" }}
			>
				<Flex alignItems="center" justifyContent="center">
					<Box className="carousel" width="350px">
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
					<Flex
						className="introButton"
						// flexDirection="column"
						justifyContent="center"
						alignItems="center"
						flexDirection={{ md: "row", base: "column" }}
						gap="7px"
					>
						<AboutButton />
						<HowToPlayButton />
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default LoginPage;
