import { useState, useEffect } from "react";
import styles from "./shopPage.module.css";
import { getVal } from "../../utils/sessionStorageHelper";
import ButtonComp from "../buttonComponent/buttonComponent";

export default function ShopPage() {
	const [shopItems, setShopItems] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(
					"https://fakestoreapi.com/products",
				);
				const result = await response.json();
				setShopItems(result);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	if (!shopItems.length) {
		return (
			<>
				<div>Loading...</div>
			</>
		);
	} else
		return (
			<div className={styles.shopContainer}>
				{shopItems.map((item) => {
					return <Card key={item.id} cardContents={item} />;
				})}
			</div>
		);
}
function Card({ cardContents }) {
	return (
		<div className={styles.cardContainer} id={cardContents.id}>
			<div>{cardContents.title}</div>
			<img
				src={cardContents.image}
				alt={cardContents.title}
				height={250}
				width={200}
			/>
			<div>{`$${cardContents.price}`}</div>
			<Counter cardID={cardContents.id} />
			<ButtonComp buttonText={"Add to cart?"} />
		</div>
	);
}

function Counter({ cardID }) {
	const data = getVal("cartItems");
	let quantity = 0;
	if (data !== null) {
		const parsedData = JSON.parse(data);
		if (parsedData[cardID]) quantity = Number(parsedData[cardID].quantity);
	}
	const [inputVal, setInputVal] = useState(quantity);

	function handleChange(e) {
		setInputVal(Number(e.target.value));
	}

	function incrementCount() {
		if (inputVal < 100) setInputVal(inputVal + 1);
		else if (inputVal > 100) setInputVal(100);
	}

	function decrementCount() {
		if (inputVal > 0) setInputVal(inputVal - 1);
		else if (inputVal < 100) setInputVal(0);
	}

	return (
		<>
			<div className={styles.counterContainer}>
				<button onClick={decrementCount}>-</button>
				<input
					type="number"
					min="0"
					max="100"
					value={inputVal}
					onChange={handleChange}
				/>
				<button onClick={incrementCount}>+</button>
			</div>
		</>
	);
}

export { Counter };
