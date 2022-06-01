import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import ImageSlider from "components/Carousel/ImageSlider";
import { UserContext } from "./lib/UserContext";

function App() {
	const [loginData, setLoginData] = useState({
		nama: "",
		jurusan: "",
	});

	const [current, setCurrent] = useState(0);

	return (
		<BrowserRouter>
			<UserContext.Provider
				value={{ loginData, setLoginData, current, setCurrent }}
			>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/GamePage" element={<GamePage />} />
					<Route path="/ImageSlider" element={<ImageSlider />} />
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
