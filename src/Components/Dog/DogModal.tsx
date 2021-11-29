import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import ReactModal from "react-modal";
import style from "./Dog.module.css";

export interface IModal {
	isOpen: boolean;
}

interface IDogModal extends IModal {
	onDogUpdate: ({
		dogNameUpdate,
		dogAgeUpdate,
	}: {
		dogNameUpdate: string;
		dogAgeUpdate: number;
	}) => void;
}

const DogModal: React.FC<IDogModal> = ({ isOpen, onDogUpdate }) => {
	const [dogName, setDogName] = useState<string>("");
	const [dogAge, setDogAge] = useState<number>(0);

	const handleDogAgeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDogAge(Number(event.target.value));
	};

	const handleDogNameChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setDogName(event.target.value);
	};

	const handleUpdate: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const target = event.target as typeof event.target & {
			dogName: { value: string };
			dogAge: { value: number };
		};
		const dogNameUpdate: string = target.dogName.value || "";
		const dogAgeUpdate: number = Number(target.dogAge.value) || 0;
		onDogUpdate({ dogNameUpdate, dogAgeUpdate });
		setDogName("");
		setDogAge(0);
	};

	return (
		<ReactModal
			isOpen={isOpen}
			contentLabel="Dog Edit"
			className={style.ModalPopup}
			ariaHideApp={false}
		>
			<div>
				<h3>Update Dog Information</h3>
				<form className="Modal UpdateForm" onSubmit={handleUpdate}>
					<label>
						<span>Dog's Name:</span>
						<input
							className="dogData"
							type="text"
							name="dogName"
							onChange={handleDogNameChange}
							value={dogName}
						></input>
					</label>
					<label>
						<span>Dog's Age:</span>
						<input
							className="dogData"
							type="number"
							name="dogAge"
							onChange={handleDogAgeChange}
							value={dogAge}
						></input>
					</label>
					<div>
						<button className="Submit-Button" type="submit">
							Update Dog
						</button>
						<button onClick={() => (isOpen = false)}>Cancel</button>
					</div>
				</form>
			</div>
		</ReactModal>
	);
};

export default DogModal;
