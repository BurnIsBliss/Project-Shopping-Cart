import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/homePage/homePage";
import NavBar from "./components/navBar/navBar";
import CartPage from "./components/cartPage/cartPage";
import ShopPage from "./components/shopPage/shopPage";
import ErrorPage from "./components/errorPage/errorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <ErrorPage />,
	},
	{
		path: "cart",
		element: <CartPage />,
	},
	{
		path: "shop",
		element: <ShopPage />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<NavBar />
		<RouterProvider router={router} />
	</StrictMode>,
);
