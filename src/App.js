import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import ImageSlider from "components/Carousel/ImageSlider";
import { UserContext } from "./lib/UserContext";
import Jam from "../src/components/Jam/Jam";

function App() {
	const [loginData, setLoginData] = useState({
		nama: "",
		jurusan: "",
	});

	const [current, setCurrent] = useState(0);

	const [waktu, setWaktu] = useState("");

	const [increment, setIncrement] = useState(0);

	// FUNCTION GAK KAMPUS

	const [noCampus, setNoCampus] = useState("");

	return (
		<BrowserRouter>
			<UserContext.Provider
				value={{
					loginData,
					setLoginData,
					current,
					setCurrent,
					waktu,
					setWaktu,
					increment,
					setIncrement,
					noCampus,
					setNoCampus,
				}}
			>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/GamePage" element={<GamePage />} />
					<Route path="/ImageSlider" element={<ImageSlider />} />
					<Route path="/Jam" element={<Jam />} />
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
