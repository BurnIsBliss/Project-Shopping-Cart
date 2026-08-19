import { useState, useEffect } from "react";
import styles from "./shopPage.module.css";
import { setVal, getVal } from "../../utils/sessionStorageHelper";

/*3. Shop page:
   e. And an 'Add to Cart' button.`;*/

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
			<Counter />
			<button
				className={styles.buttonStyle}
				onClick={buttonFunctionality}
			>
				Add to Cart
			</button>
			<button
				onClick={function () {
					sessionStorage.removeItem("cartItems");
				}}
			>
				Session Storage
			</button>
		</div>
	);
}

function Counter() {
	const [inputVal, setInputVal] = useState(0);

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
				{/* set default value using state */}
				<button onClick={incrementCount}>+</button>
			</div>
		</>
	);
}

function buttonFunctionality(e) {
	const parentElement = e.currentTarget.parentElement;
	const childDivElements = parentElement.querySelectorAll("div");
	const inputElement = parentElement.querySelector("input");
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
}
