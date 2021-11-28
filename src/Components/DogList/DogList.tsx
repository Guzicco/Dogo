import React from "react";
import { IDog } from "../../App";
import Dog from "../Dog/Dog";
import style from "./DogList.module.css";

export interface IDogList {
	list: IDog[];
	onRemoveDog: (id: number) => void;
	onUpdateSubmit: (
		name: string,
		age: number,
		id: number,
		imgURL: string
	) => void;
}

const DogList: React.FC<IDogList> = ({ list, onRemoveDog, onUpdateSubmit }) => {
	return (
		<div className={style.galleryWrapper}>
			{list.map((item) => (
				<Dog
					key={item.id}
					name={item.name}
					age={item.age}
					id={item.id}
					imgURL={item.imgURL}
					onDeleteDog={(id) => {
						onRemoveDog(id);
					}}
					onDogUpdate={(name: string, age: number) => {
						onUpdateSubmit(name, age, item.id, item.imgURL || "");
					}}
				/>
			))}
		</div>
	);
};

export default DogList;
