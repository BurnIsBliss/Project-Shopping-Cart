import styles from "./homePage.module.css";
import { useEffect } from "react";

export default function HomePage() {
	useEffect(() => {
		function showHide() {
			document.querySelector("#toggle").classList.toggle(styles.showing);
		}
		const intervalID = setInterval(showHide, 1000);

		return () => {
			clearInterval(intervalID);
		};
	});
	return (
		<div className={styles.mainContainer}>
			<h1>Guaranteed Saving and Guaranteed Smiles</h1>
			<p>
				Head to our shop for <span>GREAT</span> products at{" "}
				<span>GREAT</span> discounts.
			</p>
			<p>
				Click the below link to visit the shop before you miss the{" "}
				<br /> best deals on the internet.
			</p>
			<a href="shop">Click me!</a>
			<div>
				<img
					src="../src/images/Discount.jpg"
					alt="50% discount"
					className={styles.imgStyle}
				/>
				<img
					src="../src/images/openShop.jpg"
					alt="Open shop"
					className={styles.imgStyle}
				/>
				<img
					src="../src/images/BuyNow.jpg"
					alt="Buy now"
					className={styles.imgStyle}
				/>
			</div>
			<div className={styles.div247} id="toggle">
				<img
					src="../src/images/open247.jpg"
					alt="Open 24x7"
					className={styles.imgStyle}
				/>
			</div>
		</div>
	);
}
