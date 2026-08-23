import styles from "./cartPage.module.css";
// Cart page
//    a. Should display all the items and their quantities.
//    b. Should allow the users to increase or decrease the quantity of items in their cart (including removal if appropriate).
//    c. No need to implement any checkout/payment system.

import { useState } from "react";
import { getVal } from "../../utils/sessionStorageHelper";

export default function CartPage() {
	let data = getVal("cartItems");
	if (data === null) data = null;
	else data = JSON.parse(data);

	const [cartItems, setCartItems] = useState(data);
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
			{Object.values(cartItems).map((item) => {
				if (item.quantity > 0)
					return <CartCard itemDetails={item} key={item.title} />;
			})}
		</div>
	);
}

function CartCard({ itemDetails }) {
	return (
		<>
			<div className={styles.cartCard}>
				<div>{itemDetails.title}</div>
				<div>${itemDetails.price}</div>
				<div>{itemDetails.quantity}</div>
			</div>
		</>
	);
}
