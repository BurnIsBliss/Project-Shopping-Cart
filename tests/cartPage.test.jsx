import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartPage from "../src/components/cartPage/cartPage";

describe("CartPage", () => {
	it("Displays the empty cart message", () => {
		render(<CartPage />);
		expect(screen.getByRole("paragraph")).toMatchSnapshot();
	});
});
