import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../src/components/homePage/homePage";

describe("HomePage", () => {
	it("Renders correct headline", () => {
		render(<HomePage />);
		expect(screen.getByRole("heading").textContent).toMatch(
			/guaranteed savings and guaranteed smiles/i,
		);
	});

	it("Has four images", () => {
		render(<HomePage />);
		const imageLength = screen.getAllByRole("img").length;
		expect(imageLength).toBe(4);
	});

	it("Snapshot test", () => {
		const homePage = render(<HomePage />);
		expect(homePage).toMatchSnapshot();
	});

	it("Should render a button with the text 'Click me'", () => {
		render(<HomePage />);
		const link = screen.getByRole("link", { name: "Click me!" });
		expect(link).toBeInTheDocument();
	});

	it("'Click me!' link is redirecting to the right page", async () => {
		render(<HomePage />);
		const link = screen.getByRole("link", { name: "Click me!" });
		expect(link).toHaveAttribute("href", "shop");
	});
});
