import styles from "./homePage.module.css";

export default function HomePage() {
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
					alt="Open 24x7"
					className={styles.imgStyle}
				/>
				<img
					src="../src/images/BuyNow.jpg"
					alt="Open 24x7"
					className={styles.imgStyle}
				/>
			</div>
			<div className={styles.imageContainer2}>
				<img
					src="../src/images/open247.jpg"
					alt="Open 24x7"
					className={styles.imgStyle}
				/>
			</div>
		</div>
	);
}
