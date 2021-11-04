import React, { useEffect, useState } from "react";
interface IDogo {
	name: string;
	age: number;
	id: number;
}

const Dogo = (props: IDogo) => {
	const [dogoImageURL, setDogoImageURL] = useState("");

	useEffect(() => {
		fetch("https://dog.ceo/api/breeds/image/random")
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setDogoImageURL(data.message);
			});
	}, []);

	return (
		<div className="dogo">
			<img src={dogoImageURL} alt="cute dogo"></img>
			<p>Name: {props.name}</p>
			<p>Age: {props.age}</p>
		</div>
	);
};

export default Dogo;
