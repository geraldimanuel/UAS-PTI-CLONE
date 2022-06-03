import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flex, Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import { UserContext } from "../lib/UserContext";
import { Icon } from "@iconify/react";

function Gameover() {
	const { pesanMati, setPesanMati } = useContext(UserContext);
	const { pesan, setPesan } = useContext(UserContext);

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
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				width={{ base: "350px", md: "750px" }}
				p={{ md: "30px", base: "10px" }}
			>
				<Heading>Game over</Heading>
				<Icon icon="bxs:skull" width="70px" />
				<Heading color="red.600" fontSize="md">
					{pesanMati}
				</Heading>
				<Button
					as={Link}
					to="/"
					borderRadius="30px"
					width="100px"
					bg="#DD9A9A"
					color="#C25050"
				>
					<Icon icon="codicon:debug-restart" width="30px" />
				</Button>
			</Flex>
		</Flex>
	);
}

export default Gameover;
