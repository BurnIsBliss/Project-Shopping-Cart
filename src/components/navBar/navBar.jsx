import { getVal } from "../../utils/sessionStorageHelper";
import styles from "./navBar.module.css";

export default function NavBar() {
	const data = getVal("total");
	let tot;
	if (data !== null) {
		tot = JSON.parse(data);
	} else {
		tot = 0;
	}
	return (
		<>
			<div className={styles.navBarContainer}>
				<div>
					<a href="/">Home</a>
				</div>
				<div>
					<a href="shop">Shop</a>
				</div>
				<div>
					<a href="cart" id="navCart">
						Cart ({tot})
					</a>
				</div>
			</div>
		</>
	);
}
