import React from "react";
import style from "./LoadingOverlay.module.css";

const LoadingOverlay = () => {
	return (
		<div className={style.LoadingOverlay}>
			<div className={style.center}>
				<div className={style.ldsSpinner}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<h2>LOADING</h2>
			</div>
		</div>
	);
};

export default LoadingOverlay;
