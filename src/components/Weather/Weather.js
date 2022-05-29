import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

function Weather() {
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");

	const url = `https://api.openweathermap.org/data/2.5/weather?lat=-6.261180
&lon=106.616820&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

	const searchLocation = (event) => {
		axios.get(url).then((response) => {
			setData(response.data);
			console.log(response.data);
		});
		setLocation("");
	};
}

export default Weather;
