import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import style from "./AddDogForm.module.css";

export interface IAddDogFormProps {
	onSubmit: (newDog: { name: string; age: number; imgURL?: string }) => void;
}

const AddDogForm: React.FC<IAddDogFormProps> = ({ onSubmit }) => {
	const [dogName, setDogName] = useState<string>("");
	const [dogAge, setDogAge] = useState<number>(0);

	const fetchImgURL = () => {
		return fetch("https://dog.ceo/api/breeds/image/random")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				return data.message;
			});
	};

	const handleDogNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDogName(event.target.value);
	};
	const handleDogAgeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDogAge(Number(event.target.value));
	};

	const handleSubmit: FormEventHandler = async (event) => {
		event.preventDefault();
		const img = await fetchImgURL();
		onSubmit({ name: dogName, age: dogAge, imgURL: img });
	};

	return (
		<div className={style.dogForm}>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Dog's Name:</span>
					<input
						className="dogData"
						name="dogName"
						type="text"
						onChange={handleDogNameChange}
						value={dogName}
					></input>
				</label>
				<label>
					<span>Dog's Age:</span>
					<input
						className="dogData"
						name="dogAge"
						type="number"
						onChange={handleDogAgeChange}
						value={dogAge}
					></input>
				</label>
				<button type="submit">Add Dog</button>
			</form>
		</div>
	);
};

export default AddDogForm;
