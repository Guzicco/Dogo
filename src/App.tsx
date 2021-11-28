import React, { useEffect, useState } from "react";
import AddDogForm, {
	IAddDogFormProps,
} from "./Components/AddDogForm/AddDogForm";
import "./App.css";
import LoadingOverlay from "./Components/LoadingOverlay/LoadingOverlay";
import DogList, { IDogList } from "./Components/DogList/DogList";

export interface IDog {
	name: string;
	age: number;
	id: number;
	imgURL?: string;
}

const isDev = process.env.NODE_ENV === "development";
const API_URL = isDev
	? "http://localhost:4000"
	: "https://json-server-dogo.herokuapp.com";

function App() {
	const [dogList, setDogList] = useState<IDog[]>([]);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	const fetchDogs = () => {
		fetch(`${API_URL}/dogs`)
			.then((response) => {
				setIsLoading(true);
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				setDogList(data);
				setIsLoading(false);
			});
	};

	useEffect(fetchDogs, []);

	const addNewDog: IAddDogFormProps["onSubmit"] = ({ age, name, imgURL }) => {
		fetch(`${API_URL}/dogs`, {
			method: "POST",
			body: JSON.stringify({ name, age, imgURL }),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((newDog) => {
				setDogList([...dogList, newDog]);
			});
	};

	const handleRemoveDog: IDogList["onRemoveDog"] = (id) => {
		fetch(`${API_URL}/dogs/${id}`, { method: "DELETE" }).then((response) => {
			if (response.ok) {
				setDogList(
					dogList.filter((dogItem) => {
						return dogItem.id !== id;
					})
				);
			}
		});
	};

	const handleUpdateSubmit: IDogList["onUpdateSubmit"] = (
		name: string,
		age: number,
		id: number,
		imgURL?: string
	) => {
		fetch(`${API_URL}/dogs/${id}`, {
			method: "PUT",
			body: JSON.stringify({ name, age, imgURL }),
			headers: { "Content-Type": "application/json" },
		}).then(() => {
			fetchDogs();
		});
	};

	return (
		<div className="App">
			<h1>Dogs - Men's Best Friends</h1>
			<AddDogForm onSubmit={addNewDog} />
			<DogList
				list={dogList}
				onRemoveDog={handleRemoveDog}
				onUpdateSubmit={handleUpdateSubmit}
			/>
			{isLoading ? <LoadingOverlay /> : null}
		</div>
	);
}

export default App;
