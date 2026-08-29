import styles from "./homePage.module.css";
import { useEffect } from "react";
import BuyNow from "../../../public/images/BuyNow.jpg";
import Discount from "../../../public/images/Discount.jpg";
import open247 from "../../../public/images/open247.jpg";
import openShop from "../../../public/images/openShop.jpg";

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
			<h1>Guaranteed Savings and Guaranteed Smiles</h1>
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
					src={Discount}
					alt="50% discount"
					className={styles.imgStyle}
				/>
				<img
					src={openShop}
					alt="Open shop"
					className={styles.imgStyle}
				/>
				<img src={BuyNow} alt="Buy now" className={styles.imgStyle} />
			</div>
			<div className={styles.div247} id="toggle">
				<img
					src={open247}
					alt="Open 24x7"
					className={styles.imgStyle}
				/>
			</div>
		</div>
	);
}
