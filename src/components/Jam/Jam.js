import React, { useState, useEffect, useContext } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { addMinutes, startOfToday, startOfWeek, format } from "date-fns";
import { UserContext } from "../../lib/UserContext";

function Jam() {
	// DECLARE JAM SEKARANG
	const [jam, setJam] = useState(startOfWeek(startOfToday()));

	// DECLARE VALUE BUAT TAU SKRG JAM BRP HARI APA
	const { setWaktu } = useContext(UserContext);
	const { increment, setIncrement } = useContext(UserContext);
	const { setNoCampus } = useContext(UserContext);

	// UNTUK PAUSE
	const { intervalPause } = useContext(UserContext);

	// FUNCTION UNTUK TAU SEKARANG JAM BERAPA
	function JamSekarang() {
		if (format(jam, "HH") >= "04" && format(jam, "HH") < "12") {
			setWaktu("Pagi");
		} else if (format(jam, "HH") >= "12" && format(jam, "HH") < "18") {
			setWaktu("Siang");
		} else if (format(jam, "HH") >= "18" && format(jam, "HH") < "24") {
			setWaktu("Sore");
		} else if (format(jam, "HH") >= "00" && format(jam, "HH") < "04") {
			setWaktu("Malam");
		}
	}

	function campusClosed() {
		if (format(jam, "HH") >= "08" && format(jam, "HH") < "17") {
			setNoCampus("Campus Open");
		} else if (format(jam, "HH") >= "17" && format(jam, "HH") <= "24") {
			setNoCampus("Campus Closed");
		} else if (format(jam, "HH") >= "00" && format(jam, "HH") < "08") {
			setNoCampus("Campus Closed");
		}
	}

	// FUNCTION UNTUK MENGETAHUI BERAPA HARI MAIN
	function HariSekarang() {
		if (format(jam, "HH:mm") === "23:59") {
			setIncrement(increment + 1);
		}
	}

	const refreshJam = () => {
		setJam((prevValue) => addMinutes(prevValue, 1));
	};

	useEffect(() => {
		const interval = setInterval(() => {
			refreshJam();
			JamSekarang();
			HariSekarang();
		}, intervalPause);
		return () => clearInterval(interval);
	});

	useEffect(() => {
		const interval = setInterval(() => {
			campusClosed();
		}, 1);
		return () => clearInterval(interval);
	});

	return (
		<Flex
			height="40px"
			bgColor="#EFF4F8"
			alignItems="center"
			px="10px"
			justifyContent="space-between"
		>
			<Heading size="md">{format(jam, "HH:mm")}</Heading>
			<Heading size="sm">{format(jam, "E, dd MMMMMMMM yyyy")}</Heading>
		</Flex>
	);
}

export default Jam;
