import { render, screen } from "@testing-library/react";
import { LoadingButton } from ".";

describe("<LoadingButton />", () => {
  it("should render with loading icon", () => {
    const { container } = render(
      <LoadingButton loading={true}>Text</LoadingButton>
    );

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("should render with loading styles", () => {
    render(<LoadingButton active={false}>Text</LoadingButton>);

    expect(screen.getByText(/text/i)).toHaveClass("cursor-pointer");
  });
});
