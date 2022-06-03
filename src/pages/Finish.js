import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { UserContext } from "../lib/UserContext";
import { Icon } from "@iconify/react";

//IMPORT GAMBAR AVATAR
import default_1 from "../Assets/pictures/avatar/avatar_1/default_1.png";
import default_2 from "../Assets/pictures/avatar/avatar_2/default_2.png";
import default_3 from "../Assets/pictures/avatar/avatar_3/default_3.png";
import default_4 from "../Assets/pictures/avatar/avatar_4/default_4.png";
import default_5 from "../Assets/pictures/avatar/avatar_5/default_5.png";

function Finish() {
	const { current, setCurrent } = useContext(UserContext);
	const [avatar, setAvatar] = useState();
	const { loginData, setLoginData } = useContext(UserContext);
	const { incrementMakan, setIncrementMakan } = useContext(UserContext);
	const { incrementTidur, setIncrementTidur } = useContext(UserContext);
	const { incrementMain, setIncrementMain } = useContext(UserContext);
	const { incrementBelajar, setIncrementBelajar } = useContext(UserContext);
	const { pesan, setPesan } = useContext(UserContext);

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

	useEffect(() => {
		passAvatar();
	}, []);
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
				bgColor="#EAF0F5"
				borderRadius="30px"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				width={{ base: "380px", md: "750px" }}
				p={{ md: "30px", base: "10px" }}
			>
				<Flex
					justifyContent="center"
					flexDirection="column"
					alignItems="center"
				>
					<Heading>Congratulation</Heading>
					<Heading size="md">You have finished the game!</Heading>
				</Flex>
				<Flex flexDirection="column">
					<Flex justifyContent="center" alignItems="center">
						<Box className="avatarGame">
							<Image
								src={avatar}
								objectFit="cover"
								boxSize={{ md: "250px", base: "150px" }}
								py="20px"
							></Image>
						</Box>
					</Flex>

					<Flex
						borderRadius="30px"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						gap="10px"
						p={{ md: "10px", base: "10px" }}
					>
						<Flex gap="3px">
							<Heading size={{ md: "md", base: "sm" }} textAlign="center">
								Halo, {loginData.nama}! kamu dari jurusan {loginData.jurusan}.
							</Heading>
						</Flex>
						<Flex flexDirection="column" gap="15px">
							<Flex
								flexDirection="row"
								flexWrap="wrap"
								gap="15px"
								justifyContent="center"
							>
								<Flex justifyContent="center" alignItems="center">
									<Icon icon="icomoon-free:spoon-knife" width="33px"></Icon>
									<Heading size="lg"> : {incrementMakan}</Heading>
								</Flex>

								<Flex justifyContent="center" alignItems="center">
									<Icon icon="fa-solid:book-reader" width="37px" />
									<Heading size="lg"> : {incrementBelajar}</Heading>
								</Flex>

								<Flex justifyContent="center" alignItems="center">
									<Icon icon="icon-park-solid:game-three" width="40px" />
									<Heading size="lg"> : {incrementMain}</Heading>
								</Flex>
								<Flex justifyContent="center" alignItems="center">
									<Icon icon="icon-park-solid:sleep-two" width="40px" />
									<Heading size="lg"> : {incrementTidur}</Heading>
								</Flex>
							</Flex>
							<Flex justifyContent="center" alignItems="center">
								<Text fontSize="l" as="i" textAlign="center">
									"{pesan}"
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
}

export default Finish;
