import styles from "./navBar.module.css";

export default function NavBar() {
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
						Cart (0)
					</a>
				</div>
			</div>
		</>
	);
}
