import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ShopPage from "../src/components/shopPage/shopPage";

describe("ShopPage", () => {
	it("Displays 20 products", async () => {
		render(<ShopPage />);
		expect(
			await screen.findAllByRole("button", { name: "Add to cart?" }),
		).toHaveLength(20);
	});
});
