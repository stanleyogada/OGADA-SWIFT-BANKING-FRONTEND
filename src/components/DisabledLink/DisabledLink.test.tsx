import TestProviders from "@components/TestProviders";
import { screen, render, renderHook } from "@testing-library/react";
import useModalConsumer from "@contexts/Modal/hooks/useModalConsumer";
import user_event from "@testing-library/user-event";

import DisabledLink from ".";

test("renders DisabledLink component", async () => {
  render(
    <TestProviders>
      <DisabledLink>
        <p>Hello</p>
      </DisabledLink>
    </TestProviders>
  );

  const modalContainer = screen.getByTestId("modal-container");
  const children = screen.getByTestId("children");
  const user = user_event.setup();
  await user.click(modalContainer);

  expect(children).not.toHaveStyle("position: absolute;");
  expect(modalContainer).toHaveStyle("position: absolute;");

  expect(modalContainer).toBeInTheDocument();
});
