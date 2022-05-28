import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import LoginPage from "./pages/LoginPage";
import { UserContext } from "./lib/UserContext";

function App() {
	const [loginData, setLoginData] = useState({
		nama: "",
		jurusan: "",
	});

	return (
		<BrowserRouter>
			<UserContext.Provider value={{ loginData, setLoginData }}>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/GamePage" element={<GamePage />} />
				</Routes>
			</UserContext.Provider>
		</BrowserRouter>
	);
}

export default App;
