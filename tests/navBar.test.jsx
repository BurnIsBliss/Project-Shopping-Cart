import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBar from "../src/components/navBar/navBar";

describe("NavBar tests", () => {
	it("Displays the empty cart message", () => {
		render(<NavBar />);
		expect(screen.getAllByRole("link")).toMatchSnapshot();
	});

	it("Check initial cart value to be zero", () => {
		render(<NavBar />);
		const link = screen.getByRole("link", { name: "Cart (0)" });
		expect(link).toBeInTheDocument();
	});
});
