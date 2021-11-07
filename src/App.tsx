import React, { useEffect, useState } from "react";
import AddDogForm, { IAddDogFormProps } from "./AddDogForm";
import "./App.css";
import Dog from "./Dog";

interface IDog {
	name: string;
	age: number;
	id: number;
}
const API_URL = "http://localhost:4000";

function App() {
	const [dogList, setDogList] = useState<IDog[]>([]);

	useEffect(() => {
		fetch(`${API_URL}/dogs`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				setDogList(data);
			});
	}, []);

	const addNewDog: IAddDogFormProps["onSubmit"] = ({ age, name }) => {
		console.log({ age, name });
		fetch(`${API_URL}/dogs`, {
			method: "POST",
			body: JSON.stringify({ name, age }),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				console.log(response);
				if (response.ok) {
					return response.json();
				}
			})
			.then((newDog) => {
				console.log(newDog);
				setDogList([...dogList, newDog]);
			});
	};

	return (
		<div className="App">
			<nav>
				<h1>Dogs - Men's Best Friends</h1>
			</nav>
			<AddDogForm onSubmit={addNewDog} />
			{/* todo move gallerywrapper into new component DogList */}
			<div className="galleryWrapper">
				{dogList.map((item) => (
					<Dog name={item.name} age={item.age} id={item.id} />
				))}
			</div>
		</div>
	);
}

export default App;
