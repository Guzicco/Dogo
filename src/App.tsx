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
}

const API_URL = "http://localhost:4000";

function App() {
	const [dogList, setDogList] = useState<IDog[]>([]);
	const [isLoading, setIsLoading] = useState<Boolean>(true);

	useEffect(() => {
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
	}, []);

	const addNewDog: IAddDogFormProps["onSubmit"] = ({ age, name }) => {
		fetch(`${API_URL}/dogs`, {
			method: "POST",
			body: JSON.stringify({ name, age }),
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

	return (
		<div className="App">
			<nav>
				<h1>Dogs - Men's Best Friends</h1>
			</nav>
			<AddDogForm onSubmit={addNewDog} />
			<DogList list={dogList} onRemoveDog={handleRemoveDog} />
			{isLoading ? <LoadingOverlay /> : null}
		</div>
	);
}

export default App;
