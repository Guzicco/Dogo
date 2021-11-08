import React from "react";
import { IDog } from "../../App";
import Dog from "../Dog/Dog";

export interface IDogList {
	list: IDog[];
	onRemoveDog: (id: number) => void;
}

const DogList: React.FC<IDogList> = ({ list, onRemoveDog }) => {
	return (
		<div className="galleryWrapper">
			{list.map((item) => (
				<Dog
					name={item.name}
					age={item.age}
					id={item.id}
					onDeleteDog={(id) => {
						onRemoveDog(id);
					}}
				/>
			))}
		</div>
	);
};

export default DogList;