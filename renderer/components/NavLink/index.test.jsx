import { render, screen } from "@testing-library/react";
import { NavLink } from "components/NavLink";

describe("<NavLink />", () => {
  it("should render with inactive styles", () => {
    render(<NavLink active={true}>Image</NavLink>);

    expect(screen.getByText(/image/i)).toHaveClass("rounded-2xl bg-indigo-500");
  });

  it("should render with active styles", () => {
    render(<NavLink active={false}>Image</NavLink>);

    expect(screen.getByText(/image/i)).toHaveClass("rounded-3xl bg-gray-700");
  });
});
