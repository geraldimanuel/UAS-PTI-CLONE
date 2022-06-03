import React, { useContext } from "react";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogOverlay,
	useDisclosure,
	Button,
} from "@chakra-ui/react";
import { UserContext } from "../../lib/UserContext";

function Pause() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const { isClickedPause, setIsClickedPause } = useContext(UserContext);
	const { setPause } = useContext(UserContext);

	// FUNCTION HANDLE PAUSE
	function togglePause() {
		if (isClickedPause) {
			setPause("pause");
		} else {
			setPause("");
		}
		setIsClickedPause(!isClickedPause);
	}

	return (
		<>
			<Button
				borderRadius="30px"
				width={{ md: "160px", base: "300px" }}
				bg="#F3CB8E"
				color="#D69F4D"
				onClick={() => {
					onOpen();
					togglePause();
				}}
			>
				Pause
			</Button>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Paused
						</AlertDialogHeader>

						<AlertDialogBody>You want to continue the game?</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={() => {
									onClose();
									togglePause();
								}}
								borderRadius="30px"
							>
								Yes
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default Pause;
