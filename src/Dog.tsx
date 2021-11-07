import React, { useEffect, useState } from "react";
import style from "./Dog.module.css";
interface IDog {
	name: string;
	age: number;
	id: number;
}

const Dog = (props: IDog) => {
	const [dogImageURL, setDogImageURL] = useState("");

	useEffect(() => {
		fetch("https://dog.ceo/api/breeds/image/random")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setDogImageURL(data.message);
			});
	}, []);

	return (
		<div key={props.id} className={style.dog}>
			<img src={dogImageURL} alt="cute dog"></img>
			<p>Name: {props.name}</p>
			<p>Age: {props.age}</p>
		</div>
	);
};

export default Dog;
