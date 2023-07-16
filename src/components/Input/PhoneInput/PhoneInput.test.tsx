import { render, screen } from "@testing-library/react";
import PhoneInput from ".";

test("Displays phone input with country", () => {
  render(<PhoneInput />);

  const countryCode = screen.getByTestId("country-code");
  expect(countryCode).toBeInTheDocument();
});
