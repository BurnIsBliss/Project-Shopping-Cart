import { useState, useEffect } from "react";
import styles from "./shopPage.module.css";

/*3. Shop page:
   a. Build individual card elements for each of the products.
   b. Should have an input field, to enter the no. of items to buy
   c. Also, an increment and decrement button next to it.
   d. Must have a title,
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
	console.log(cardContents);
	return (
		<div className={styles.cardContainer}>
			<div>{cardContents.title}</div>
			<img
				src={cardContents.image}
				alt={cardContents.title}
				height={250}
				width={200}
			/>
			<div>{`$${cardContents.price}`}</div>
			<Counter />
			<div>Add to cart</div>
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
