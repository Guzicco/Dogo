import React, { useEffect, useState } from "react";
import "./App.css";
import Dogo from "./Dogo";

interface IDogo {
	name: string;
	age: number;
	id: number;
}

function App() {
	const [dogoList, setDogoList] = useState<IDogo[]>([]);

	useEffect(() => {
		fetch("http://localhost:4000/dogs")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setDogoList(data);
			});
	}, []);

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		console.log("added");
	};

	return (
		<div className="App">
			<nav>
				<h1>Dogos - Men's Best Friends</h1>
			</nav>
			<div className="dogoInput">
				<form onSubmit={handleSubmit}>
					<label>
						<span>Dogo's Name:</span>
						<input name="dogoName" type="text"></input>
					</label>
					<label>
						<span>Dogo's Age:</span>
						<input name="dogoAge" type="number"></input>
					</label>
					<button type="submit">Add Dogo</button>
				</form>
			</div>
			<div className="galleryWrapper">
				{dogoList.map((item) => (
					<Dogo name={item.name} age={item.age} key={item.id} />
				))}
				<Dogo name="Buka" age={4} />
				<Dogo name="Bambi" age={5} />
				<Dogo name="Yuki" age={2} />
			</div>
		</div>
	);
}

export default App;
