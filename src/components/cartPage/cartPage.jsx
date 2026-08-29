import styles from "./cartPage.module.css";
import { Counter } from "../shopPage/shopPage";
import ButtonComp from "../buttonComponent/buttonComponent";
import { useState } from "react";
import { getVal, setVal } from "../../utils/sessionStorageHelper";

export default function CartPage() {
	let data = getVal("cartItems");
	if (data === null) data = null;
	else data = JSON.parse(data);

	let grandTot = getVal("grandTotal");
	if (grandTot === null) grandTot = 0;

	const [cartItems, setCartItems] = useState(data);
	const [grandTotal, setGrandTotal] = useState(JSON.parse(grandTot));
	if (cartItems == null || !Object.values(cartItems).length)
		return (
			<>
				<p>
					The cart is empty! Head to the <a href="shop">shop</a> to
					start adding items. <br />
					Thank you!
				</p>
			</>
		);
	return (
		<div>
			<div className={styles.cardContainer}>
				{Object.entries(cartItems).map((item) => {
					if (item[1].quantity > 0)
						return (
							<CartCard
								itemDetails={item[1]}
								key={item[0]}
								idProp={item[0]}
								func={deleteItem}
								funcArray={[setCartItems, setGrandTotal]}
							/>
						);
				})}
			</div>
			<div className={styles.grandTotal}>
				Grand total: <span>${Number(grandTotal)}</span>
			</div>
		</div>
	);

	function deleteItem(e) {
		const parentElement = e.currentTarget.parentElement;
		const elementID = parentElement.firstChild.id;
		const newObj = { ...cartItems };
		delete newObj[elementID];
		setVal("cartItems", JSON.stringify(newObj));
		setCartItems(newObj);
		const newData = getVal("cartItems");
		const newParsedData = JSON.parse(newData);

		let total = 0,
			grandTotal = 0;
		for (const key in newParsedData) {
			total += Number(newParsedData[key]["quantity"]);
			grandTotal +=
				Number(newParsedData[key]["quantity"]) *
				Number(newParsedData[key]["price"]);
		}
		grandTotal = grandTotal.toFixed(2);
		setVal("total", JSON.stringify(total));
		setVal("grandTotal", JSON.stringify(grandTotal));
		setGrandTotal(grandTotal);
		document.querySelector("#navCart").innerText = `Cart (${total})`;
	}
}

function CartCard({ itemDetails, idProp, func, funcArray }) {
	return (
		<>
			<div className={styles.cartCard}>
				<div>
					<h3>{itemDetails.title}</h3>
					<h4>${itemDetails.price}/unit</h4>
				</div>
				<div className={styles.miniContainer}>
					<div className={styles.counter} id={idProp}>
						<Counter cardID={idProp} />
						<ButtonComp
							buttonText={"Change quantity?"}
							funcArray={funcArray}
						/>
					</div>
					<button onClick={func} className={styles.deleteButton}>
						Delete item
					</button>
					<div className={styles.total}>
						Total:
						<span>
							{" "}
							${itemDetails.price * itemDetails.quantity}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
