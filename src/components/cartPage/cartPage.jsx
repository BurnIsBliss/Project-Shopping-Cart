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
				<div>
					The cart is empty! Head to the <a href="shop">shop</a> to
					start adding items. <br />
					Thank you!
				</div>
			</>
		);
	return (
		<div>
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
			<div>Grand total: ${Number(grandTotal)}</div>
		</div>
	);

	function deleteItem(e) {
		const parentElement = e.currentTarget.parentElement;
		const parentID = parentElement.id;
		const newObj = { ...cartItems };
		delete newObj[parentID];
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
			<div className={styles.cartCard} id={idProp}>
				<div>{itemDetails.title}</div>
				<div>${itemDetails.price}</div>
				<Counter cardID={idProp} />
				<div>Total: ${itemDetails.price * itemDetails.quantity}</div>
				<ButtonComp
					buttonText={"Change quantity?"}
					funcArray={funcArray}
				/>
				<button onClick={func}>Delete item</button>
			</div>
		</>
	);
}
