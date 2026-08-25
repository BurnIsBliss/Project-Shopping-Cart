import styles from "./cartPage.module.css";
import { Counter } from "../shopPage/shopPage";
import ButtonComp from "../buttonComponenet/buttonComponent";
// Cart page
//    b. Should allow the users to increase or decrease the quantity of items in their cart (including removal if appropriate).

import { useState } from "react";
import { getVal, setVal } from "../../utils/sessionStorageHelper";

export default function CartPage() {
	let data = getVal("cartItems");
	if (data === null) data = null;
	else data = JSON.parse(data);

	let grandTot = getVal("grandTotal");
	if (grandTot === null) grandTot = 0;

	const [cartItems, setCartItems] = useState(data);
	const [grandTotal, setGrandTotal] = useState(grandTot);
	if (cartItems == null)
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
			<div>Grand total: ${grandTotal}</div>
		</div>
	);

	function deleteItem() {}
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
