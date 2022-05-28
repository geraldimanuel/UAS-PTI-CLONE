import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GamePage from "./GamePage";
import LoginPage from "./LoginPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route path="/GamePage" element={<GamePage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
