import styles from "./buttonComponent.module.css";
import { setVal, getVal } from "../../utils/sessionStorageHelper";

export default function ButtonComp({ buttonText }) {
	return (
		<>
			<button
				className={styles.buttonStyle}
				onClick={buttonFunctionality}
			>
				{buttonText}
			</button>
		</>
	);
}

function buttonFunctionality(e) {
	const parentElement = e.currentTarget.parentElement;
	const childDivElements = parentElement.querySelectorAll("div");
	const inputElement = parentElement.querySelector("input");
	if (Number(inputElement.value) <= 0) {
		alert('Enter a "quantity" greater than 1');
		return;
	}
	const newObj = new Object();
	newObj[parentElement.id] = {
		title: childDivElements[0].innerText,
		price: childDivElements[1].innerText.slice(1),
		quantity: inputElement.value,
	};

	const data = getVal("cartItems");
	if (data === null) {
		setVal("cartItems", JSON.stringify(newObj));
	} else {
		const parsedData = JSON.parse(data);
		const newData = Object.assign(parsedData, newObj);
		setVal("cartItems", JSON.stringify(newData));
	}

	const newData = getVal("cartItems");
	const newParsedData = JSON.parse(newData);

	let total = 0;
	for (const key in newParsedData) {
		total += Number(newParsedData[key]["quantity"]);
	}
	setVal("total", JSON.stringify(total));
	document.querySelector("#navCart").innerText = `Cart (${total})`;
}
