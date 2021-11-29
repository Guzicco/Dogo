import React, { useState } from "react";
import style from "./Dog.module.css";
import { IDog } from "../../App";
import DogModal from "./DogModal";

export interface IDogProps extends IDog {
	onDeleteDog: (id: number) => void;
	onDogUpdate: (name: string, age: number, id: number) => void;
}

const Dog: React.FC<IDogProps> = (props) => {
	const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

	const openModal = () => {
		setModalIsOpen(true);
	};
	const closeModal = () => {
		setModalIsOpen(false);
	};
	const handleDogUpdate = ({
		dogNameUpdate,
		dogAgeUpdate,
	}: {
		dogNameUpdate: string;
		dogAgeUpdate: number;
	}) => {
		closeModal();
		props.onDogUpdate(
			dogNameUpdate || props.name,
			dogAgeUpdate || props.age,
			props.id
		);
	};

	return (
		<div key={props.id} className={style.dog + " coolBackground"}>
			<img src={props.imgURL} alt="cute dog"></img>
			<p>Name: {props.name}</p>
			<p>Age: {props.age}</p>
			<button
				onClick={() => {
					props.onDeleteDog(props.id);
				}}
			>
				Delete Dog
			</button>
			<button onClick={openModal}>Edit Dog</button>
			<DogModal isOpen={modalIsOpen} onDogUpdate={handleDogUpdate}></DogModal>
		</div>
	);
};

export default Dog;
