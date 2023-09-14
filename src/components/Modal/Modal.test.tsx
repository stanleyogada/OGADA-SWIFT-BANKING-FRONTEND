import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TestProviders from "@components/TestProviders";

import Modal from ".";
import { COLORS } from "@constants/colors";

test("Ensures modal works correctly in the Signin Page", async () => {
  render(<Modal />, {
    wrapper: TestProviders,
  });
  const user = userEvent.setup();

  const showModalButton = screen.getByRole("button", { name: /show modal/i });

  expect(screen.queryByTestId("modal")).not.toBeInTheDocument();

  await user.click(showModalButton);
  const modal = screen.getByTestId("modal");
  const modalOverlay = within(modal).getByTestId("modal-overlay");
  const modalContent = within(modal).getByTestId("modal-content");

  expect(modal).toHaveStyle(`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `);

  expect(modalOverlay).toHaveStyle(`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `);

  expect(modalContent).toHaveStyle(`
    position: relative;
  `);

  expect(modal).toBeInTheDocument();
  expect(modalOverlay).toBeInTheDocument();
  expect(modalContent).toBeInTheDocument();
  expect(screen.getAllByTestId("modal").length).toBe(1);

  await user.click(showModalButton);
  expect(screen.getAllByTestId("modal").length).toBe(2);

  await user.click(showModalButton);
  expect(screen.getAllByTestId("modal").length).toBe(3);

  const LAST_MODAL_COUNT = 4;
  await user.click(showModalButton);
  expect(screen.getAllByTestId("modal").length).toBe(LAST_MODAL_COUNT);

  const [modalOne, modalTwo, modalThree, modalFour] = screen.getAllByTestId("modal");

  expect(modalOne).toHaveStyle("z-index: 1001;");
  expect(modalTwo).toHaveStyle("z-index: 1002;");
  expect(modalThree).toHaveStyle("z-index: 1003;");
  expect(modalFour).toHaveStyle("z-index: 1004;");

  // Remove Fourth Modal with Close Button of Modal Four
  const closeButtonModalFour = within(modalFour).getByRole("button", { name: /x/i });
  await user.click(closeButtonModalFour);
  expect(screen.getAllByTestId("modal").length).toBe(LAST_MODAL_COUNT - 1);
  expect(screen.queryByText(/count: 4/i)).not.toBeInTheDocument();
  const countElementThree = screen.getByText(/count: 3/i);
  expect(countElementThree).toHaveStyle("display: none;");
  expect(countElementThree).toBeInTheDocument();

  // Remove Third Modal with Close Button of Modal One
  let closeButtonModalOne = within(modalOne).getByRole("button", { name: /x/i });
  await user.click(closeButtonModalOne);
  expect(screen.getAllByTestId("modal").length).toBe(LAST_MODAL_COUNT - 2);
  expect(screen.queryByText(/count: 3/i)).not.toBeInTheDocument();
  expect(screen.getByText(/count: 2/i)).toBeInTheDocument();

  // Remove Second Modal with Close Button of Modal One
  await user.click(closeButtonModalOne);
  expect(screen.getAllByTestId("modal").length).toBe(LAST_MODAL_COUNT - 3);
  expect(screen.queryByText(/count: 2/i)).not.toBeInTheDocument();
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

  // Remove First Modal with Overlay of Modal One
  const overlayModalOne = within(modalOne).getByTestId("modal-overlay");
  await user.click(overlayModalOne);
  expect(screen.queryAllByTestId("modal").length).toBe(LAST_MODAL_COUNT - 4);
  expect(screen.queryByText(/count: 1/i)).not.toBeInTheDocument();

  expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
});
