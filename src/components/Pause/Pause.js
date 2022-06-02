import React from "react";
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

function Pause() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

	return (
		<>
			<Button
				borderRadius="30px"
				width="150px"
				bg="#F3CB8E"
				color="#D69F4D"
				onClick={onOpen}
			>
				Pause
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Paused
						</AlertDialogHeader>

						<AlertDialogBody>You want to continue the game?</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} borderRadius="30px">
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
