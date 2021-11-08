import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
export interface IAddDogFormProps {
	onSubmit: (newDog: { name: string; age: number }) => void;
}

const AddDogForm: React.FC<IAddDogFormProps> = ({ onSubmit }) => {
	const [dogName, setDogName] = useState<string>("");
	const [dogAge, setDogAge] = useState<number>(0);
	const handleDogNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDogName(event.target.value);
	};
	const handleDogAgeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDogAge(Number(event.target.value));
	};

	const handleSubmit: FormEventHandler = (event) => {
		event.preventDefault();
		onSubmit({ name: dogName, age: dogAge });
	};

	return (
		<div className="dogInput">
			<form onSubmit={handleSubmit}>
				<label>
					<span>Dog's Name:</span>
					<input
						name="dogName"
						type="text"
						onChange={handleDogNameChange}
						value={dogName}
					></input>
				</label>
				<label>
					<span>Dog's Age:</span>
					<input
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
