import styles from "./cartPage.module.css";
import { Counter } from "../shopPage/shopPage";
// Cart page
//    b. Should allow the users to increase or decrease the quantity of items in their cart (including removal if appropriate).

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
			{Object.entries(cartItems).map((item) => {
				if (item[1].quantity > 0)
					return (
						<CartCard
							itemDetails={item[1]}
							key={item[0]}
							idProp={item[0]}
						/>
					);
			})}
		</div>
	);
}

function CartCard({ itemDetails, idProp }) {
	return (
		<>
			<div className={styles.cartCard}>
				<div>{itemDetails.title}</div>
				<div>${itemDetails.price}</div>
				<Counter cardID={idProp} />
				<div>Total</div>
				<button>Delete item</button>
			</div>
		</>
	);
}
