import { render } from "@testing-library/react";
import * as Icons from ".";

describe("<Icons />", () => {
  const iconsIndex = Object.keys(Icons);

  iconsIndex.forEach((icon) => {
    it("should render the " + icon + " Icon correctly", () => {
      const { container } = render(<>{Icons[icon]()}</>);

      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });
});
