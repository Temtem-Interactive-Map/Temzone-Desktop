import { render, screen } from "@testing-library/react";
import { NavButton } from "components/NavButton";

describe("<NavButton />", () => {
  it("should render with inactive styles", () => {
    render(<NavButton active={true}>Image</NavButton>);

    expect(screen.getByText(/image/i)).toHaveClass("rounded-2xl bg-indigo-500");
  });

  it("should render with active styles", () => {
    render(<NavButton active={false}>Image</NavButton>);

    expect(screen.getByText(/image/i)).toHaveClass("rounded-3xl bg-gray-700");
  });
});
